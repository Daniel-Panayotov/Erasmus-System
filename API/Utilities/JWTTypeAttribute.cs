namespace API.Utilities;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class JWTTypeAttribute : Attribute
{
    public TokenType TokenType { get; set; }

    public JWTTypeAttribute(TokenType tokenType)
    {
        TokenType = tokenType;
    }
}

public enum TokenType
{
    Access, Refresh
}