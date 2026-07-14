using API.Utilities;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using API.Expressions;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using LinqKit;

namespace API.Endpoints;

public class ContactEndpoints
{
    public static void MapContactEndpoints(RouteGroupBuilder group)
    {
        group.MapGet("/get-one", GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapGet("/get-all", GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/create", Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapPost("/update", Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        group.MapDelete("/delete", Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }

    private static async Task<IResult> GetOne([FromQuery] int contactID, UEMSContext ctx)
    {
        var query = ctx.Contacts.Where(c => c.ContactId == contactID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid contact.");

        var contact = await query.Select(ContactExpressions.Base.Expand()).FirstAsync();

        return Results.Ok(contact);
    }

    private static async Task<IResult> GetAll([FromQuery] int? facultyID, UEMSContext ctx)
    {
        var query = ctx.Contacts.AsQueryable();

        var contacts = await query.Select(ContactExpressions.Base.Expand()).ToListAsync();

        return Results.Ok(contacts);
    }

    private static async Task<IResult> Create([FromBody] ContactDataDTO data, UEMSContext ctx)
    {
        Contact contact = new Contact
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.Email,
            Phone = data.Phone,
        };
        ctx.Contacts.Add(contact);

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

    private static async Task<IResult> Update([FromQuery] int contactID, [FromBody] ContactDataDTO data, UEMSContext ctx)
    {
        var query = ctx.Contacts.Where(c => c.ContactId == contactID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid contact.");

        var contact = await query.FirstAsync();

        contact.FirstName = data.FirstName;
        contact.LastName = data.LastName;
        contact.Email = data.Email;
        contact.Phone = data.Phone;

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

    private static async Task<IResult> Delete([FromQuery] int contactID, UEMSContext ctx)
    {
        try
        {
            var entries = await ctx.Contacts.Where(c => c.ContactId == contactID).ExecuteDeleteAsync();
            if (entries == 0) return Results.BadRequest("Couldn't delete anthing.");
        }
        catch (DbUpdateException)
        {
            return Results.BadRequest("Database update failed.");
        }

        return Results.Ok();
    }
}
