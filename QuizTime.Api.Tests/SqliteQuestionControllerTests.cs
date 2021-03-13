using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using QuizTime.Api.Controllers;
using QuizTime.Api.Data;
using QuizTime.Api.Models;
using QuizTime.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuizTime.Api.Tests
{
    public class SqliteQuestionControllerTests : QuestionControllerTest
    {
        public SqliteQuestionControllerTests()
            : base(
                new DbContextOptionsBuilder<QuizTimeContext>()
                    .UseSqlite("Filename=Test.db")
                    .Options)
        { }

        [Test]
        public async Task ShouldReturnOk()
        {
            using (var context = new QuizTimeContext(ContextOptions))
            {
                var controller = new QuestionController(context);

                var actionResult = await controller.GetQuestions();

                var result = actionResult.Result as OkObjectResult;
                Assert.AreEqual(typeof(OkObjectResult), result.GetType());
            }
        }

        [Test]
        public async Task ShouldReturnCollection()
        {
            using (var context = new QuizTimeContext(ContextOptions))
            {
                var controller = new QuestionController(context);

                var actionResult = await controller.GetQuestions();

                var result = actionResult.Result as OkObjectResult;
                var resultCollection = result.Value as List<QuestionModel>;
                Assert.NotNull(resultCollection);
                Assert.IsNotEmpty(resultCollection);
                Assert.AreEqual(resultCollection.Count, Constants.NumberOfQuestionsInQuiz);
            }
        }

        [Test]
        public async Task ShouldSkipItems()
        {
            using (var context = new QuizTimeContext(ContextOptions))
            {
                var questionsToSkip = 5;
                var controller = new QuestionController(context);
                var actionResult = await controller.GetQuestions();
                var result = actionResult.Result as OkObjectResult;

                var actionResult2 = await controller.GetQuestions(questionsToSkip);
                var result2 = actionResult2.Result as OkObjectResult;

                var resultCollection = result.Value as List<QuestionModel>;
                var resultCollection2 = result2.Value as List<QuestionModel>;
                for (int i = 0; i < resultCollection.Count; i++)
                {
                    Assert.AreNotEqual(resultCollection[i].Id, resultCollection2[i].Id);
                    Assert.AreNotEqual(resultCollection[i].Content, resultCollection2[i].Content);
                }
            }
        }

        [Test]
        public async Task ShouldReturnEmptyCollectionWhenOutOfQuestions()
        {
            using (var context = new QuizTimeContext(ContextOptions))
            {
                var questionsToSkip = int.MaxValue;
                var controller = new QuestionController(context);

                var actionResult = await controller.GetQuestions(questionsToSkip);
                
                var result = actionResult.Result as OkObjectResult;
                var resultCollection = result.Value as List<QuestionModel>;
                Assert.IsEmpty(resultCollection);
            }
        }
    }
}
