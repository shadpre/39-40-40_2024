using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class DBFacade
    {
        public List<Models.Customer> GetCustomers()
        {
            using (var context = new MyDbContext())
            {
                return context.Customers.ToList();
            }
        }
    }
}
