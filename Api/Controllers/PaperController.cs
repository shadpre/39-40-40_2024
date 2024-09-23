using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class PaperController(IDBRepo repo) : ControllerBase
    {
        [HttpGet]
        [Route("GetPapers")]
        public ActionResult<List<Paper>> GetPapers()
        {
            throw new NotImplementedException();
            //return repo.GetAllPapers();
        }

        [HttpPost]
        [Route("CreatePaper")]
        public ActionResult<Paper> CreatePaper(Paper paper)
        {
            throw new NotImplementedException();
            //return repo.CreatePaper(paper);
        }

        [HttpPut]
        [Route("UpdatePaper")]
        public ActionResult<Paper> UpdatePaper(Paper paper)
        {
            throw new NotImplementedException();
            //return repo.UpdatePaper(paper);
        }
    }
}
