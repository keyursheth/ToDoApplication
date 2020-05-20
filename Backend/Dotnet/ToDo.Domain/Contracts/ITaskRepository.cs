using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Models;

namespace ToDo.Domain.Contracts
{
    public interface ITaskRepository
    {
        Task<IEnumerable<ToDoItem>> GetToDoItemsByUserId(int userId);

        Task<int> AddToDoItem(ToDoItem toDoItem);
    }
}
