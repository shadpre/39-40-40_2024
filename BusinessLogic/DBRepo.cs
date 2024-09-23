using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic
{
    public class DBRepo : IDBRepo
    {
        public List<Customer> GetAllCustomers()
        {
            using (var context = new MyDbContext())
            {
                return context.Customers.ToList();
            }
        }

        public Order CreateOrder(Order order)
        {
            using (var context = new MyDbContext())
            {
                context.Orders.Add(order);
                context.SaveChanges();
                return order;
            }
        }
    }
}
