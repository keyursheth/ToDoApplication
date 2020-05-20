using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Contracts;
using ToDo.Domain.Models;
using ToDo.Infrastructure.DBContext;
using ToDo.Infrastructure.Entities;

namespace ToDo.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private ToDoAppContext _appContext;

        public TaskRepository(ToDoAppContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<int> AddToDoItem(ToDoItem toDoItem)
        {
            Tasks tasks = new Tasks()
            {
                Text = toDoItem.TaskDescription,
                ListId = 1,
                UserId = 1,
                IsComplete = false,
                IsDelete = false,
                ModifiedDate = DateTime.Now,
                CreatedDate = DateTime.Now
            };

            await _appContext.Tasks.AddAsync(tasks);
            
            await _appContext.SaveChangesAsync();

            return tasks.TaskId;
        }

        public async Task<IEnumerable<ToDoItem>> GetToDoItemsByUserId(int userId)
        {
            List<ToDoItem> toDoItems = new List<ToDoItem>();

            var tasksByUserId = await _appContext.Tasks
                .Include(l => l.List)
                .Where(todo => todo.UserId == userId && todo.IsDelete == false)
                .ToListAsync();

            var allTasks = tasksByUserId
                .Where(t => 
                    t.List != null && 
                    string.IsNullOrEmpty(t.List.ListName) == false && 
                    t.List.IsDelete == false).ToList();

            foreach (var todo in allTasks)
            {
                toDoItems.Add(ToDoItem.CreateTodoItem(todo.ListId, todo.ReminderDate, todo.DueDate, todo.Text, 
                    todo.IsComplete, todo.List.ListName, todo.TaskId));
            }

            return toDoItems;
        }
    }
}
