using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class OrderController(IDBRepo repo) : ControllerBase
    {
        [HttpPost]
        [Route("CreateOrder")]
        public ActionResult<Order> CreateOrder(Order order)
        {
            return repo.CreateOrder(order);
        }

        [HttpGet]
        [Route("GetOrders/{CustomerId}")]
        public ActionResult<List<Order>> GetOrders([FromRoute]int CustomerId)
        {
            throw new NotImplementedException();
            //return repo.GetOrders(CustomerId);
        }

        [HttpGet]
        [Route("GetAllOrders")]
        public ActionResult<List<Order>> GetAllOrders()
        {
            throw new NotImplementedException();
            //return repo.GetAllOrders();
        }

        [HttpPut]
        [Route("UpdateOrder/{OrderId}")]
        public ActionResult<Order> UpdateOrder([FromRoute] int OrderId, Order order)
        {
            throw new NotImplementedException();
            //return repo.UpdateOrder(OrderId, order);
        }
    }
}
