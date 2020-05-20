using System;
using System.Collections.Generic;

namespace ToDo.Infrastructure.Entities
{
    public partial class Tasks
    {
        public int TaskId { get; set; }
        public int ListId { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public bool IsDelete { get; set; }
        public DateTime? ReminderDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Lists List { get; set; }
        public virtual Users User { get; set; }
    }
}
