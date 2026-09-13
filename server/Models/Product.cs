namespace ZeginHealthHub.Api.Models;

public enum StockStatus
{
    InStock,
    LowStock,
    OutOfStock
}

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; } // Allergies, Pain Relief, Antibiotics, Skincare, Supplements...
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public StockStatus Stock { get; set; }
    public int NearbyStoreCount { get; set; }
    public string? ImageUrl { get; set; }
    public bool PharmacistRecommended { get; set; }
}
