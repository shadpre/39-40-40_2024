using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class PropertyController(IDBRepo repo) : ControllerBase
    {
        [HttpGet]
        [Route("GetProperties")]
        public ActionResult<List<Property>> GetProperties()
        {
            throw new NotImplementedException();
            //return repo.GetAllProperties();
        }

        [HttpPost]
        [Route("CreateProperty")]
        public ActionResult<Property> CreateProperty(Property property)
        {
            throw new NotImplementedException();
            //return repo.CreateProperty(property);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public ActionResult<Property> DeleteProperty([FromRoute] int id)
        {
            throw new NotImplementedException();
            //return repo.DeleteProperty(id);
        }

    }
}
