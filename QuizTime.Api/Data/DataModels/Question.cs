using System;

namespace QuizTime.Api.Data
{
    public class Question
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string Answer { get; set; }

        public string[] PossibleAnswers { get; set; }

        public string Category { get; set; }

    }
}
