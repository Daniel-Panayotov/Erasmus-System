using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Utilities;
public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString()!;
        // Handles both "2026-06-07" and "2026-06-07T17:23:09.453Z"
        if (DateTime.TryParse(value, out var dt))
            return DateOnly.FromDateTime(dt);
        return DateOnly.Parse(value);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        => writer.WriteStringValue(value.ToString("yyyy-MM-dd"));
}