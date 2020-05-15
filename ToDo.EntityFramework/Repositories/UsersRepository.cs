using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ToDo.Persistence.DBContext;
using ToDo.Persistence.Models;

namespace ToDo.Persistence.Repositories
{
    class UsersRepository : Repository<Users>, IUsersRepository
    {
        private ToDoAppContext _appContext;

        public UsersRepository(ToDoAppContext toDoAppContext) : base(toDoAppContext)
        {
            _appContext = toDoAppContext;
        }

        public IEnumerable<Users> GetUsersWithoutEmail()
        {
            return _appContext.Users.Where(user => user.Email == string.Empty).ToList();
        }
    }
}
