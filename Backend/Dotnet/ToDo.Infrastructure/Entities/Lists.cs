using System;
using System.Collections.Generic;

namespace ToDo.Infrastructure.Entities
{
    public partial class Lists
    {
        public Lists()
        {
            Tasks = new HashSet<Tasks>();
        }

        public int ListId { get; set; }
        public string ListName { get; set; }
        public int UserId { get; set; }
        public bool IsDelete { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Tasks> Tasks { get; set; }
    }
}
