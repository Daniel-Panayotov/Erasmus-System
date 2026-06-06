using API.Expressions;
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

    public static async Task<IResult> Create()
    {
        return Results.Ok();
    }

    public static async Task<IResult> Update()
    {
        return Results.Ok();
    }

}
