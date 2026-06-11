using API.DTOs;
using API.Expressions;
using API.Models;
using API.Utilities;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using System.Text.Json;
using System.Xml.Linq;
using static System.Collections.Specialized.BitVector32;
using static System.Net.WebRequestMethods;

namespace API.Endpoints.Handlers;

public class ApplicationHandlers
{
    // TODO: Change expression 
    public static async Task<IResult> Get(int studentID, UEMSContext ctx)
    {
        var query = ctx.Applications.Where(a => a.StudentId == studentID);

        var applications = await query.Select(ApplicationExpressions.Base).ToListAsync();

        return Results.Ok(applications);
    }

    // TODO: ADD Institution relations when they are implemented
    public static async Task<IResult> Create2([FromBody] ApplicationDataDTO data, HttpContext http, UEMSContext ctx)
    {
        var userID = http.User.TryGetUserID();
        if (userID == null) return Results.BadRequest("Invalid user identity.");

        var studentQuery = ctx.Students.Where(s => s.UserId == userID);
        if (!await studentQuery.AnyAsync()) return Results.BadRequest("Invalid user.");

        var student = await studentQuery.Select(StudentExpressions.Base).FirstAsync();

        Application application = new Application
        {
            StudentId = student.StudentID,
            Photo = data.Photo,
            MobilityType = data.MobilityType.ToString(),
            StudyFrom = data.StudyFrom,
            StudyTo = data.StudyTo,
            Accommodation = data.Accommodation,
            AccommodationFrom = data.AccommodationFrom,
            AccommodationTo = data.AccommodationTo,
            BulgarianCourse = data.BulgarianCourse,
            MotivationText = data.MotivationText,
            Degree = data.Degree.ToString(),
            PriorStudyAbroad = data.PriorStudyAbroad,
            PriorStudyDuration = data.PriorStudyDuration,
        };
        ctx.Applications.Add(application);

        try
        {
            var entries = await ctx.SaveChangesAsync();
            if (entries == 0) return Results.BadRequest("No changes were saved.");
        }
        catch (DbUpdateException)
        {
            return Results.BadRequest("Database update failed.");
        }

        return Results.Ok();
    }

    public static async Task<IResult> Create([FromForm] NewApplicationDTO data, HttpContext http, UEMSContext ctx)
    {
        var userID = http.User.TryGetUserID();
        if (userID == null) return Results.BadRequest("Invalid user identity.");

        var studentQuery = ctx.Students.Where(s => s.UserId == userID);
        if (!await studentQuery.AnyAsync()) return Results.BadRequest("Invalid user.");

        var student = await studentQuery.Select(StudentExpressions.Base).FirstAsync();

        using var ms = new MemoryStream();
        await data.photo.CopyToAsync(ms);
        byte[] bytes = ms.ToArray();

        Application application = new Application
        {
            StudentId = student.StudentID,
            Photo = bytes,
            MobilityType = data.mobilityType.ToString(),
            StudyFrom = data.studyFrom,
            StudyTo = data.studyTo,
            Accommodation = data.accommodation,
            AccommodationFrom = data.accommodationFrom,
            AccommodationTo = data.accommodationTo,
            BulgarianCourse = data.bulgarianCourse,
            MotivationText = data.motivationText,
            Degree = data.degree.ToString(),
            PriorStudyAbroad = data.priorStudyAbroad,
            PriorStudyDuration = data.priorStudyDuration,
        };
        ctx.Applications.Add(application);

        try
        {
            var entries = await ctx.SaveChangesAsync();
            if (entries == 0) return Results.BadRequest("No changes were saved.");
        }
        catch (DbUpdateException)
        {
            return Results.BadRequest("Database update failed.");
        }

        return Results.Ok();
    }
}