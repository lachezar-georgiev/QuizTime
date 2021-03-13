using Microsoft.EntityFrameworkCore;
using System;

namespace QuizTime.Api.Data
{
    public class QuizTimeContext : DbContext
    {
        public DbSet<Question> Questions { get; set; }

        public QuizTimeContext(DbContextOptions<QuizTimeContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>()
                .HasKey(q => q.Id)
                .HasName("PrimaryKey_Id");

            modelBuilder.Entity<Question>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Question>()
                .Property(q => q.Content)
                .IsRequired();

            modelBuilder.Entity<Question>()
                .Property(q => q.Answer)
                .IsRequired();

            modelBuilder.Entity<Question>()
                .Property(q => q.PossibleAnswers)
                .HasConversion(
                    p => string.Join(',', p),
                    p => p.Split(',', StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<Question>()
                .Property(q => q.Category)
                .IsRequired();
        }
    }
}
