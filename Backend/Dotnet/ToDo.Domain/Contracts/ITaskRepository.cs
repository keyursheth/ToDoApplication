using System.Collections.Generic;
using ToDo.Domain.Models;

namespace ToDo.Domain.Contracts
{
    public interface ITaskRepository
    {
        IEnumerable<ToDoItem> GetToDoItemsByUserId(int userId);

        void AddToDoItem(ToDoItem toDoItem);
    }
}
