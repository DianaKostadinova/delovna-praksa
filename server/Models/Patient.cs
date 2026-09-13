namespace ZeginHealthHub.Api.Models;

// Demo/seed data only. The original design's "SSN lookup" field is implemented here as a
// lookup by fictitious PatientCode (e.g. "992-BA-01") rather than a real SSN, since a real
// system should never look patients up by Social Security Number.
public class Patient
{
    public int Id { get; set; }
    public required string PatientCode { get; set; }
    public required string FullName { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public required string BloodType { get; set; }
    public required string Allergies { get; set; }
    public required string InsuranceStatus { get; set; }
    public string? PhotoUrl { get; set; }

    public List<Prescription> Prescriptions { get; set; } = new();
}
