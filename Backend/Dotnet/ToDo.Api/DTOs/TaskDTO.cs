using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Api.DTOs
{
    public class TaskDTO
    {
        public int listId { get; set; }
        public string taskDescription { get; set; }
        public DateTime? reminderDateTime { get; set; }
        public DateTime? dueDate { get; set; }
        public int taskId { get; set; }
        public string listName { get; set; }
        public bool isComplete { get; set; }
    }
}
