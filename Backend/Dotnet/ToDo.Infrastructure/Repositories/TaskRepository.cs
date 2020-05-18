using System;
using System.Collections.Generic;
using System.Linq;
using ToDo.Domain.Contracts;
using ToDo.Domain.Models;
using ToDo.Persistence.DBContext;

namespace ToDo.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private ToDoAppContext _appContext;

        public TaskRepository(ToDoAppContext appContext)
        {
            _appContext = appContext;
        }

        public void AddToDoItem(ToDoItem toDoItem)
        {
            _appContext.Tasks.Add(
                new Persistence.Entities.Tasks() 
                { 
                    CreatedDate = DateTime.Now 
                });
        }

        public IEnumerable<ToDoItem> GetToDoItemsByUserId(int userId)
        {
            List<ToDoItem> toDoItems = new List<ToDoItem>();

            var tasksByUserId = _appContext.Tasks.Where(user => user.UserId == userId).ToList();

            foreach (var todo in tasksByUserId)
            {
                toDoItems.Add(
                    new ToDoItem() 
                    { 
                        TaskId = todo.TaskId, 
                        TaskDescription = todo.Text, 
                        IsTaskComplete = todo.IsComplete 
                    });
            }

            return toDoItems;
        }
    }
}
