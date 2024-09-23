using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public double TotalAmount { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
    }
}
