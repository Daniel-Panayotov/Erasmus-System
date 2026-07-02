using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API;

public partial class UEMSContext : DbContext
{
    public UEMSContext() { }

    public UEMSContext(DbContextOptions<UEMSContext> options) : base(options) { }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<ApplicationDocument> ApplicationDocuments { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Discipline> Disciplines { get; set; }

    public virtual DbSet<Faculty> Faculties { get; set; }

    public virtual DbSet<HashedToken> HashedTokens { get; set; }

    public virtual DbSet<Institution> Institutions { get; set; }

    public virtual DbSet<LanguageCompetency> LanguageCompetencies { get; set; }

    public virtual DbSet<RelDisciplineSubject> RelDisciplineSubjects { get; set; }

    public virtual DbSet<RelInstitutionApplication> RelInstitutionApplications { get; set; }

    public virtual DbSet<RelInstitutionApplicationSubject> RelInstitutionApplicationSubjects { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WorkExperience> WorkExperiences { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Application>(entity =>
        {
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Degree).HasMaxLength(50);
            entity.Property(e => e.MobilityType).HasMaxLength(50);
            entity.Property(e => e.MotivationText).HasMaxLength(500);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.Ignore(e => e.DegreeEnum);
            entity.Ignore(e => e.MobilityTypeEnum);

            entity.HasOne(d => d.ReceivingInstitutionNavigation).WithMany(p => p.ApplicationReceivingInstitutionNavigations)
                .HasForeignKey(d => d.ReceivingInstitution)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_ReceivingInstitution");

            entity.HasOne(d => d.SendingInstitutionNavigation).WithMany(p => p.ApplicationSendingInstitutionNavigations)
                .HasForeignKey(d => d.SendingInstitution)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_SendingInstitution");

            entity.HasOne(d => d.Student).WithMany(p => p.Applications)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Students");
        });

        modelBuilder.Entity<ApplicationDocument>(entity =>
        {
            entity.HasIndex(e => e.ApplicationId, "UQ_ApplicationDocuments_ApplicationID").IsUnique();

            entity.Property(e => e.ApplicationDocumentId).HasColumnName("ApplicationDocumentID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.Ignore(e => e.StatusEnum);

            entity.HasOne(d => d.ApplicationNavigation).WithOne(p => p.ApplicationDocument)
                .HasForeignKey<ApplicationDocument>(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationDocuments_Applications");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(50);

            entity.HasOne(d => d.Institution).WithMany(p => p.Contacts)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_Contacts_Institutions");
        });

        modelBuilder.Entity<Discipline>(entity =>
        {
            entity.Property(e => e.DisciplineId).HasColumnName("DisciplineID");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.Name).HasMaxLength(200);

            entity.HasOne(d => d.Faculty).WithMany(p => p.Disciplines)
                .HasForeignKey(d => d.FacultyId)
                .HasConstraintName("FK_Disciplines_Faculties");
        });

        modelBuilder.Entity<Faculty>(entity =>
        {
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.Name).HasMaxLength(200);

            entity.HasOne(d => d.Institution).WithMany(p => p.Faculties)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_Faculties_Institutions");
        });

        modelBuilder.Entity<HashedToken>(entity =>
        {
            entity.Property(e => e.HashedTokenId).HasColumnName("HashedTokenID");
            entity.Property(e => e.TokenType).HasMaxLength(20);
            entity.Property(e => e.ExpiresAt).HasColumnType("datetime");
            entity.Property(e => e.Token).HasMaxLength(255);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.Ignore(e => e.TokenTypeEnum);

            entity.HasOne(d => d.User).WithMany(p => p.HashedTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HashedTokens_Users");
        });

        modelBuilder.Entity<Institution>(entity =>
        {
            entity.HasIndex(e => e.Code, "UQ_Institutions_Code").IsUnique();

            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(200);
        });

        modelBuilder.Entity<LanguageCompetency>(entity =>
        {
            entity.Property(e => e.LanguageCompetencyId).HasColumnName("LanguageCompetencyID");
            entity.Property(e => e.Language).HasMaxLength(100);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.HasOne(d => d.Student).WithMany(p => p.LanguageCompetencies)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LanguageCompetencies_Students");
        });

        modelBuilder.Entity<RelDisciplineSubject>(entity =>
        {
            entity.HasKey(e => e.DisciplineSubjectsId);

            entity.ToTable("relDisciplineSubjects");

            entity.Property(e => e.DisciplineSubjectsId).HasColumnName("DisciplineSubjectsID");
            entity.Property(e => e.DisciplineId).HasColumnName("DisciplineID");
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.Discipline).WithMany(p => p.RelDisciplineSubjects)
                .HasForeignKey(d => d.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relDiscSubj_Disciplines");

            entity.HasOne(d => d.Subject).WithMany(p => p.RelDisciplineSubjects)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relDiscSubj_Subjects");
        });

        modelBuilder.Entity<RelInstitutionApplication>(entity =>
        {
            entity.HasKey(e => e.InstitutionApplicationId);

            entity.ToTable("relInstitutionApplications");

            entity.Property(e => e.InstitutionApplicationId).HasColumnName("InstitutionApplicationID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.DisciplineId).HasColumnName("DisciplineID");

            entity.HasOne(d => d.Application).WithMany(p => p.RelInstitutionApplications)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relInstApp_Applications");

            entity.HasOne(d => d.Contact).WithMany(p => p.RelInstitutionApplications)
                .HasForeignKey(d => d.ContactId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relInstApp_Contacts");

            entity.HasOne(d => d.Discipline).WithMany(p => p.RelInstitutionApplications)
                .HasForeignKey(d => d.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relInstApp_Disciplines");
        });

        modelBuilder.Entity<RelInstitutionApplicationSubject>(entity =>
        {
            entity.HasKey(e => e.InstitutionApplicationSubjectId);

            entity.ToTable("relInstitutionApplicationSubjects");

            entity.Property(e => e.InstitutionApplicationSubjectId).HasColumnName("InstitutionApplicationSubjectID");
            entity.Property(e => e.InstitutionApplicationId).HasColumnName("InstitutionApplicationID");
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.InstitutionApplication).WithMany(p => p.RelInstitutionApplicationSubjects)
                .HasForeignKey(d => d.InstitutionApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relInstAppSubj_relInstApp");

            entity.HasOne(d => d.Subject).WithMany(p => p.RelInstitutionApplicationSubjects)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relInstAppSubj_Subjects");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasIndex(e => e.UserId, "UQ_Students_UserID").IsUnique();

            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Nationality).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.Ignore(e => e.GenderEnum);

            entity.HasOne(d => d.User).WithOne(p => p.Student)
                .HasForeignKey<Student>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Students_Users");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.InstitutionFacultyId).HasColumnName("InstitutionFacultyID");
            entity.Property(e => e.Name).HasMaxLength(200);

            entity.HasOne(d => d.InstitutionFaculty).WithMany(p => p.Subjects)
                .HasForeignKey(d => d.InstitutionFacultyId)
                .HasConstraintName("FK_Subjects_Faculties");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email, "UQ_Users_Email").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
        });

        modelBuilder.Entity<WorkExperience>(entity =>
        {
            entity.Property(e => e.WorkExperienceId).HasColumnName("WorkExperienceID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.ExperienceType).HasMaxLength(100);
            entity.Property(e => e.Organisation).HasMaxLength(200);

            entity.HasOne(d => d.Application).WithMany(p => p.WorkExperiences)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkExperiences_Applications");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
