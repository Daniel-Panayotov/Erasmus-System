using API.Utilities;
using API.Models;

namespace API.Endpoints;

public class InstitutionEndpoints
{
    public static void MapInstitutionEndpoints(RouteGroupBuilder group)
    {
        //group.MapGet("/get-one", GetOne).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapGet("/get-all", GetAll).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapPost("/create", Create).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapPost("/update", Update).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
        //group.MapDelete("/delete", Delete).RequireAuthorization(AuthorizationPolicies.Yes_Token).WithMetadata(new JWTTypeAttribute(TokenType.Access));
    }

    //public static async Task<IResult> GetOne([FromQuery] int institutionID, UEMSContext ctx)
    //{
    //    var query = ctx.Institutions.Where(i => i.InstitutionId == institutionID);

    //    if (!await query.AnyAsync()) return Results.BadRequest("Invalid institution.");

    //    var institution = await query.Select(InstitutionExpressions.DTO.Expand()).FirstAsync();

    //    return Results.Ok(institution);
    //}

    //public static async Task<IResult> GetAll([FromQuery] int? contactID, UEMSContext ctx)
    //{
    //    var query = ctx.Institutions.AsQueryable();

    //    if (contactID != null)
    //        query = query.Where(i => i.Contacts.Where(c => c.ContactId == contactID).Any());

    //    var institutions = await query.Select(InstitutionExpressions.Base).ToListAsync();

    //    return Results.Ok(institutions);
    //}


    //public static async Task<IResult> Create([FromBody] SaveInstitutionDTO data, UEMSContext ctx)
    //{
    //    Institution institution = new Institution
    //    {
    //        Code = data.Code,
    //        Name = data.Name,
    //        Address = data.Address,
    //    };

    //    if (data.ContactIDs.Any())
    //    {
    //        var contactsQuery = ctx.Contacts.Where(c => data.ContactIDs.Contains(c.ContactId));
    //        if (!await contactsQuery.AnyAsync()) return Results.BadRequest("Invalid contacts.");

    //        var contacts = await contactsQuery.ToListAsync();
    //        institution.Contacts = contacts;
    //    }

    //    if (data.FacultyIDs.Any())
    //    {
    //        var facultiesQuery = ctx.Faculties.Where(f => data.FacultyIDs.Contains(f.FacultyId));
    //        if (!await facultiesQuery.AnyAsync()) return Results.BadRequest("Invalid faculties.");

    //        var faculties = await facultiesQuery.ToListAsync();
    //        institution.Faculties = faculties;
    //    }
    //    ctx.Institutions.Add(institution);

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

    //public static async Task<IResult> Update([FromQuery] int institutionID, [FromBody] SaveInstitutionDTO data, UEMSContext ctx)
    //{
    //    var query = ctx.Institutions.Where(i => i.InstitutionId == institutionID);
    //    if (!await query.AnyAsync()) return Results.BadRequest("Invalid institution.");

    //    var institution = await query.Include(i => i.Contacts)
    //                                 .Include(i => i.Faculties)
    //                                 .FirstAsync();

    //    institution.Code = data.Code;
    //    institution.Name = data.Name;
    //    institution.Address = data.Address;

    //    // contacts
    //    var contactsQuery = ctx.Contacts.Where(c => data.ContactIDs.Contains(c.ContactId));
    //    if (!await contactsQuery.AnyAsync() && data.ContactIDs.Any()) return Results.BadRequest("Invalid contacts.");

    //    var contacts = await contactsQuery.ToListAsync();
    //    institution.Contacts.Clear();
    //    institution.Contacts = contacts;

    //    //faculties
    //    var facultiesQuery = ctx.Faculties.Where(f => data.FacultyIDs.Contains(f.FacultyId));
    //    if (!await facultiesQuery.AnyAsync() && data.FacultyIDs.Any()) return Results.BadRequest("Invalid faculties.");

    //    var faculties = await facultiesQuery.ToListAsync();
    //    institution.Faculties.Clear();
    //    institution.Faculties = faculties;

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

    //public static async Task<IResult> Delete([FromQuery] int institutionID, UEMSContext ctx)
    //{
    //    try
    //    {
    //        var entries = await ctx.Institutions.Where(i => i.InstitutionId == institutionID).ExecuteDeleteAsync();
    //        if (entries == 0) return Results.BadRequest("Couldn't delete anthing.");
    //    }
    //    catch (DbUpdateException)
    //    {
    //        return Results.BadRequest("Database update failed.");
    //    }

    //    return Results.Ok();
    //}
}
