using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Api.DTOs;
using ToDo.Api.Mappers;
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
        private readonly ITaskRepository _taskRepository;

        const int USERID = 1;

        public TasksController(ILogger<TasksController> logger, ITaskRepository taskRepository)
        {
            _logger = logger;
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
            int userId = USERID;
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
                    taskDTOs.Add(TasksDTOMapper.GetTaskDTO(todo));
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
                taskDTO.userId = USERID;
                ToDoItem toDoItem = TasksDTOMapper.GetToDoItem(taskDTO);
                taskId = await _taskRepository.AddToDoItem(toDoItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return CreatedAtAction("Add", taskId);
        }

        [HttpPut]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status201Created)]
        [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
        public IActionResult Update([FromBody]TaskDTO taskDTO)
        {
            try
            {
                if (taskDTO == null || taskDTO.taskId == 0)
                    return BadRequest();

                taskDTO.userId = USERID;
                ToDoItem toDoItem = TasksDTOMapper.GetToDoItem(taskDTO);

                _taskRepository.UpdateTask(toDoItem);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
