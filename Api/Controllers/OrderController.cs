using BusinessLogic;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class OrderController(IDBRepo repo) : ControllerBase
    {
        [HttpPost]
        [Route("CreateOrder")]
        public ActionResult<Order> CreateOrder(
            [FromBody][Required] Order Order,
            [FromBody][Required] Customer Customer)
        {
            return repo.CreateOrder(Order);
        }

        [HttpGet]
        [Route("GetOrders/{CustomerId}")]
        public ActionResult<List<Order>> GetOrders(
            [FromRoute]int CustomerId,
            [FromBody][Required] Customer Customer)
        {
            if(CustomerId != Customer.Id)
            {
                return BadRequest("Ids must match");
            }
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
        public ActionResult<Order> UpdateOrder(
            [FromRoute] int OrderId,
            [FromBody][Required] Order Order)
        {
            if (OrderId != Order.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.UpdateOrder(OrderId, Order);
        }

        [HttpPut]
        [Route("UpdateOrderStatus/{OrderId}")]
        public ActionResult<Order> UpdateOrderStatus(
            [FromRoute] int OrderId,
            [FromBody][Required] string Status,
            [FromBody][Required] Order Order)
        {
            if (OrderId != Order.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.UpdateOrderStatus(OrderId, status);
        }

        [HttpPut]
        [Route("UpdateOrderDeliveryDate/{OrderId}")]
        public ActionResult<Order> UpdateOrderDeliveryDate(
            [FromRoute] int OrderId,
            [FromQuery][Required] DateOnly deliveryDate,
            [FromBody][Required] Order Order
            )
        {
            if (OrderId != Order.Id)
            {
                return BadRequest("Ids must match");
            }
            throw new NotImplementedException();
            //return repo.UpdateOrderDeliveryDate(OrderId, deliveryDate);
        }        
    }
}
