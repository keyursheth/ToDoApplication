using System;
using System.Collections.Generic;

namespace ToDo.Infrastructure.Entities
{
    public partial class Users
    {
        public Users()
        {
            Lists = new HashSet<Lists>();
            Tasks = new HashSet<Tasks>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsDelete { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<Lists> Lists { get; set; }
        public virtual ICollection<Tasks> Tasks { get; set; }
    }
}
