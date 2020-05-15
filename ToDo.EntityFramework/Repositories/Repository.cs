using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using ToDo.Persistence.DBContext;

namespace ToDo.Persistence.Repositories
{
    class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private ToDoAppContext _appContext = null;
        private DbSet<TEntity> entity = null;

        public Repository(ToDoAppContext appContext)
        {
            _appContext = appContext;
            entity = _appContext.Set<TEntity>();
        }

        public void Add(TEntity obj)
        {
            entity.Add(obj);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return entity.ToList();
        }

        public TEntity GetById(int id)
        {
            return entity.Find(id);
        }

        public void Remove(int id)
        {
            var result = entity.Find(id);
            if (result != null)
                entity.Remove(result);
        }
    }
}
