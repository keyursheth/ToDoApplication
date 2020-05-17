using System;
using ToDo.Persistence.Repositories;
using ToDo.UnitOfWork.Models;

namespace ToDo.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        public IRepository<Users> usersRepository { get; }
        public IRepository<Lists> listsRepository { get; }
        public IRepository<Tasks> tasksRepository { get; }
        public void Save();
    }
}
