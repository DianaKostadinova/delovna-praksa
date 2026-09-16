using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Data;

public class ZeginDbContext : DbContext
{
    public ZeginDbContext(DbContextOptions<ZeginDbContext> options) : base(options) { }

    public DbSet<Article> Articles => Set<Article>();
    public DbSet<HealthFact> HealthFacts => Set<HealthFact>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Prescription> Prescriptions => Set<Prescription>();
    public DbSet<TeamMember> TeamMembers => Set<TeamMember>();
    public DbSet<PageViewEvent> PageViewEvents => Set<PageViewEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Patient>()
            .HasIndex(p => p.PatientCode)
            .IsUnique();

        modelBuilder.Entity<Prescription>()
            .HasOne(p => p.Patient)
            .WithMany(p => p.Prescriptions)
            .HasForeignKey(p => p.PatientId);
    }
}
