using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ToDo.Persistence.DBContext;
using ToDo.ServiceLayer.Interfaces;
using ToDo.ServiceLayer.Models;

namespace ToDo.Services.Services
{
    public class TasksService : ITasksService
    {
        private ToDoAppContext _appContext;

        public TasksService(ToDoAppContext appContext)
        {
            _appContext = appContext;
        }

        public IEnumerable<TaskDomainModel> GetTasksByUserId(int userId)
        {
            List<TaskDomainModel> taskDomainModels = new List<TaskDomainModel>();

            var tasks = _appContext.Tasks.Where(t => t.UserId == userId);
            foreach (var task in tasks)
            {
                TaskDomainModel taskDomainModel = new TaskDomainModel()
                {
                    TaskId = task.TaskId,
                    TaskDescription = task.Text,
                    IsTaskComplete = task.IsComplete
                };

                taskDomainModels.Add(taskDomainModel);
            }

            return taskDomainModels;
        }
    }
}
