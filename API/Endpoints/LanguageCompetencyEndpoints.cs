using API.DTOs;
using API.Expressions;
using API.Models;
using API.Utilities;
using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public class LanguageCompetencyEndpoints
{
    public static void MapLanguageCompetencyEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-all", GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapGet("/get-one", GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapGet("/get-certificate", GetCertificate).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access)).DisableAntiforgery();
        group.MapPost("/update", Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access)).DisableAntiforgery();
        group.MapDelete("/delete", Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }

    private static async Task<IResult> GetAll(int studentID, UEMSContext ctx)
    {
        if (!await ctx.Students.Where(s => s.StudentId == studentID).AnyAsync()) return Results.BadRequest("Invalid student.");

        var query = ctx.LanguageCompetencies
            .Where(l => l.StudentId == studentID)
            .Select(LanguageCompetencyExpressions.Base);

        var competencies = await query.ToListAsync();

        return Results.Ok(competencies);
    }

    private static async Task<IResult> GetOne(int competencyID, UEMSContext ctx)
    {
        var comp = await ctx.LanguageCompetencies.Where(c => c.LanguageCompetencyId == competencyID).Select(LanguageCompetencyExpressions.DTO.Expand()).FirstOrDefaultAsync();

        if (comp is null) return Results.BadRequest("Invalid competency.");

        return Results.Ok(comp);
    }

    private static async Task<IResult> GetCertificate(int competencyID, UEMSContext ctx)
    {
        var competency = await ctx.LanguageCompetencies.Where(c => c.LanguageCompetencyId == competencyID).Include(l => l.Certificate).ThenInclude(c => c.FileContent).FirstOrDefaultAsync();

        if (competency?.Certificate is null) return Results.Problem("Invalid competency or certificate");

        return Results.File(competency.Certificate.FileContent.Content, competency.Certificate.ContentType, competency.Certificate.FileName);
    }

    private static async Task<IResult> Create([FromQuery] int studentID, [FromForm] SaveLanguageCompetencyDTO data, UEMSContext ctx)
    {
        var studentQuery = ctx.Students.Where(s => s.StudentId == studentID);

        if (!await studentQuery.AnyAsync()) return Results.BadRequest("Invalid student.");

        LanguageCompetency competency = new LanguageCompetency
        {
            StudentId = studentID,
            Language = data.Language,
            CompetencyLevel = data.CompetencyLevel,
            CanFollowLectures = data.CanFollowLectures,
            CanFollowLecturesWithLessons = data.CanFollowLecturesWithLessons
        };

        if (data.Certificate != null)
        {
            using var ms = new MemoryStream();
            await data.Certificate.CopyToAsync(ms);
            byte[] bytes = ms.ToArray();

            competency.Certificate = new Models.File
            {
                FileName = data.Certificate.FileName,
                ContentType = data.Certificate.ContentType,
                FileSize = bytes.Length,
                FileContent = new FileContent { Content = bytes }
            }; 
        }

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

    private static async Task<IResult> Update([FromQuery] int competencyID, [FromForm] SaveLanguageCompetencyDTO data, UEMSContext ctx)
    {
        var query = ctx.LanguageCompetencies.Where(l => l.LanguageCompetencyId == competencyID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid competency.");

        var competency = await query.FirstAsync();

        competency.Language = data.Language;
        competency.CompetencyLevel = data.CompetencyLevel;
        competency.CanFollowLectures = data.CanFollowLectures;
        competency.CanFollowLecturesWithLessons = data.CanFollowLecturesWithLessons;

        if (data.Certificate != null)
        {
            using var ms = new MemoryStream();
            await data.Certificate.CopyToAsync(ms);
            byte[] bytes = ms.ToArray();

            competency.Certificate = new Models.File
            {
                FileName = data.Certificate.FileName,
                ContentType = data.Certificate.ContentType,
                FileSize = bytes.Length,
                FileContent = new FileContent { Content = bytes }
            };
        }

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

    private static async Task<IResult> Delete([FromQuery] int competencyID, UEMSContext ctx)
    {
        var comp = await ctx.LanguageCompetencies.Where(l => l.LanguageCompetencyId == competencyID).Select(c => new { c.CertificateId }).FirstOrDefaultAsync();
        if (comp is null) return Results.BadRequest("Couldn't delete anthing.");

        if (await ctx.LanguageCompetencies.Where(c => c.LanguageCompetencyId == competencyID).ExecuteDeleteAsync() == 0)
            return Results.Problem("Couldnt't delete anything.");

        if (comp.CertificateId is not null)
        {
            var fileContentID = await ctx.Files.Where(f => f.FileId == comp.CertificateId).Select(f => f.FileContentId).FirstAsync();

            await ctx.Files.Where(f => f.FileId == comp.CertificateId).ExecuteDeleteAsync();
            await ctx.FileContents.Where(c => c.FileContentId == fileContentID).ExecuteDeleteAsync();
        }

        return Results.Ok();
    }
}
