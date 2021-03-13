using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using QuizTime.Api.Data;
using System;
using System.Collections.Generic;
using System.Data.Common;

namespace QuizTime.Api.Tests
{
    public class QuestionControllerTest
    {

        protected QuestionControllerTest(DbContextOptions<QuizTimeContext> contextOptions)
        {
            ContextOptions = contextOptions;

            Seed();
        }

        protected DbContextOptions<QuizTimeContext> ContextOptions { get; }

        private void Seed()
        {
            using (var context = new QuizTimeContext(ContextOptions))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                foreach (var question in DummyData())
                {
                    context.Add(question);
                }

                context.SaveChanges();
            }
        }

        public static List<Question> DummyData()
        {
            return new List<Question>
            {
                new Question { Content = "What country produces the most potatoes?", PossibleAnswers = new string[] { "China", "United States", "Ireland", "Russia" }, Answer = "China", Category = "Food" },
                new Question { Content = "What country is the home of the food called \"chutney\"?", PossibleAnswers = new string[] { "India", "China", "Korea", "Japan" }, Answer = "China", Category = "Food" },
                new Question { Content = "Which grade of olive oil is considered the best?", PossibleAnswers = new string[] { "Extra Virgin", "Pomace", "Pure Filtered", "Superfine Virgin" }, Answer = "Extra Virgin", Category = "Food" },
                new Question { Content = "Of the following dishes, which are not typically made with some kind of seafood?", PossibleAnswers = new string[] { "Bouillabaisse", "Osso Buco", "Fritto Misto", "Tempura" }, Answer = "Osso Buco", Category = "Food" },
                new Question { Content = "Of all commercial cooking oils, which of these is highest in polyunsaturates  and lowest in saturated fat?", PossibleAnswers = new string[] { "Coconut Oil", "Corn Oil", "Olive Oil", "Safflower Oil" }, Answer = "Safflower Oil", Category = "Food" },
                new Question { Content = "What character in Monty Python and the Holy Grail insists that \"It's just a flesh wound\"?", PossibleAnswers = new string[] { "King Arthur", "Sir Lancelot", "Roger the Schrubber", "Black Knight" }, Answer = "Black Knight", Category = "Movies" },
                new Question { Content = "What was the first movie by Pixar to receive a rating higher than G in the United States?", PossibleAnswers = new string[] { "The Incredibles", "Monsters Inc", "Toy Story", "Finding Nemo" }, Answer = "The Incredibles", Category = "Movies" },
                new Question { Content = "Who is the only Top Gun actor who didn't vomit while in the fighter jets", PossibleAnswers = new string[] { "Anthony Edwards", "John Stockwell", "Tom Cruise", "Val Kilmer" }, Answer = "Anthony Edwards", Category = "Movies" },
                new Question { Content = "When Jackie Chan's foot catches on fire in The Legend of Drunken Master, how does he put it out?", PossibleAnswers = new string[] { "Uses a fire extinguisher", "Throws dirt on it", "Blows it out", "Kicks at water that is thrown in the air" }, Answer = "Kicks at water that is thrown in the air", Category = "Movies" },
                new Question { Content = "In Alien (1979), the blue laser lights used in the alien ship's egg chamber were borrowed from what band?", PossibleAnswers = new string[] { "Led Zeppelin", "Pink Floyd", "Yes", "The Who" }, Answer = "The Who", Category = "Movies" }
            };
        }
    }
}