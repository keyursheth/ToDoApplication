using System;
using System.Linq;
using ToDo.Persistence.UnitOfWork;

namespace TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            
            Console.WriteLine("Hello World!");

            #region Using DBContext
            //using (var toDoAppContext = new ToDoAppContext())
            //{
            //    if (toDoAppContext != null)
            //    {                   
            //        if (toDoAppContext.Users != null && toDoAppContext.Users.Any())
            //        {
            //            foreach (var user in toDoAppContext.Users)
            //            {
            //                Console.WriteLine(user.FirstName);
            //            }
            //        } 
            //    } 
            //} 
            #endregion

            #region Using UnitOfWork
            //using (IUnitOfWork unitOfWork = new UnitOfWork())
            //{
            //    var users = unitOfWork.Users.GetAll();
                
            //    if (users != null && users.Count() > 0)
            //    {
            //        foreach (var user in users)
            //        {
            //            Console.WriteLine(user.FirstName);
            //        }
            //    }
            //}            
            #endregion

            Console.Read();
        }
    }
}
