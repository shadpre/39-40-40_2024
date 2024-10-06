using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Order
    {
        /// <summary>
        /// Gets or sets the customer ID.
        /// </summary>
        /// <remarks>
        /// The ID must be a non-negative integer.
        /// </remarks>
        [Required(ErrorMessage = "Id er påkrævet")]
        [Range(0, int.MaxValue,
            ErrorMessage = "Id skal være større eller lig med 0")]
        public int Id { get; set; }
        //OrderDate is set to the current date and time when the order is created. 
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public DateTime? OrderDate { get; set; } = DateTime.UtcNow;
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public DateOnly? DeliveryDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(5));
        [Required(ErrorMessage = "Status er påkrævet")]
        public OrderStatus Status { get; set; } = OrderStatus.Oprettet;
        //Calculated ServerSide
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public double TotalAmount { get; set; }
        [Required(ErrorMessage = "KundeId er påkrævet")]
        public int CustomerId { get; set; }        
        public Customer Customer { get; set; } = null!;
        [Required(ErrorMessage = "OrderLinier er påkrævet")]
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>();
    }
}
