using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Api.Models
{
    public class TaskModel
    {
        public int taskId { get; set; }
        public string taskDescription { get; set; }
        public int listId { get; set; }
        public string listName { get; set; }
        public int userId { get; set; }
        public bool isComplete { get; set; }
        public string reminderDatetime { get; set; }
    }
}
