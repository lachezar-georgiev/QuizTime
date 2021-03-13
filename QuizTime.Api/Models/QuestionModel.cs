using System;

namespace QuizTime.Api.Models
{
    public class QuestionModel
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string Answer { get; set; }

        public string[] PossibleAnswers { get; set; }

        public string Category { get; set; }
    }
}
