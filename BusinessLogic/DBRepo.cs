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

        public Paper CreatePaper(Paper p)
        {
            return dB.CreatePaper(p);
        }

        public List<Paper> GetAllPapers()
        {
            return dB.GetAllPapers();
        }

        public Paper GetPaperById(int i)
        {
            return dB.GetPaperById(i);
        }

        public void DeleteProperty(Property p)
        {
            dB.DeleteProperty(p);
        }
        public void UpdateProperty(Property p)
        {
            dB.UpdateProperty(p);
        }
    }
}
