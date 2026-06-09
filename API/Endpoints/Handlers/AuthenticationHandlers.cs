using API.DTOs;
using API.Expressions;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Endpoints.Handlers;

public class AuthenticationHandlers
{
    public static async Task<IResult> Login(
        [FromBody] UserDataDTO userDTO, 
        [FromServices] HttpContext http, [FromServices] UEMSContext ctx, [FromServices] JWTService jwtService, 
        [FromServices] CryptographicService crypto, [FromServices] IConfigStore config)
    {
        var query = ctx.Users.Where(u => u.Email.CompareTo(userDTO.Email) == 0)
                             .Select(UserExpressions.Base);

        if (!await query.AnyAsync()) return Results.BadRequest("Invalid email.");

        var user = await query.FirstAsync();

        string passHash = crypto.ComputeHash(userDTO.Password);
        if (user.Password.CompareTo(passHash) != 0) return Results.BadRequest("Invalid password.");

        string token = jwtService.GenerateRefreshToken(user.UserID.ToString());

        var jwtConfig = config.JwtConfig;
        http.Response.Cookies.Append(jwtConfig.RefreshTokenKey, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(jwtConfig.RefreshTokenExpireDays),
            Path = "/",
        });

        return Results.Ok();
    }

    public static async Task<IResult> Register(
        [FromBody] UserDataDTO userDTO,
        [FromServices] HttpContext http, [FromServices] UEMSContext ctx, [FromServices] JWTService jwtService,
        [FromServices] CryptographicService crypto, [FromServices] IConfigStore config)
    {
        var query = ctx.Users.Where(u => u.Email.CompareTo(userDTO.Email) == 0);

        if (await query.AnyAsync()) return Results.BadRequest("Email already in use.");

        string passHash = crypto.ComputeHash(userDTO.Password);
        User user = new User { Email = userDTO.Email, Password = passHash };
        ctx.Users.Add(user);

        try
        {
            var entries = await ctx.SaveChangesAsync();
            if (entries == 0) return Results.BadRequest("Couldn't register.");
        }
        catch (DbUpdateException) {
            return Results.BadRequest("Database update failed.");
        }

        var registeredUser = await query.FirstAsync();

        string token = jwtService.GenerateRefreshToken(registeredUser.UserId.ToString());

        var jwtConfig = config.JwtConfig;
        http.Response.Cookies.Append(jwtConfig.RefreshTokenKey, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(jwtConfig.RefreshTokenExpireDays),
            Path = "/",
        });

        return Results.Ok();
    }

    public static async Task<IResult> Refresh(HttpContext http, UEMSContext ctx, JWTService jwtService, IConfigStore config)
    {
        string? userIdentifier = http.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

        if (userIdentifier == null) return Results.BadRequest("Missing user identity.");
        if (!Int32.TryParse(userIdentifier, out var userID)) return Results.BadRequest("Invalid user identity.");

        var query = ctx.Users.Where(u => u.UserId == userID);
        if (!await query.AnyAsync()) return Results.BadRequest("User could not be found.");

        string token = jwtService.GenerateAccessToken(userIdentifier, []);

        var jwtConfig = config.JwtConfig;
        http.Response.Cookies.Append(jwtConfig.AccessTokenKey, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddMinutes(jwtConfig.AccessTokenExpireMinutes),
            Path = "/",
        });

        // TODO: Return info DTO
        return Results.Ok();
    }

    public static async Task<IResult> Logout(HttpContext http, IConfigStore config)
    {
        http.Response.Cookies.Delete(config.JwtConfig.RefreshTokenKey);
        http.Response.Cookies.Delete(config.JwtConfig.AccessTokenKey);
        return Results.Ok();
    }
}
