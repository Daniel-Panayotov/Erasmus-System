using API.Utilities;
using API.Models;

namespace API.Endpoints;

public class ContactEndpoints
{
    public static void MapContactEndpoints(RouteGroupBuilder group)
    {
        //group.MapGet("/get-one", GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapGet("/get-all", GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapPost("/create", Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapPost("/update", Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapDelete("/delete", Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }

    //public static async Task<IResult> GetOne([FromQuery] int contactID, UEMSContext ctx)
    //{
    //    var query = ctx.Contacts.Where(c => c.ContactId == contactID);

    //    if (!await query.AnyAsync()) return Results.BadRequest("Invalid contact.");

    //    var contact = await query.Select(ContactExpressions.DTO.Expand()).FirstAsync();

    //    return Results.Ok(contact);
    //}

    //public static async Task<IResult> GetAll([FromQuery] int? institutionID, UEMSContext ctx)
    //{
    //    var query = ctx.Contacts.AsQueryable();

    //    if (institutionID != null) 
    //        query = query.Where(c => c.InstitutionId == institutionID);

    //    var contacts = await query.Select(ContactExpressions.Base).ToListAsync();

    //    return Results.Ok(contacts);
    //}

    //public static async Task<IResult> Create([FromBody] SaveContactDTO data, UEMSContext ctx)
    //{
    //    Contact contact = new Contact
    //    {
    //        FirstName = data.FirstName,
    //        LastName = data.LastName,
    //        Email = data.Email,
    //        Phone = data.Phone,
    //    };

    //    if (data.InstitutionID != null)
    //    {
    //        if (!await ctx.Institutions.Where(i => i.InstitutionId == data.InstitutionID).AnyAsync()) return Results.BadRequest("Invalid institution was selected.");
    //        contact.InstitutionId = (int)data.InstitutionID;
    //    }

    //    ctx.Contacts.Add(contact);

    //    try
    //    {
    //        var entries = await ctx.SaveChangesAsync();
    //        if (entries == 0) return Results.BadRequest("No changes were saved.");
    //    }
    //    catch (DbUpdateException)
    //    {
    //        return Results.BadRequest("Database update failed.");
    //    }

    //    return Results.Ok();
    //}

    //public static async Task<IResult> Update([FromQuery] int contactID, [FromBody] SaveContactDTO data, UEMSContext ctx)
    //{
    //    var query = ctx.Contacts.Where(c => c.ContactId == contactID);

    //    if (!await query.AnyAsync()) return Results.BadRequest("Invalid contact.");

    //    var contact = await query.FirstAsync();

    //    contact.FirstName = data.FirstName;
    //    contact.LastName = data.LastName;
    //    contact.Email = data.Email;
    //    contact.Phone = data.Phone;

    //    if (data.InstitutionID != null)
    //    {
    //        if (!await ctx.Institutions.Where(i => i.InstitutionId == data.InstitutionID).AnyAsync())
    //            return Results.BadRequest("Invalid institution.");

    //        contact.InstitutionId = (int)data.InstitutionID;
    //    }
    //    else contact.InstitutionId = null;

    //    try
    //    {
    //        var entries = await ctx.SaveChangesAsync();
    //        if (entries == 0) return Results.BadRequest("No changes were saved.");
    //    }
    //    catch (DbUpdateException)
    //    {
    //        return Results.BadRequest("Database update failed.");
    //    }

    //    return Results.Ok();
    //}

    //public static async Task<IResult> Delete([FromQuery] int contactID, UEMSContext ctx)
    //{
    //    try
    //    {
    //        var entries = await ctx.Contacts.Where(c => c.ContactId == contactID).ExecuteDeleteAsync();
    //        if (entries == 0) return Results.BadRequest("Couldn't delete anthing.");
    //    }
    //    catch (DbUpdateException)
    //    {
    //        return Results.BadRequest("Database update failed.");
    //    }

    //    return Results.Ok();
    //}
}
