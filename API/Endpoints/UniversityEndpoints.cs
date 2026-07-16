using API.DTOs;
using API.Expressions;
using API.Models;
using API.Utilities;
using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public class UniversityEndpoints
{
    public static void MapUniversityEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-one", GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapGet("/get-all", GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/update", Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapDelete("/delete", Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }

    private static async Task<IResult> GetOne([FromQuery] int universityID, UEMSContext ctx)
    {
        var query = ctx.Universities.Where(u => u.UniversityId == universityID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid university.");

        var university = await query.Select(UniversityExpressions.Base.Expand()).FirstAsync();

        return Results.Ok(university);
    }

    private static async Task<IResult> GetAll(UEMSContext ctx)
    {
        var query = ctx.Universities.AsQueryable();

        var universities = await query.Select(UniversityExpressions.Base.Expand()).ToListAsync();

        return Results.Ok(universities);
    }

    private static async Task<IResult> Create([FromBody] UniversityDataDTO data, UEMSContext ctx)
    {
        University university = new University
        {
            Code = data.Code,
            Name = data.Name,
            Address = data.Address,
        };
        ctx.Universities.Add(university);

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

    private static async Task<IResult> Update([FromQuery] int universityID, [FromBody] UniversityDataDTO data, UEMSContext ctx)
    {
        var query = ctx.Universities.Where(u => u.UniversityId == universityID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid university.");

        var university = await query.FirstAsync();

        university.Code = data.Code;
        university.Name = data.Name;
        university.Address = data.Address;

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

    private static async Task<IResult> Delete([FromQuery] int universityID, UEMSContext ctx)
    {
        try
        {
            var entries = await ctx.Universities.Where(c => c.UniversityId == universityID).ExecuteDeleteAsync();
            if (entries == 0) return Results.BadRequest("Couldn't delete anthing.");
        }
        catch (DbUpdateException)
        {
            return Results.BadRequest("Database update failed.");
        }

        return Results.Ok();
    }
}
