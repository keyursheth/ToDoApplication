using System;
using System.Collections.Generic;
using System.Text;
using ToDo.Domain.Models;
using ToDo.Infrastructure.Entities;

namespace ToDo.Infrastructure.Mappers
{
    public class TasksEntityMapper
    {
        public static Tasks GetTasks(ToDoItem toDoItem)
        {
            Tasks tasks = new Tasks()
            {
                Text = toDoItem.TaskDescription,
                ListId = toDoItem.ListId,
                UserId = toDoItem.UserId,
                IsComplete = false,
                IsDelete = false,
                ModifiedDate = DateTime.Now,
                CreatedDate = DateTime.Now
            };

            return tasks;
        }

        public static ToDoItem GetToDoItem(Tasks tasks)
        {
            return ToDoItem.CreateTodoItem(tasks.ListId, tasks.ReminderDate, tasks.DueDate, tasks.Text, tasks.UserId,
                    tasks.IsComplete, tasks.List.ListName, tasks.TaskId);
        }
    }
}
