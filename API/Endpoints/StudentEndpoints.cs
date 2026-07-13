using API.DTOs;
using API.Expressions;
using API.Models;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class StudentEndpoints
{
    public static void MapStudentEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get", Get).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access)).DisableAntiforgery();
        group.MapPost("/update", Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }

    private static async Task<IResult> Get(int studentID, UEMSContext ctx)
    {
        var query = ctx.Students.Where(s => s.StudentId == studentID)
                                .Select(StudentExpressions.Base);

        if (!await query.AnyAsync()) return Results.BadRequest("Student could not be found.");

        var student = await query.FirstAsync();

        return Results.Ok(student);
    }

    private static async Task<IResult> Create([FromQuery] int userID, [FromForm] NewStudentDTO data, UEMSContext ctx)
    {
        var query = ctx.Students.Where(s => s.UserId == userID);

        if (await query.AnyAsync()) return Results.BadRequest("User already has an account.");

        Student student = new Student
        {
            UserId = userID,
            FirstName = data.FirstName,
            LastName = data.LastName,
            Gender = data.Gender.ToString(),
            BirthDate = data.BirthDate,
            Nationality = data.Nationality,
            Address = data.Address,
            PhoneNumber = data.PhoneNumber,
        };

        LanguageCompetency competency;
        foreach (var comp in data.LanguageCompetencies)
        {
            competency = new LanguageCompetency
            {
                Student = student,
                Language = comp.Language,
                CompetencyLevel = comp.CompetencyLevel.ToString(),
                CanFollowLectures = comp.CanFollowLectures,
                CanFollowLecturesWithLessons = comp.CanFollowLecturesWithLessons
            };

            if (comp.Certificate != null) {
                using var ms = new MemoryStream();
                await comp.Certificate.CopyToAsync(ms);
                byte[] bytes = ms.ToArray();

                competency.Certificate = new Models.File
                {
                    FileName = comp.Certificate.FileName,
                    ContentType = comp.Certificate.ContentType,
                    FileSize = bytes.Length,
                    FileContent = new FileContent { Content = bytes }
                };
            }

            ctx.LanguageCompetencies.Add(competency);
        }

        ctx.Students.Add(student);

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

    private static async Task<IResult> Update(int studentID, StudentDataDTO data, UEMSContext ctx)
    {
        var query = ctx.Students.Where(s => s.StudentId == studentID);

        if (!await query.AnyAsync()) return Results.BadRequest("Student could not be found.");

        var student = await query.FirstAsync();

        student.FirstName = data.FirstName;
        student.LastName = data.LastName;
        student.BirthDate = data.BirthDate;
        student.Gender = data.Gender.ToString();
        student.Nationality = data.Nationality;
        student.Address = data.Address;
        student.PhoneNumber = data.PhoneNumber;

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
