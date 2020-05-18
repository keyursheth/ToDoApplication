using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using ToDo.Domain.Contracts;
using ToDo.Domain.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;
        private readonly IConfiguration _configuration;
        private readonly ITaskRepository _taskRepository;

        public TasksController(ILogger<TasksController> logger, IConfiguration configuration, ITaskRepository taskRepository)
        {
            _logger = logger;
            _configuration = configuration;
            _taskRepository = taskRepository;
        }


        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<ToDoItem> Get()
        {
            List<ToDoItem> taskDomainModels = _taskRepository.GetToDoItemsByUserId(1).ToList();
            return taskDomainModels;
        }

        [HttpPost]
        public void Add(ToDoItem toDoItem)
        {
            _taskRepository.AddToDoItem(toDoItem);
        }
    }
}
