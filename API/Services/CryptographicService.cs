using System.Security.Cryptography;
using System.Text;

namespace API.Services;

public interface ICryptographicService
{
    string ComputeHash(string plaintext);
}

public class CryptographicService(IConfigStore configStore) : ICryptographicService
{
    private readonly IConfigStore _configStore = configStore;

    public string ComputeHash(string plaintext)
    {
        using var sha256 = SHA256.Create();
        byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(plaintext));

        string hash = Convert.ToHexString(hashBytes);
        return hash;
    }
}
