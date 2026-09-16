using Microsoft.EntityFrameworkCore;
using ZeginHealthHub.Api.Models;

namespace ZeginHealthHub.Api.Data;

public class ZeginDbContext : DbContext
{
    public ZeginDbContext(DbContextOptions<ZeginDbContext> options) : base(options) { }

    public DbSet<Article> Articles => Set<Article>();
    public DbSet<HealthFact> HealthFacts => Set<HealthFact>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<PageViewEvent> PageViewEvents => Set<PageViewEvent>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
}
