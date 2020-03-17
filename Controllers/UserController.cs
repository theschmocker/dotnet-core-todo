using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using dotnet_todo.Models;

namespace dotnet_todo.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserController(UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        [HttpGet]
        // public object Get() {
        //     return  new {
        //         Value = "test"
        //     };
        // }
        private Task<ApplicationUser> GetUser() {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != null) {
                return _userManager.FindByIdAsync(userId);
            }
            return null;
        }
        public async Task<object> Get() {
            var user = await GetUser();
            
            return new {
                user = user.Id,
            };
        }
    }
}