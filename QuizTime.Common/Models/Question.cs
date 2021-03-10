using QuizTime.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizTime.Common.Models
{
    public class Question
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string Answer { get; set; }

        public string Category { get; set; }
    }
}
