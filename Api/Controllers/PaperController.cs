using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class PaperController(IDBRepo repo) : ControllerBase
    {
        [HttpGet]
        [Route("GetPapers")]
        public ActionResult<List<Paper>> GetPapers()
        {
            return repo.GetAllPapers();
        }

        [HttpGet("{id}")]
        public ActionResult<Paper> GetPaperById([FromRoute]int id)
        {
            var result = repo.GetPaperById(id);            
            return Ok(result);
        }

        [HttpPost]
        [Route("CreatePaper")]
        public ActionResult<Paper> CreatePaper([FromBody][Required] Paper p)
        {
            
            return Ok(repo.CreatePaper(p));
        }

        [HttpPut]
        [Route("UpdatePaper/{Id}")]
        public ActionResult<Paper> UpdatePaper(
            [FromBody][Required] Paper Paper,
            [FromRoute] int Id)
        {
            if (Id != Paper.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.UpdatePaper(paper);
        }

        [HttpDelete]
        [Route("DeletePaper/{PaperId}")]
        public ActionResult<Paper> DeletePaper(
            [FromRoute] int PaperId,
            [FromBody][Required] Paper Paper)
        {
            if (PaperId != Paper.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.DeletePaper(PaperId);
        }
        [HttpPut]
        [Route("DiscontinuePaper/{PaperId}")]
        public ActionResult<Paper> DiscontinuePaper(
            [FromRoute][Range(0, int.MaxValue)] int PaperId,
            [FromQuery][Required] bool IsDiscontinued,
            [FromBody][Required] Paper Paper)
        {
            if (PaperId != Paper.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.DiscontinuePaper(PaperId);
        }

        [HttpPut]
        [Route("UpdatePaperPrice/{PaperId}")]
        public ActionResult<Paper> UpdatePaperPrice(
            [FromRoute] int PaperId,
            [FromQuery][Required] double Price,
            [FromBody][Required] Paper Paper)
        {
            if (PaperId != Paper.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.UpdatePaperPrice(PaperId);
        }

        [HttpPut]
        [Route("UpdatePaperStock/{PaperId}")]
        public ActionResult<Paper> UpdatePaperStock(
            [FromRoute] int PaperId,
            [FromQuery][Required] int AddToStock,
            [FromBody][Required] Paper Paper)
        {
            if (PaperId != Paper.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.UpdatePaperStock(PaperId);
        }

        [HttpPut]
        [Route("ChangePaperProp/{PaperId}")]
        public ActionResult<Paper> AddPaperProperty(
            [FromRoute][Required] int PaperId,
            [FromQuery][Required] int PaperProperty)
        {
            //Add or remove a property from a paper depending on the value Depending if the property is already on the paper
            throw new NotImplementedException();
            //return repo.AddPaperProperty(PaperId, PaperProperty);
        }
    }
}
