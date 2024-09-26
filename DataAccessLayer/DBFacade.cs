﻿using DataAccessLayer.Models;
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

        public Customer CreateCustomer(Customer c)
        {
            using (var context = new MyDbContext())
            {
                context.Customers.Add(c);
                context.SaveChanges();
                return c;
            }
        }

        public Customer UpdateCustomer(Customer c)
        {
            using (var context = new MyDbContext())
            {
                context.Customers.Update(c);
                context.SaveChanges();
                return c;
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
        public Property CreateProperty(Property pr)
        {
            using (var context = new MyDbContext())
            {
                context.Properties.Add(pr);
                context.SaveChanges();
                return pr;
            }
        }
        public List<Property> GetAllProperties()
        {
            using (var context = new MyDbContext())
            {
                return context.Properties.ToList();
            }
        }

        public void AddPropertiesToProduct(int paID, List<int> prIDs)
        {
            if (prIDs.Count == 0) throw new ArgumentException("No properties to add", nameof(prIDs));

            using (var context = new MyDbContext())
            {
               var paperProps = new List<PaperProperty>();
                foreach (var prID in prIDs)
                {
                    paperProps.Add(new PaperProperty { PaperId = paID, PropertyId = prID });
                }
                context.PaperProperties.AddRange(paperProps);
                context.SaveChanges();
            }
        }
        #endregion
    }
}
