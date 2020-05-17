using System;
using System.Collections.Generic;
using System.Text;
using ToDo.ServiceLayer.Models;

namespace ToDo.ServiceLayer.Interfaces
{
    public interface ITasksService
    {
        IEnumerable<TaskDomainModel> GetTasksByUserId(int userId);
    }
}
