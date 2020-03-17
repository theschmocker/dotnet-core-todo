using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_todo.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Todo> Todos {get; set;}
    }
}
