using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class PropertyController(IDBRepo repo) : ControllerBase
    {
        [HttpGet]
        [Route("GetAllProperties")]
        public ActionResult<List<Property>> GetAllProperties()
        {            
            return repo.GetAllProperties();
        }

        [HttpPost]
        [Route("CreateProperty")]
        public ActionResult<List<Property>> CreateProperty(
            [FromBody][Required] Property p)
        {
            repo.CreateProperty(p);
            return GetAllProperties();
        }
        [HttpPut("UpdateProperty/{Id}")]
        public ActionResult<List<Property>> UpdateProperty([FromRoute] int Id,
            [FromBody] Property p)
        {

            return GetAllProperties();
        }
        

        [HttpDelete]
        [Route("Delete/{Id}")]
        public ActionResult<List<Property>> DeleteProperty(
            [FromRoute] int Id,
            [FromBody][Required] Property p)
        {
            if(Id != p.Id)
            {
                return BadRequest("Ids must match");
            }
            //Must check if there is any paper property associated with this property
            repo.DeleteProperty(p);
            return GetAllProperties();
        }

    }
}
