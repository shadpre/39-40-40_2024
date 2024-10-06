using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class OrderEntry
    {        
        public int Id { get; set; }
        [Required(ErrorMessage = "Antal er påkrævet")]
        [Range(1, int.MaxValue,
            ErrorMessage = "Antal skal være større end 0")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "Produkt Id er påkrævet")]
        public int ProductId { get; set; }
        public Paper Product { get; set; } = null!;
        [Required(ErrorMessage = "Order Id er påkrævet")]
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }
}
