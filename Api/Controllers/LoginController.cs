using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController(IDBRepo repo) : ControllerBase
    {
        //HttpPost is chosen because we are sending "Sensitive" data to the server and want to be able to put it in the body of the request
        [HttpPost]
        public ActionResult<Customer> Login([FromBody][Required] string Email)
        {
            throw new NotImplementedException();
        }
    }
}
