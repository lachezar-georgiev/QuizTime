using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using QuizTime.Api.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizTime.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<QuizTimeContext>(options => options.UseSqlite(Configuration.GetConnectionString("Default")));
            services.AddCors(options =>
            {
                options.AddPolicy("localhost",
                  builder =>
                  {
                      builder.WithOrigins("http://localhost:4200");
                  });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "QuizTime.Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            InitializeDatabase(app);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuizTime.Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("localhost");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<QuizTimeContext>();

                try
                {
                    context.Database.Migrate();
                    serviceScope.ServiceProvider.GetRequiredService<QuizTimeContext>().Database.EnsureCreated();

                    if (!context.Questions.Any())
                    {
                        context.Add(new Question { Content = "Who painted the Mona Lisa?", Answer = "Leonardo Da Vinci", PossibleAnswers = new string[] { "Leonardo Da Vinci", "Raphael", "Michelangelo", "Rembrandt" }, Category = "Art" });
                        context.Add(new Question { Content = "How many paintings did Vincent Van Gogh sell during his lifetime?", PossibleAnswers = new string[] { "1", "27", "193", "843" }, Answer = "1", Category = "Art" });
                        context.Add(new Question { Content = "What element was removed from Leonardo da Vinci's \"The Last Supper\" by careless workers?", PossibleAnswers = new string[] { "Judas' silver coins", "Da Vinci's signature", "Communion cup", "Jesus' feet" }, Answer = "Jesus' feet", Category = "Art" });
                        context.Add(new Question { Content = "Which artist was struck in the face with a mallet by an envious rival, disfiguring him for life?", PossibleAnswers = new string[] { "Titian", "Michelangelo", "Rembrandt", "Raphael" }, Answer = "Michelangelo", Category = "Art" });
                        context.Add(new Question { Content = "What art movement was Yoko Ono associated with during the 1960s?", PossibleAnswers = new string[] { "Post-Impressionism", "Dadaism", "Fluxus", "Futurism" }, Answer = "Fluxus", Category = "Art" });

                        context.Add(new Question { Content = "What animal has the longest lifespan", PossibleAnswers = new string[] { "Locust", "Giant Tortoise", "Elephant", "Blue Whale" }, Answer = "Giant tortoise", Category = "Animals" });
                        context.Add(new Question { Content = "What is the only mammal capable of true flight?", PossibleAnswers = new string[] { "Bat", "Flying Squirrel", "Ocelot", "Hummingbird" }, Answer = "Bat", Category = "Animals" });
                        context.Add(new Question { Content = "What is the fastest flying bird in the world ?", PossibleAnswers = new string[] { "Peregrine Falcon", "Harpy Eagle", "Horned Sungem", "Spine-Tailed Swift" }, Answer = "Peregrine Falcon", Category = "Animals" });
                        context.Add(new Question { Content = "A newborn kangaroo is about the size of a ...?", PossibleAnswers = new string[] { "Plum", "Grapefruit", "Lima Bean", "Watermelon" }, Answer = "Lima Bean", Category = "Animals" });
                        context.Add(new Question { Content = "What is the world's most poisonous spider?", PossibleAnswers = new string[] { "Daddy-Longlegs", "Brown Recluse", "Sydney Funnel Spider", "Brazilian Wandering Spider " }, Answer = "Brazilian Wandering Spider ", Category = "Animals" });

                        context.Add(new Question { Content = "What \"law\" describes the fact that, on average, computers have doubled in capacity every 18 to 24 months since 1900?", PossibleAnswers = new string[] { "Anderson's Law III", "Moore's Law", "Jefferson's Law", "Bohr's Law" }, Answer = "Moore's Law", Category = "ComputerScience" });
                        context.Add(new Question { Content = "How many lines of code did the Windows 98 operating system contain?n", PossibleAnswers = new string[] { "4 million", "9 million", "18 million", "40 million" }, Answer = "18 million", Category = "ComputerScience" });
                        context.Add(new Question { Content = "What year was the word \"computer\" first used to describe a mechanical calculating device?", PossibleAnswers = new string[] { "1897", "1912", "1926", "1942" }, Answer = "1897", Category = "ComputerScience" });
                        context.Add(new Question { Content = "What was the first computer to defeat a world champion chess player?", PossibleAnswers = new string[] { "Chinook", "X3D Fritz", "Deep Blue", "A.L.I.C.E." }, Answer = "Deep Blue", Category = "ComputerScience" });
                        context.Add(new Question { Content = "During the 1970s computer engineers at various research institutions began to utilize telecommunications technologies to link their computers together. This effort, the forefather of the modern Internet, was known as the ...", PossibleAnswers = new string[] { "INSTANET", "APRANET", "ORDONET", "BAYONET" }, Answer = "APRANET", Category = "ComputerScience" });

                        context.Add(new Question { Content = "What country produces the most potatoes?", PossibleAnswers = new string[] { "China", "United States", "Ireland", "Russia" }, Answer = "China", Category = "Food" });
                        context.Add(new Question { Content = "What country is the home of the food called \"chutney\"?", PossibleAnswers = new string[] { "India", "China", "Korea", "Japan" }, Answer = "China", Category = "Food" });
                        context.Add(new Question { Content = "Which grade of olive oil is considered the best?", PossibleAnswers = new string[] { "Extra Virgin", "Pomace", "Pure Filtered", "Superfine Virgin" }, Answer = "Extra Virgin", Category = "Food" });
                        context.Add(new Question { Content = "Of the following dishes, which are not typically made with some kind of seafood?", PossibleAnswers = new string[] { "Bouillabaisse", "Osso Buco", "Fritto Misto", "Tempura" }, Answer = "Osso Buco", Category = "Food" });
                        context.Add(new Question { Content = "Of all commercial cooking oils, which of these is highest in polyunsaturates  and lowest in saturated fat?", PossibleAnswers = new string[] { "Coconut Oil", "Corn Oil", "Olive Oil", "Safflower Oil" }, Answer = "Safflower Oil", Category = "Food" });

                        context.Add(new Question { Content = "What character in Monty Python and the Holy Grail insists that \"It's just a flesh wound\"?", PossibleAnswers = new string[] { "King Arthur", "Sir Lancelot", "Roger the Schrubber", "Black Knight" }, Answer = "Black Knight", Category = "Movies" });
                        context.Add(new Question { Content = "What was the first movie by Pixar to receive a rating higher than G in the United States?", PossibleAnswers = new string[] { "The Incredibles", "Monsters Inc", "Toy Story", "Finding Nemo" }, Answer = "The Incredibles", Category = "Movies" });
                        context.Add(new Question { Content = "Who is the only Top Gun actor who didn't vomit while in the fighter jets", PossibleAnswers = new string[] { "Anthony Edwards", "John Stockwell", "Tom Cruise", "Val Kilmer" }, Answer = "Anthony Edwards", Category = "Movies" });
                        context.Add(new Question { Content = "When Jackie Chan's foot catches on fire in The Legend of Drunken Master, how does he put it out?", PossibleAnswers = new string[] { "Uses a fire extinguisher", "Throws dirt on it", "Blows it out", "Kicks at water that is thrown in the air" }, Answer = "Kicks at water that is thrown in the air", Category = "Movies" });
                        context.Add(new Question { Content = "In Alien (1979), the blue laser lights used in the alien ship's egg chamber were borrowed from what band?", PossibleAnswers = new string[] { "Led Zeppelin", "Pink Floyd", "Yes", "The Who" }, Answer = "The Who", Category = "Movies" });

                        context.Add(new Question { Content = "What is Earth's largest continent?", PossibleAnswers = new string[] { "Asia", "Europe", "Antarctica", "Africa" }, Answer = "Asia", Category = "Geography" });
                        context.Add(new Question { Content = "In what country can you visit Machu Picchu?", PossibleAnswers = new string[] { "Columbia", "Chile", "Bolivia", "Peru" }, Answer = "Peru", Category = "Geography" });
                        context.Add(new Question { Content = "What is the only sea without any coasts?", PossibleAnswers = new string[] { "Adriatic Sea", "Sargasso Sea", "Mediterranean Sea", "Celebes Sea" }, Answer = "Celebes Sea", Category = "Geography" });
                        context.Add(new Question { Content = "What country has the most natural lakes?", PossibleAnswers = new string[] { "Australia", "India", "United States", "Canada" }, Answer = "Canada", Category = "Geography" });
                        context.Add(new Question { Content = "What razor-thin country accounts for more than half of the western coastline of South America?", PossibleAnswers = new string[] { "Bolivia", "Ecuador", "Chile", "Peru" }, Answer = "Chile", Category = "Geography" });

                        context.Add(new Question { Content = "Who was the first democratically elected President of Russia?", PossibleAnswers = new string[] { "Vladimir Putin", "Nikita Krushchev", "Boris Yeltsin", "Mikhail Gorbachev" }, Answer = "Boris Yelsin", Category = "History" });
                        context.Add(new Question { Content = "Which of the following inventions was the first to be patented?", PossibleAnswers = new string[] { "Cash Register", "Chewing Gum", "Dishwasher", "Rubber Band" }, Answer = "Rubber Band", Category = "History" });
                        context.Add(new Question { Content = "What was the first city to reach a population of one million?", PossibleAnswers = new string[] { "Beijing", "Rome", "London", "New York" }, Answer = "Rome", Category = "History" });
                        context.Add(new Question { Content = "How long did the Hundred Years' War last?", PossibleAnswers = new string[] { "99 years", "88 years", "116 years", "100 years" }, Answer = "100 years", Category = "History" });
                        context.Add(new Question { Content = "What famous general was once attacked by rabbits?", PossibleAnswers = new string[] { "Julius Caesar", "Alexander the Great", "Genghis Khan", "Napoleon Bonaparte" }, Answer = "Napoleon Bonaparte", Category = "History" });

                        context.Add(new Question { Content = "What country won the first World Cup?", PossibleAnswers = new string[] { "Argentina", "Switzerland", "Uruguay", "Brazil" }, Answer = "Uruguay", Category = "Sports" });
                        context.Add(new Question { Content = "What year did China win its first Olympic medal?", PossibleAnswers = new string[] { "1968", "1952", "1936", "1984" }, Answer = "1984", Category = "Sports" });
                        context.Add(new Question { Content = "Who is the most decorated Olympian of all time?", PossibleAnswers = new string[] { "Michael Phelps", "Paavo Nurmi", "Mary Lou Retton", "Carl Lewis" }, Answer = "Michael Phelps", Category = "Sports" });
                        context.Add(new Question { Content = "What is the record for red cards given in a single football game?", PossibleAnswers = new string[] { "6", "12", "24", "36" }, Answer = "36", Category = "Sports" });
                        context.Add(new Question { Content = "Which tennis player won 470 consecutive matches?", PossibleAnswers = new string[] { "Billie Jean King", "Chris Evert", "Eshter Vergeer", "Don Budge" }, Answer = "Esther Vergeer", Category = "Sports" });

                        context.Add(new Question { Content = "How long had Pamela Anderson known Motley Crue drummer Tommy Lee before marrying him?", PossibleAnswers = new string[] { "4 years", "4 days", "4 months", "4 weeks" }, Answer = "4 days", Category = "PopCulture" });
                        context.Add(new Question { Content = "Which celebrity is a former firefighter?", PossibleAnswers = new string[] { "Sean Penn", "Steve Buscemi", "Tommy Lee Jones", "Dwayne Johnson" }, Answer = "Steve Buscemi", Category = "PopCulture" });
                        context.Add(new Question { Content = "Before his big Hollywood break, Harrison Ford worked as a _________.", PossibleAnswers = new string[] { "Body Painter", "Feng Shui Consultant", "Roadie for the band The Doors", "Fragrance Chemist" }, Answer = "Roadie for the band The Doors", Category = "PopCulture" });
                        context.Add(new Question { Content = "What name was celebrity talk show host Oprah Winfrey born with?", PossibleAnswers = new string[] { "Orpah", "Ohpar", "Orhap", "Pahro" }, Answer = "Orpah", Category = "PopCulture" });
                        context.Add(new Question { Content = "What famous actor lost 45 lbs. to play Andrew Beckett, an AIDS victim fighting wrongful termination?", PossibleAnswers = new string[] { "Tom Hanks", "William Hurt", "Robin Williams", "Kevin Spacey" }, Answer = "Tom Hanks", Category = "PopCulture" });

                        context.Add(new Question { Content = "What instrument is used to measure wind speed?", PossibleAnswers = new string[] { "Anemometer", "Barometer", "Altimeter", "Fanometer" }, Answer = "Anemometer", Category = "Technology" });
                        context.Add(new Question { Content = "Who invented the first battery?", PossibleAnswers = new string[] { "Benjamin Franklin", "Luigi Galvani", "Alessandro Volta", "Nikola Tesla" }, Answer = "Alessandro Volta", Category = "Technology" });
                        context.Add(new Question { Content = "When was the steam turbine invented?", PossibleAnswers = new string[] { "1st Century AD", "2nd Century BC", "1810", "1712" }, Answer = "1st century AD", Category = "Technology" });
                        context.Add(new Question { Content = "How many patents did Thomas Edison accumulate during his lifetime?", PossibleAnswers = new string[] { "0", "85", "1093", "2332" }, Answer = "2332", Category = "Technology" });
                        context.Add(new Question { Content = "Who invented the telescope?", PossibleAnswers = new string[] { "Isaac Newton", "Johannes Kepler", "Galileo Galilei", "Hans Lippershey" }, Answer = "Hans Lippershey", Category = "Technology" });
                    }

                    context.SaveChanges();

                }
                catch (SqliteException ex)
                {
                    var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred creating the DB.");
                }
            }

        }
    }
}
