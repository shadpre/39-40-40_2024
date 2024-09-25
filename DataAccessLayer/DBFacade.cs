using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    #region Customer
    public class DBFacade
    {
        public List<Customer> GetCustomers()
        {
            using (var context = new MyDbContext())
            {
                return context.Customers.ToList();
            }
        }

        public Customer GetCustomerById(int id)
        {
            using (var context = new MyDbContext())
            {
                return context.Customers.Find(id);
            }
        }

        public Customer CreateCustomer(Customer customer)
        {
            using (var context = new MyDbContext())
            {
                context.Customers.Add(customer);
                context.SaveChanges();
                return customer;
            }
        }

        public Customer UpdateCustomer(Customer customer)
        {
            using (var context = new MyDbContext())
            {
                context.Customers.Update(customer);
                context.SaveChanges();
                return customer;
            }
        }

        public void DeleteCustomer(int id)
        {
            using (var context = new MyDbContext())
            {
                var customer = context.Customers.Find(id);
                context.Customers.Remove(customer);
                context.SaveChanges();
            }
        }
        #endregion

        #region Properties
        public Property CreateProperty(Property p)
        {
            using (var context = new MyDbContext())
            {
                context.Add(p);
                context.SaveChanges();
                return p;
            }
        }
        public List<Property> GetAllProperties()
        {
            using (var context = new MyDbContext())
            {
                return context.Properties.ToList();
            }
            #endregion
        }
    }
}
