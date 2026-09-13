namespace ZeginHealthHub.Api.Models;

public enum PrescriptionStatus
{
    Active,
    Completed,
    Pending
}

public class Prescription
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public Patient? Patient { get; set; }
    public required string Medication { get; set; }
    public required string DosageInfo { get; set; } // e.g. "ACE Inhibitor"
    public required string Dosage { get; set; } // e.g. "10mg Oral Tab"
    public required string Physician { get; set; }
    public PrescriptionStatus Status { get; set; }
    public DateOnly DatePrescribed { get; set; }
    public required string RxId { get; set; } // e.g. "RX-448291"
}
