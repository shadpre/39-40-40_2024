using DataAccessLayer.Models;

namespace BusinessLogic
{
    public interface IDBRepo
    {
        Order CreateOrder(Order o);
        List<Customer> GetAllCustomers();
        Customer CreateCustomer(Customer c);
    }
}