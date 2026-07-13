using API.Models;
using API.Utilities;

namespace API.Endpoints;

public class ApplicationEndpoints
{
    public static void MapApplicationEndpoints(RouteGroupBuilder group)
    {
        //group.MapGet("/get-all", Get);
        //group.MapPost("/create", Create)
        //    .RequireAuthorization(AuthorizationPolicies.Yes_Token)
        //    .WithMetadata(new JWTTypeAttribute(TokenType.Access))
        //    .DisableAntiforgery();
    }

    // TODO: Change expression 
    //private static async Task<IResult> Get(int studentID, UEMSContext ctx)
    //{
    //    var query = ctx.Applications.Where(a => a.StudentId == studentID);

    //    var applications = await query.Select(ApplicationExpressions.Base).ToListAsync();

    //    return Results.Ok(applications);
    //}

    //// TODO: ADD Institution relations when they are implemented
    //private static async Task<IResult> Create([FromForm] NewApplicationDTO data, HttpContext http, UEMSContext ctx)
    //{
    //    var userID = http.User.TryGetUserID();
    //    if (userID == null) return Results.BadRequest("Invalid user identity.");

    //    var studentQuery = ctx.Students.Where(s => s.UserId == userID);
    //    if (!await studentQuery.AnyAsync()) return Results.BadRequest("Invalid user.");

    //    var student = await studentQuery.Select(StudentExpressions.Base).FirstAsync();

    //    using var ms = new MemoryStream();
    //    await data.photo.CopyToAsync(ms);
    //    byte[] bytes = ms.ToArray();

    //    Application application = new Application
    //    {
    //        StudentId = student.StudentID,
    //        Photo = bytes,
    //        MobilityType = data.mobilityType.ToString(),
    //        StudyFrom = data.studyFrom,
    //        StudyTo = data.studyTo,
    //        Accommodation = data.accommodation,
    //        AccommodationFrom = data.accommodationFrom,
    //        AccommodationTo = data.accommodationTo,
    //        BulgarianCourse = data.bulgarianCourse,
    //        MotivationText = data.motivationText,
    //        Degree = data.degree.ToString(),
    //        PriorStudyAbroad = data.priorStudyAbroad,
    //        PriorStudyDuration = data.priorStudyDuration,
    //    };
    //    ctx.Applications.Add(application);

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
}
