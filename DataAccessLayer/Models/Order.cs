using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Order
    {
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Id skal være større eller lig 0")]
        public int Id { get; set; }
        public DateTime? OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime? DeliveryDate { get; set; } = DateTime.UtcNow.AddDays(5);
        public string Status { get; set; } = string.Empty;
        public double TotalAmount { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
    }
}
