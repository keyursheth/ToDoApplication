using System;
using ToDo.Persistence.DBContext;
using ToDo.Persistence.Models;
using ToDo.Persistence.Repositories;

namespace ToDo.Persistence.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private ToDoAppContext _appContext = new ToDoAppContext();
        private IUsersRepository _Users = null;
        private IRepository<Lists> _Lists = null;
        private IRepository<Tasks> _Tasks = null;

        public IUsersRepository Users 
        { 
            get 
            {
                if (_Users == null)
                    _Users = new UsersRepository(_appContext);

                return _Users;
            } 
        }

        public IRepository<Lists> Lists 
        {
            get 
            {
                if (_Lists == null)
                    _Lists = new Repository<Lists>(_appContext);

                return _Lists;
            }
        }

        public IRepository<Tasks> Tasks
        {
            get
            {
                if (_Tasks == null)
                    _Tasks = new Repository<Tasks>(_appContext);

                return _Tasks;
            }
        }

        public void Save()
        {
            _appContext.SaveChanges();
        }

        public void Dispose()
        {
            _appContext.Dispose();
        }

    }
}
