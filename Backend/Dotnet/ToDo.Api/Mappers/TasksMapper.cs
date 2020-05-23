using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using ToDo.Api.Entities;
using ToDo.Api.Models;

namespace ToDo.Api.Mappers
{
    public class TasksMapper
    {
        public static TaskModel GetTaskModelFromTaskEntity(Tasks tasks)
        {
            TaskModel taskModel = new TaskModel();

            taskModel.taskId = tasks.TaskId;
            taskModel.taskDescription = tasks.Text;
            taskModel.listId = tasks.ListId;
            taskModel.listName = tasks.List == null ? string.Empty : tasks.List.ListName;
            taskModel.userId = tasks.UserId;
            taskModel.isComplete = tasks.IsComplete;
            taskModel.reminderDatetime = tasks.ReminderDate.ToString();

            return taskModel;
        }

        public static Tasks GetTasksFromTaskModel(TaskModel taskModel)
        {
            Tasks tasks = new Tasks();

            tasks.ListId = taskModel.listId;
            tasks.UserId = taskModel.userId;
            tasks.Text = taskModel.taskDescription;
            tasks.IsComplete = false;
            tasks.IsDelete = false;

            tasks.ReminderDate = null;

            if (string.IsNullOrEmpty(taskModel.reminderDatetime) == false)
                tasks.ReminderDate = Convert.ToDateTime(taskModel.reminderDatetime);

            tasks.CreatedDate = DateTime.Now;
            tasks.ModifiedDate = DateTime.Now;

            return tasks;
        }
    }
}
