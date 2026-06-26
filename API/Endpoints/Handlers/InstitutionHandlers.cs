using API.DTOs;
using API.Expressions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Handlers;

public class InstitutionHandlers
{
    public static async Task<IResult> GetOne([FromQuery] int institutionID, UEMSContext ctx)
    {
        var query = ctx.Institutions.Where(i => i.InstitutionId == institutionID);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid institution.");

        var institution = await query.Select(InstitutionExpressions.Base).FirstAsync();

        return Results.Ok(institution);
    }

    public static async Task<IResult> GetAll(UEMSContext ctx)
    {
        var contacts = await ctx.Institutions.Select(InstitutionExpressions.Base).ToListAsync();

        return Results.Ok(contacts);
    }


    public static async Task<IResult> Create([FromBody] SaveInstitutionDTO data, UEMSContext ctx)
    {
        Institution institution = new Institution
        {
            Code = data.Code,
            Name = data.Name,
            Address = data.Address,
        };

        if (data.ContactIDs.Any())
        {
            var contactsQuery = ctx.Contacts.Where(c => data.ContactIDs.Contains(c.ContactId));
            if (!await contactsQuery.AnyAsync()) return Results.BadRequest("Invalid contacts.");

            var contacts = await contactsQuery.ToListAsync();
            institution.Contacts = contacts;
        }

        if (data.FacultyIDs.Any())
        {
            var facultiesQuery = ctx.Faculties.Where(f => data.FacultyIDs.Contains(f.FacultyId));
            if (!await facultiesQuery.AnyAsync()) return Results.BadRequest("Invalid faculties.");

            var faculties = await facultiesQuery.ToListAsync();
            institution.Faculties = faculties;
        }
        ctx.Institutions.Add(institution);

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

    public static async Task<IResult> Update([FromQuery] int institutionID, [FromBody] SaveInstitutionDTO data, UEMSContext ctx)
    {
        var query = ctx.Institutions.Where(i => i.InstitutionId == institutionID);
        if (!await query.AnyAsync()) return Results.BadRequest("Invalid institution.");

        var institution = await query.FirstAsync();

        institution.Code = data.Code;
        institution.Name = data.Name;
        institution.Address = data.Address;

        if (data.ContactIDs.Any())
        {
            var contactsQuery = ctx.Contacts.Where(c => data.ContactIDs.Contains(c.ContactId));
            if (!await contactsQuery.AnyAsync()) return Results.BadRequest("Invalid contacts.");

            var contacts = await contactsQuery.ToListAsync();
            institution.Contacts = contacts;
        }

        if (data.FacultyIDs.Any())
        {
            var facultiesQuery = ctx.Faculties.Where(f => data.FacultyIDs.Contains(f.FacultyId));
            if (!await facultiesQuery.AnyAsync()) return Results.BadRequest("Invalid faculties.");

            var faculties = await facultiesQuery.ToListAsync();
            institution.Faculties = faculties;
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

    public static async Task<IResult> Delete([FromQuery] int institutionID, UEMSContext ctx)
    {
        try
        {
            var entries = await ctx.Institutions.Where(i => i.InstitutionId == institutionID).ExecuteDeleteAsync();
            if (entries == 0) return Results.BadRequest("Couldn't delete anthing.");
        }
        catch (DbUpdateException)
        {
            return Results.BadRequest("Database update failed.");
        }

        return Results.Ok();
    }
}
