using DataAccessLayer;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic
{
    public class DBRepo(DBFacade dB) : IDBRepo
    {
        public List<Customer> GetAllCustomers()
        {
            return dB.GetCustomers();
        }

        public Customer CreateCustomer(Customer c)
        {
            return dB.CreateCustomer(c);
        }

        public Order CreateOrder(Order order)
        {
            throw new NotImplementedException();
        }

        public Property CreateProperty(Property p)
        {
            return dB.CreateProperty(p);
        }

        public List<Property> GetAllProperties()
        {
            return dB.GetAllProperties();
        }
    }
}
