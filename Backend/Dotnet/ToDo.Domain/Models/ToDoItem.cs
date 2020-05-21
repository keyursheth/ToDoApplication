using System;
using System.Runtime.CompilerServices;

namespace ToDo.Domain.Models
{
    public sealed class ToDoItem
    {
        private ToDoItem(int listId, DateTime? reminderDateTime, DateTime? dueDate, string taskDescription, int userid,
            bool isComplete = false, string listName = "", int taskid = 0, bool isDelete = false)
        {
            ListId = listId;
            ReminderDateTime = reminderDateTime;
            DueDate = dueDate;
            TaskDescription = taskDescription;
            IsTaskComplete = isComplete;
            ListName = listName;
            TaskId = taskid;
            UserId = userid;
            IsDelete = false;
        }

        public int TaskId { get; private set; }
        public int ListId { get; private set; }
        public DateTime? ReminderDateTime { get; private set; }
        public DateTime? DueDate { get; private set; }
        public string TaskDescription { get; private set; }
        public bool IsTaskComplete { get; private set; }
        public string ListName { get; private set; }
        public int UserId { get; set; }
        public bool IsDelete { get; set; }

        public static ToDoItem CreateTodoItem(int listId, DateTime? reminderDateTime, DateTime? dueDate, string taskDescription, 
            int userid, bool isComplete = false, string listName = "", int taskid = 0, bool isDelete = false)
        {
            ToDoItem toDoItem = new ToDoItem(listId, reminderDateTime, dueDate, taskDescription, userid, isComplete, listName, taskid, isDelete);
            return toDoItem;
        }
    }
}
