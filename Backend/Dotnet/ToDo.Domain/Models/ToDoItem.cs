namespace ToDo.Domain.Models
{
    public class ToDoItem
    {
        public int TaskId { get; set; }
        public string TaskDescription { get; set; }
        public bool IsTaskComplete { get; set; }
    }
}
