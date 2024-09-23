using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Paper> Papers { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<PaperProperty> PaperProperties { get; set; }
    public DbSet<OrderEntry> OrderEntries { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=Paper;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PaperProperty>()
            .HasKey(pp => new { pp.PaperId, pp.PropertyId });

        modelBuilder.Entity<PaperProperty>()
            .HasOne(pp => pp.Paper)
            .WithMany(p => p.PaperProperties)
            .HasForeignKey(pp => pp.PaperId);

        modelBuilder.Entity<PaperProperty>()
            .HasOne(pp => pp.Property)
            .WithMany(p => p.PaperProperties)
            .HasForeignKey(pp => pp.PropertyId);

        modelBuilder.Entity<OrderEntry>()
            .HasOne(oe => oe.Order)
            .WithMany(o => o.OrderEntries)
            .HasForeignKey(oe => oe.OrderId);

        modelBuilder.Entity<OrderEntry>()
            .HasOne(oe => oe.Product)
            .WithMany(p => p.OrderEntries)
            .HasForeignKey(oe => oe.ProductId);
    }
}
