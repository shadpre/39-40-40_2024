using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

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
    }
}
