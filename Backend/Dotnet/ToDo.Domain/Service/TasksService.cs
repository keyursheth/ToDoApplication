using System;
using System.Collections.Generic;
using System.Text;
using ToDo.Domain.DTOs;

namespace ToDo.Domain.Service
{
    public class TasksService
    {
        private readonly ToDoAppContext
        public async List<TaskDTO> GetTasksByUser(int userId)
        {
            IEnumerable<ToDoItem> toDoItems = await _taskRepository.GetToDoItemsByUserId(userId);
        }
    }
}
