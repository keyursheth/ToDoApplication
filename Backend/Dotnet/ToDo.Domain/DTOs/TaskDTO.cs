using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Domain.DTOs
{
    public class TaskDTO
    {
        public int taskId { get; set; }
        public int listId { get; set; }
        public string listName { get; set; }
        public int userId { get; set; }
        public string taskDescription { get; set; }
        public bool isComplete { get; set; }
        public DateTime? reminderDateTime { get; set; }
        public DateTime? dueDate { get; set; }        
    }
}
