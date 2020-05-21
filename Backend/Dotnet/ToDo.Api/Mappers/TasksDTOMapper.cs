using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Api.DTOs;
using ToDo.Domain.Models;

namespace ToDo.Api.Mappers
{
    public class TasksDTOMapper
    {
        public static ToDoItem GetToDoItem(TaskDTO taskDTO)
        {
            return ToDoItem.CreateTodoItem(
                taskDTO.listId, 
                taskDTO.reminderDateTime, 
                taskDTO.dueDate, 
                taskDTO.taskDescription, 
                taskDTO.userId,
                isComplete: taskDTO.isComplete
            );
        }

        public static TaskDTO GetTaskDTO(ToDoItem todo)
        {
            return new TaskDTO()
            {
                taskId = todo.TaskId,
                taskDescription = todo.TaskDescription,
                reminderDateTime = todo.ReminderDateTime,
                dueDate = todo.DueDate,
                isComplete = todo.IsTaskComplete,
                listId = todo.ListId,
                listName = todo.ListName
            };
        }
    }
}
