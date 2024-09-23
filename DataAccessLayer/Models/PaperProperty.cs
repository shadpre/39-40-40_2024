using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class PaperProperty
    {
        public int PaperId { get; set; }
        public Paper Paper { get; set; } = null!;
        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
    }
}
