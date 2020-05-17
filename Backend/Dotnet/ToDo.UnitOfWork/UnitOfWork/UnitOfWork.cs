using System;
using System.Collections.Generic;
using System.Text;
using ToDo.Persistence.DBContext;
using ToDo.Persistence.Repositories;
using ToDo.UnitOfWork.Models;

namespace ToDo.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private ToDoAppContext _appContext = new ToDoAppContext();
        private IRepository<Users> _usersRepository = null;
        private IRepository<Lists> _listsRepository = null;
        private IRepository<Tasks> _tasksRepository = null;

        public IRepository<Users> usersRepository 
        { 
            get 
            {
                if (_usersRepository == null)
                    _usersRepository = new Repository<Users>(_appContext);

                return _usersRepository;
            } 
        }

        public IRepository<Lists> listsRepository 
        {
            get 
            {
                if (_listsRepository == null)
                    _listsRepository = new Repository<Lists>(_appContext);

                return _listsRepository;
            }
        }

        public IRepository<Tasks> tasksRepository
        {
            get
            {
                if (_tasksRepository == null)
                    _tasksRepository = new Repository<Tasks>(_appContext);

                return _tasksRepository;
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
