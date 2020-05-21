using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Contracts;
using ToDo.Domain.Models;
using ToDo.Infrastructure.DBContext;
using ToDo.Infrastructure.Entities;
using ToDo.Infrastructure.Mappers;

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
            Tasks tasks = TasksEntityMapper.GetTasks(toDoItem);

            await _appContext.Tasks.AddAsync(tasks);
            
            await _appContext.SaveChangesAsync();

            return tasks.TaskId;
        }

        public async Task<IEnumerable<ToDoItem>> GetToDoItemsByUserId(int userId)
        {
            List<ToDoItem> toDoItems = new List<ToDoItem>();

            var tasksByUserId = await _appContext.Tasks
                .Include(l => l.List)
                .Where(todo => todo.UserId == userId)
                .ToListAsync();

            var allTasks = tasksByUserId
                .Where(t => 
                    t.List != null && 
                    string.IsNullOrEmpty(t.List.ListName) == false && 
                    t.List.IsDelete == false).ToList();

            foreach (var task in allTasks)
            {
                toDoItems.Add(TasksEntityMapper.GetToDoItem(task));
            }

            return toDoItems;
        }

        public async void UpdateTask(ToDoItem toDoItem)
        {
            var task = await _appContext.Tasks.FindAsync(toDoItem.TaskId);

            if (task != null)
            {
                task.Text = toDoItem.TaskDescription;
                task.IsComplete = toDoItem.IsTaskComplete;
                task.IsDelete = toDoItem.IsDelete;                
                task.DueDate = toDoItem.DueDate;
                task.ReminderDate = toDoItem.ReminderDateTime;
                task.ModifiedDate = DateTime.Now;

                _appContext.Tasks.Update(task);

                await _appContext.SaveChangesAsync(); 
            }
        }
    }
}
