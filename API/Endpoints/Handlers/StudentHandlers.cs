using API.DTOs;
using API.Expressions;
using API.Models;
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

    public static async Task<IResult> Create(StudentDataDTO data, UEMSContext ctx)
    {
        // TODO: Update this for an actual authenticated userID
        int userID = 1;

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

    public static async Task<IResult> Update()
    {
        return Results.Ok();
    }

}
