using DataAccessLayer.Models;

namespace BusinessLogic
{
    public interface IDBRepo
    {
        Order CreateOrder(Order o);
        List<Customer> GetAllCustomers();
        Customer CreateCustomer(Customer c);
        Property CreateProperty(Property p);
        List<Property> GetAllProperties();
        Paper CreatePaper(Paper p);
        List<Paper> GetAllPapers();
        Paper GetPaperById(int i);
        void DeleteProperty(Property p);
        void UpdateProperty(Property p);
    }
}