using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using dotnet_todo.Models;
using dotnet_todo.Data;
using System.Security.Claims;

namespace dotnet_todo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TodoController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _context;
        public TodoController(UserManager<ApplicationUser> userManager, ApplicationDbContext context) {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<TodoJson>> Get() {
            var user = await GetUser();
            return user.Todos.Select(t => new TodoJson(t));
        }

        [HttpPost]
        public async Task<TodoJson> Post(Todo todo) {
            var user = await GetUser();

            user.Todos.Add(todo);
            _context.SaveChanges();

            return new TodoJson(todo);
        }

        [HttpPut]
        public async Task<TodoJson> Update(Todo todo) {
            var user = await GetUser();

            var todoToUpdate = user.Todos.FirstOrDefault(t => t.ID == todo.ID);

            if (todoToUpdate == null) {
                return new TodoJson(todo);
            }

            todoToUpdate.Text = todo.Text;
            todoToUpdate.Done = todo.Done;
            todoToUpdate.Color = todo.Color;
            _context.SaveChanges();

            return new TodoJson(todoToUpdate);
        }

        [HttpDelete]
        public async Task<int> Delete(Todo todo) {
            var user = await GetUser();

            var todoToDelete = user.Todos.FirstOrDefault(t => t.ID == todo.ID);

            if (todoToDelete == null) return - 1;

            var wasRemoved = user.Todos.Remove(todoToDelete);

            if (wasRemoved) {
                _context.SaveChanges();
                return todo.ID;
            }
             
            return -1;
        }

        private async Task<ApplicationUser> GetUser() {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value?.Trim();
            return await _context.Users.Include(u => u.Todos).FirstOrDefaultAsync(user => user.Id == id);
            //return await _userManager.FindByIdAsync(id);
        }
    }
}