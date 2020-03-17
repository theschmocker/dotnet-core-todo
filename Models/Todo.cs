using Newtonsoft.Json;
namespace dotnet_todo.Models {
    public class Todo {
        public ApplicationUser User { get; set; }
        public int ID { get; set; }
        public string Text { get; set; }
        public bool Done { get; set; }
    }
}