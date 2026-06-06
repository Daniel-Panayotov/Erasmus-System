namespace API.Interfaces;

public interface IDTO
{
    bool Equals(IDTO? other);
    int GetHashCode();
    int GetID();
}