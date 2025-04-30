using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models;

public partial class QuanLyHocTapContext : DbContext
{
    public QuanLyHocTapContext()
    {
    }

    public QuanLyHocTapContext(DbContextOptions<QuanLyHocTapContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<AssignmentsCompleted> AssignmentsCompleteds { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Enrollment> Enrollments { get; set; }

    public virtual DbSet<Prediction> Predictions { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<TestFile> TestFiles { get; set; }

    public virtual DbSet<TestScore> TestScores { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-8HLF4UKP\\SQLEXPRESS;Database=QUAN_LY_HOC_TAP;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PK__Assignme__32499E57352B6E7C");

            entity.Property(e => e.AssignmentId).HasColumnName("AssignmentID");
            entity.Property(e => e.AssignmentName).HasMaxLength(100);
            entity.Property(e => e.CourseId).HasColumnName("CourseID");

            entity.HasOne(d => d.Course).WithMany(p => p.Assignments)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Assignmen__Cours__02FC7413");
        });

        modelBuilder.Entity<AssignmentsCompleted>(entity =>
        {
            entity.HasKey(e => e.CompletionId).HasName("PK__Assignme__77FA70AFEDB4BCD0");

            entity.ToTable("AssignmentsCompleted");

            entity.Property(e => e.CompletionId).HasColumnName("CompletionID");
            entity.Property(e => e.AssignmentId).HasColumnName("AssignmentID");
            entity.Property(e => e.Grade).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Assignment).WithMany(p => p.AssignmentsCompleteds)
                .HasForeignKey(d => d.AssignmentId)
                .HasConstraintName("FK__Assignmen__Assig__09A971A2");

            entity.HasOne(d => d.User).WithMany(p => p.AssignmentsCompleteds)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Assignmen__UserI__08B54D69");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Courses__C92D71875B167585");

            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.CourseName).HasMaxLength(100);
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("_Description");
            entity.Property(e => e.Img)
                .HasMaxLength(255)
                .HasColumnName("img");
            entity.Property(e => e.InstructorId).HasColumnName("InstructorID");

            entity.HasOne(d => d.Instructor).WithMany(p => p.Courses)
                .HasForeignKey(d => d.InstructorId)
                .HasConstraintName("FK__Courses__Instruc__00200768");
        });

        modelBuilder.Entity<Enrollment>(entity =>
        {
            entity.HasKey(e => e.EnrollmentId).HasName("PK__Enrollme__7F6877FB6C7EB54B");

            entity.Property(e => e.EnrollmentId).HasColumnName("EnrollmentID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Course).WithMany(p => p.Enrollments)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Enrollmen__Cours__17036CC0");

            entity.HasOne(d => d.User).WithMany(p => p.Enrollments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Enrollmen__UserI__160F4887");
        });

        modelBuilder.Entity<Prediction>(entity =>
        {
            entity.HasKey(e => e.PredictionId).HasName("PK__Predicti__BAE4C140A89FD662");

            entity.Property(e => e.PredictionId).HasColumnName("PredictionID");
            entity.Property(e => e.PredictedScore).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.StudyTime).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.TestScores).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Predictions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Predictio__UserI__10566F31");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.TestId).HasName("PK__Tests__8CC33100EA0E7A15");

            entity.Property(e => e.TestId).HasColumnName("TestID");
            entity.Property(e => e.CourseId).HasColumnName("CourseID");
            entity.Property(e => e.TestContent).HasMaxLength(255);
            entity.Property(e => e.TestName).HasMaxLength(100);

            entity.HasOne(d => d.Course).WithMany(p => p.Tests)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Tests__CourseID__05D8E0BE");
        });

        modelBuilder.Entity<TestFile>(entity =>
        {
            entity.HasKey(e => e.FileId).HasName("PK__TestFile__6F0F989F194C1A26");

            entity.Property(e => e.FileId).HasColumnName("FileID");
            entity.Property(e => e.FileName).HasMaxLength(255);
            entity.Property(e => e.FilePath).HasMaxLength(500);
            entity.Property(e => e.FileType).HasMaxLength(50);
            entity.Property(e => e.TestId).HasColumnName("TestID");
            entity.Property(e => e.UploadDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Test).WithMany(p => p.TestFiles)
                .HasForeignKey(d => d.TestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TestFiles__TestI__2A164134");
        });

        modelBuilder.Entity<TestScore>(entity =>
        {
            entity.HasKey(e => e.ScoreId).HasName("PK__TestScor__7DD229F10EDFB922");

            entity.Property(e => e.ScoreId).HasColumnName("ScoreID");
            entity.Property(e => e.Score).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.TestId).HasColumnName("TestID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Test).WithMany(p => p.TestScores)
                .HasForeignKey(d => d.TestId)
                .HasConstraintName("FK__TestScore__TestI__0D7A0286");

            entity.HasOne(d => d.User).WithMany(p => p.TestScores)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__TestScore__UserI__0C85DE4D");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC94D43AA3");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.RefreshTokenExpiryTime).HasColumnType("datetime");
            entity.Property(e => e.ResetPasswordExpiry).HasColumnType("datetime");
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasColumnName("_Role");
            entity.Property(e => e.Username).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
