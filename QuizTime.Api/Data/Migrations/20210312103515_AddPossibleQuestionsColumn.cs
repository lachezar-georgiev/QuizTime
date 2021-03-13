using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizTime.Api.Data.Migrations
{
    public partial class AddPossibleQuestionsColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PossibleAnswers",
                table: "Questions",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PossibleAnswers",
                table: "Questions");
        }
    }
}
