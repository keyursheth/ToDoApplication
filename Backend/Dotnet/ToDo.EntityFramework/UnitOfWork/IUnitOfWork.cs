using System;
using ToDo.Persistence.Models;
using ToDo.Persistence.Repositories;

namespace ToDo.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        public IUsersRepository Users { get; }
        public IRepository<Lists> Lists { get; }
        public IRepository<Tasks> Tasks { get; }
        public void Save();
    }
}
