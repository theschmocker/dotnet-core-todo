using System.ComponentModel.Design;
using System.Transactions;
using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Principal;
using Microsoft.EntityFrameworkCore;
using dotnet_todo.Models;
using dotnet_todo.Data;
using System.Security.Claims;
using IdentityModel;

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
        // public object Get() {
        //     return  new {
        //         Value = "test"
        //     };
        // }
        [HttpGet]
        public async Task<object> Get() {
            var user = await GetUser();
            return user.Todos.Select(t => new {
                text = t.Text,
                done = t.Done,
                id = t.ID,
            });
        }

        [HttpPost]
        public async Task<object> Post(Todo todo) {
            var user = await GetUser();

            user.Todos.Add(todo);
            _context.SaveChanges();

            return new {
                text = todo.Text,
                done = todo.Done,
                id = todo.ID
            };
        }

        [HttpPut]
        public async Task<object> Update(Todo todo) {
            var user = await GetUser();

            var todoToUpdate = user.Todos.FirstOrDefault(t => t.ID == todo.ID);

            if (todoToUpdate == null) {
                return todo;
            }

            todoToUpdate.Text = todo.Text;
            todoToUpdate.Done = todo.Done;
            _context.SaveChanges();

            return new {
                text = todoToUpdate.Text,
                done = todoToUpdate.Done,
                id = todoToUpdate.ID
            };
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