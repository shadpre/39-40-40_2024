using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class OrderEntry
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public Paper Product { get; set; } = null!;
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }
}
