using System;

namespace QuizTime.Common.Models
{
    public class Quiz
    {
        private readonly int[] _questions;

        public Quiz()
        {
            _questions = new int[Constants.NumberOfQuestionsInQuiz];
        }

        public int[] Questions => _questions;
    }
}
