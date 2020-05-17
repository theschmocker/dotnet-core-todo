namespace dotnet_todo.Models {
    public class TodoJson {
        public TodoJson(Todo todo) {
            ID = todo.ID;
            Text = todo.Text;
            Done = todo.Done;
            Color = todo.Color;
        }

        public int ID { get; set; }
        public string Text { get; set; }
        public bool Done { get; set; }
        public TodoColor Color { get; set; }
    }
}