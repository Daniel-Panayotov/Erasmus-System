using API.DTOs;
using API.Expressions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Handlers;

public class StudentHandlers
{
    public static async Task<IResult> Get(int studentID, UEMSContext ctx)
    {
        var query = ctx.Students.Where(s => s.StudentId == studentID)
                                .Select(StudentExpressions.Base);

        if (!await query.AnyAsync()) return Results.BadRequest("Student could not be found.");

        var student = await query.FirstAsync();

        return Results.Ok(student);
    }

    public static async Task<IResult> Create([FromQuery] int userID, [FromBody] NewStudentDTO data, UEMSContext ctx)
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

        foreach (var comp in data.LanguageCompetencies) {
            ctx.LanguageCompetencies.Add(new LanguageCompetency
            {
                Student = student,
                Language = comp.Language,
                CanFollowLectures = comp.CanFollowLectures,
                CanFollowLecturesWithLessons = comp.CanFollowLecturesWithLessons
            });
        }

        ctx.Students.Add(student);

        try {
            var entries = await ctx.SaveChangesAsync();
            if (entries == 0) return Results.BadRequest("No changes were saved.");
        }
        catch (DbUpdateException) { 
            return Results.BadRequest("Database update failed.");
        }

        return Results.Ok();
    }

    public static async Task<IResult> Update(int studentID, StudentDataDTO data, UEMSContext ctx)
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
