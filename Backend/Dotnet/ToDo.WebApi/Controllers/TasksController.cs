using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using ToDo.ServiceLayer.Interfaces;
using ToDo.ServiceLayer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;
        private readonly IConfiguration _configuration;
        private readonly ITasksService _taskService;

        public TasksController(ILogger<TasksController> logger, IConfiguration configuration, ITasksService tasksService)
        {
            _logger = logger;
            _configuration = configuration;
            _taskService = tasksService;
        }


        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<TaskDomainModel> Get()
        {
            List<TaskDomainModel> taskDomainModels = _taskService.GetTasksByUserId(1).ToList();
            return taskDomainModels;
        }
    }
}
