using DataAccessLayer.Models;

namespace BusinessLogic
{
    public interface IDBRepo
    {
        Order CreateOrder(Order order);
        List<Customer> GetAllCustomers();
    }
}