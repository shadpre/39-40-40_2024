using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Paper
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Discontinued { get; set; }
        public int Stock { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public ICollection<PaperProperty> PaperProperties { get; set; } = new List<PaperProperty>();
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
    }
}
