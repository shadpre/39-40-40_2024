using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    /// <summary>
    /// Represents a customer with an ID, name, email, address, and phone number.
    /// </summary>
    public class Customer
    {
        /// <summary>
        /// Gets or sets the customer ID.
        /// </summary>
        /// <remarks>
        /// The ID must be a non-negative integer.
        /// </remarks>
        [Required(ErrorMessage = "Id er påkrævet")]
        [Range(0,
            int.MaxValue,
            ErrorMessage = "Id skal være større eller lig med 0")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the customer's name.
        /// </summary>
        /// <remarks>
        /// The name must be between 3 and 100 characters long and contain at least one space.
        /// </remarks>
        [Required(ErrorMessage = "Navn er påkrævet")]
        [StringLength(100, MinimumLength = 3,
            ErrorMessage = "Navn skal være mindst 3 tegn langt.")]
        [RegularExpression(@"^.*\s+.*$",
            ErrorMessage = "Navn skal indeholde mindst ét mellemrum.")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the customer's email address.
        /// </summary>
        /// <remarks>
        /// The email must be a valid email address and between 5 and 100 characters long.
        /// </remarks>
        [Required(ErrorMessage = "Email er påkrævet")]
        [EmailAddress(ErrorMessage = "Ugyldig emailadresse")]
        [StringLength(100,
            MinimumLength = 5,
            ErrorMessage = "Email skal være mellem 5 og 100 tegn lang.")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the customer's address.
        /// </summary>
        /// <remarks>
        /// The address must be between 3 and 100 characters long and contain at least one space.
        /// </remarks>
        [Required(ErrorMessage = "Adresse er påkrævet")]
        [StringLength(100, MinimumLength = 3,
            ErrorMessage = "Adresse skal være mindst 3 tegn lang.")]
        [RegularExpression(@"^.*\s+.*$",
            ErrorMessage = "Adresse skal indeholde mindst ét mellemrum.")]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the customer's phone number.
        /// </summary>
        /// <remarks>
        /// The phone number must be a maximum of 25 characters long.
        /// </remarks>
        [StringLength(25,
            ErrorMessage = "Telefonnummer må maksimalt være 25 tegn langt.")]
        public string Phone { get; set; } = string.Empty;
    }
}
