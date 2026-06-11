using System.Security.Claims;

namespace API.Utilities;

public static class ClaimsUtilities
{
    public static int? TryGetUserID(this ClaimsPrincipal principal)
    {
        string userIdentifier = principal.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
        Int32.TryParse(userIdentifier, out var userID);

        return userID;
    }
}
