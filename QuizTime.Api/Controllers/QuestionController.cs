using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizTime.Api.Data;
using QuizTime.Api.Models;
using QuizTime.Common;

namespace QuizTime.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizTimeContext _context;

        public QuestionController(QuizTimeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionModel>>> GetQuestions([FromQuery]int skip = 0)
        {
            var random = new Random();
            var response = await _context.Questions
                .Select(q => new QuestionModel { Id = q.Id, Answer = q.Answer, Category = q.Category, Content = q.Content, PossibleAnswers = q.PossibleAnswers.Shuffle(random) })
                .OrderBy(q => q.Id)
                .Skip(skip)
                .Take(Constants.NumberOfQuestionsInQuiz)
                .ToListAsync();

            return Ok(response);
        }
    }
}
