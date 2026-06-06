using API.Interfaces;

namespace API.DTOs;

abstract public record DTO : IDTO
{
    public bool Equals(IDTO? other)
        => other is not null && GetID() == other.GetID();

    public override int GetHashCode() => GetID().GetHashCode();

    public abstract int GetID();
}