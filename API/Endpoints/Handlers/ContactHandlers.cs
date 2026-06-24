using API.DTOs;
using API.Expressions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Handlers;

public class ContactHandlers
{
    public static async Task<IResult> GetOne([FromQuery] int contactID, UEMSContext ctx)
    {
        var query = ctx.Contacts.Where(c => c.ContactId == contactID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid contact.");
            
        var contact = await query.Select(ContactExpressions.Base).ToListAsync();

        return Results.Ok(contact);
    }
    public static async Task<IResult> GetAll(UEMSContext ctx)
    {
        var contacts = await ctx.Contacts.Select(ContactExpressions.Base).ToListAsync();

        return Results.Ok(contacts);
    }

    public static async Task<IResult> Create([FromBody] NewContactDTO data, UEMSContext ctx)
    {
        Contact contact = new Contact
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.Email,
            Phone = data.Phone,
        };

        if (data.InstitutionID != null)
        {
            if (!await ctx.Institutions.Where(i => i.InstitutionId == data.InstitutionID).AnyAsync()) return Results.BadRequest("Invalid institution was selected.");
            contact.InstitutionId = (int)data.InstitutionID;
        }

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

    public static async Task<IResult> Update([FromQuery] int contactID, [FromBody] ContactDataDTO data, HttpContext http, UEMSContext ctx)
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

    public static async Task<IResult> Delete([FromQuery] int contactID, UEMSContext ctx)
    {
        var entries = await ctx.Contacts.Where(c => c.ContactId == contactID).ExecuteDeleteAsync();
        if (entries == 0) return Results.BadRequest("Couldn't delete anthing.");

        return Results.Ok();
    }
}
