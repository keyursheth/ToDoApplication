using System;
using System.Collections.Generic;
using System.Text;

namespace ToDo.ServiceLayer.Models
{
    public class TaskDomainModel
    {
        public int TaskId { get; set; }
        public string TaskDescription { get; set; }
        public bool IsTaskComplete { get; set; }
    }
}
