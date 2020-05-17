using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnet_todo.Data.Migrations
{
    public partial class TodoColor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "Todos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Todos");
        }
    }
}
