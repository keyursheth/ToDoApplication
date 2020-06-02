using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDo.Api.DBContext;
using ToDo.Api.Entities;
using ToDo.Api.Mappers;
using ToDo.Api.Models;

namespace ToDo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ToDoAppContext _context;
        private const int USERID = 1;

        public TasksController(ToDoAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByUser()
        {
            try
            {
                List<TaskModel> tasksModels = new List<TaskModel>();

                List<Tasks> tasks = await _context.Tasks
                    .Include(i => i.List)
                    .Where(t => t.UserId == USERID && t.IsDelete == false)
                    .ToListAsync();

                if (tasks == null)
                    return BadRequest();

                foreach (var task in tasks)
                    tasksModels.Add(TasksMapper.GetTaskModelFromTaskEntity(task));

                return Ok(tasksModels);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTaskById(int id)
        {
            try
            {
                if (id == 0)
                    return BadRequest();

                Tasks tasks = await _context.Tasks.FindAsync(id);

                if (tasks == null)
                    return NotFound();

                TaskModel taskModel = TasksMapper.GetTaskModelFromTaskEntity(tasks);

                return Ok(taskModel);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody]TaskModel taskModel)
        {
            Tasks tasks = await _context.Tasks.FindAsync(id);

            if (tasks == null)
            {
                return BadRequest();
            }

            tasks.Text = taskModel.taskDescription;
            tasks.IsComplete = taskModel.isComplete;
            tasks.ReminderDate = null;

            if (string.IsNullOrEmpty(taskModel.reminderDatetime) == false)
                tasks.ReminderDate = Convert.ToDateTime(taskModel.reminderDatetime);

            tasks.ModifiedDate = DateTime.Now;

            _context.Entry(tasks).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> AddTask([FromBody]TaskModel taskModel)
        {
            try
            {
                if (string.IsNullOrEmpty(taskModel.taskDescription))
                    return BadRequest();

                Tasks tasks = TasksMapper.GetTasksFromTaskModel(taskModel);

                tasks.UserId = USERID;

                _context.Tasks.Add(tasks);
                
                await _context.SaveChangesAsync();

                var newTask = await _context.Tasks.FindAsync(tasks.TaskId);
                
                var newtaskModel = TasksMapper.GetTaskModelFromTaskEntity(newTask);

                return CreatedAtAction("GetTasksByUser", newtaskModel);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            try
            {
                var tasks = await _context.Tasks.FindAsync(id);
                if (tasks == null)
                {
                    return NotFound();
                }

                _context.Tasks.Remove(tasks);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, ex.Message);
                return BadRequest();
            }
        }

        private bool TasksExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }
    }
}
