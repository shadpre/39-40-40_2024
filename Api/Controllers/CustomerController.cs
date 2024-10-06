using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController(IDBRepo repo) : ControllerBase
    {
        [HttpGet]
        [Route("GetCustomers")]
        public ActionResult<List<Customer>> GetCustomers()
        {
            return repo.GetAllCustomers();
        }

        [HttpPost]
        [Route("CreateNewCustomer")]
        public ActionResult<Customer> CreateNewCustomer([FromBody][Required] Customer Customer)
        {
            return repo.CreateCustomer(Customer);
        }
    }
}
