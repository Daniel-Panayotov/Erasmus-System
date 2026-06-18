using API.DTOs;
using API.Expressions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Handlers;

public class LanguageCompetencyHandlers
{
    public static async Task<IResult> GetAll(int studentID, UEMSContext ctx)
    {
        var query = ctx.LanguageCompetencies
            .Where(l => l.StudentId == studentID)
            .Select(LanguageCompetencyExpressions.Base);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid student.");

        var competencies = await query.ToListAsync();

        return Results.Ok(competencies);
    }

    public static async Task<IResult> Create([FromQuery] int studentID, [FromBody] LanguageCompetencyDataDTO data, UEMSContext ctx)
    {
        var studentQuery = ctx.Students.Where(s => s.StudentId == studentID);

        if (!await studentQuery.AnyAsync()) return Results.BadRequest("Invalid student.");

        LanguageCompetency competency = new LanguageCompetency
        {
            StudentId = studentID,
            Language = data.Language,
            CanFollowLectures = data.CanFollowLectures,
            CanFollowLecturesWithLessons = data.CanFollowLecturesWithLessons
        };
        ctx.LanguageCompetencies.Add(competency);

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

    public static async Task<IResult> Update([FromQuery] int competencyID, [FromBody] LanguageCompetencyDataDTO data, UEMSContext ctx)
    {
        var query = ctx.LanguageCompetencies.Where(l => l.LanguageCompetencyId == competencyID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid competency.");

        var competency = await query.FirstAsync();

        competency.Language = data.Language;
        competency.CanFollowLectures = data.CanFollowLectures;
        competency.CanFollowLecturesWithLessons = data.CanFollowLecturesWithLessons;

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
