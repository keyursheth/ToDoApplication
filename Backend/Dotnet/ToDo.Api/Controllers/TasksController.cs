using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Api.DTOs;
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
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK)]
        [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
        [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get()
        {
            int userId = 1;
            List<TaskDTO> taskDTOs = new List<TaskDTO>();

            if (userId == 0)
                return BadRequest();

            try
            {
                IEnumerable<ToDoItem> toDoItems = await _taskRepository.GetToDoItemsByUserId(userId);

                if (toDoItems == null || (toDoItems != null && toDoItems.Count() == 0))
                    return StatusCode(StatusCodes.Status204NoContent);

                foreach (var todo in toDoItems)
                {
                    taskDTOs.Add(new TaskDTO()
                    {
                        dueDate = todo.DueDate,
                        isComplete = todo.IsTaskComplete,
                        listId = todo.ListId,
                        listName = todo.ListName,
                        reminderDateTime = todo.ReminderDateTime,
                        taskDescription = todo.TaskDescription,
                        taskId = todo.TaskId
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
            return Ok(taskDTOs);
        }

        [HttpPost]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status201Created)]
        [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Add([FromBody]TaskDTO taskDTO)
        {
            int taskId = 0;

            if (taskDTO.listId == 0 || string.IsNullOrEmpty(taskDTO.taskDescription))
                return BadRequest();

            try
            {
                ToDoItem toDoItem = ToDoItem.CreateTodoItem(taskDTO.listId, taskDTO.reminderDateTime, taskDTO.dueDate, taskDTO.taskDescription);
                taskId = await _taskRepository.AddToDoItem(toDoItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return CreatedAtAction("Add", taskId);
        }
    }
}
