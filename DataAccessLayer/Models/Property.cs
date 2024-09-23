using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string PropertyName { get; set; } = string.Empty;
        public ICollection<PaperProperty> PaperProperties { get; set; } = new List<PaperProperty>();
    }
}
