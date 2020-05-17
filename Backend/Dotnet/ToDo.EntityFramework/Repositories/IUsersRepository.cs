using System;
using System.Collections.Generic;
using System.Text;
using ToDo.Persistence.Models;

namespace ToDo.Persistence.Repositories
{
    public interface IUsersRepository : IRepository<Users>
    {
        IEnumerable<Users> GetUsersWithoutEmail();
    }
}
