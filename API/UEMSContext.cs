using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API;

public partial class UEMSContext : DbContext
{
    public UEMSContext() { }

    public UEMSContext(DbContextOptions<UEMSContext> options) : base(options) { }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<ApplicationFile> ApplicationFiles { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Discipline> Disciplines { get; set; }

    public virtual DbSet<Faculty> Faculties { get; set; }

    public virtual DbSet<FacultyMobility> FacultyMobilities { get; set; }

    public virtual DbSet<API.Models.File> Files { get; set; }

    public virtual DbSet<FileContent> FileContents { get; set; }

    public virtual DbSet<Firm> Firms { get; set; }

    public virtual DbSet<FirmMobility> FirmMobilities { get; set; }

    public virtual DbSet<HashedToken> HashedTokens { get; set; }

    public virtual DbSet<LanguageCompetency> LanguageCompetencies { get; set; }

    public virtual DbSet<Mobility> Mobilities { get; set; }

    public virtual DbSet<RelDisciplineSubject> RelDisciplineSubjects { get; set; }

    public virtual DbSet<RelFacultyMobilitiesSubject> RelFacultyMobilitiesSubjects { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Study> Studies { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<Term> Terms { get; set; }

    public virtual DbSet<University> Universities { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WorkExperience> WorkExperiences { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Application>(entity =>
        {
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Degree).HasMaxLength(20);
            entity.Property(e => e.MobilityId).HasColumnName("MobilityID");
            entity.Property(e => e.PhotoId).HasColumnName("PhotoID");
            entity.Property(e => e.SendingFacultyId).HasColumnName("SendingFacultyID");
            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.TermId).HasColumnName("TermID");

            entity.Ignore(e => e.DegreeEnum);

            entity.HasOne(d => d.Mobility).WithMany(p => p.Applications)
                .HasForeignKey(d => d.MobilityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Mobilities");

            entity.HasOne(d => d.Photo).WithOne(p => p.Application)
                .HasForeignKey<Application>(d => d.PhotoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Files");

            entity.HasOne(d => d.SendingFaculty).WithMany(p => p.Applications)
                .HasForeignKey(d => d.SendingFacultyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_SendingFaculty");

            entity.HasOne(d => d.Student).WithMany(p => p.Applications)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Students");

            entity.HasOne(d => d.Term).WithMany(p => p.Applications)
                .HasForeignKey(d => d.TermId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Terms");
        });

        modelBuilder.Entity<ApplicationFile>(entity =>
        {
            entity.ToTable("ApplicationFile");

            entity.HasIndex(e => e.ApplicationId, "UQ_ApplicationFile_ApplicationID").IsUnique();
            entity.HasIndex(e => e.DocumentId, "UQ_ApplicationFile_DocumentID").IsUnique();

            entity.Property(e => e.ApplicationFileId).HasColumnName("ApplicationFileID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.DocumentId).HasColumnName("DocumentID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue(Status.Pending.ToString());

            entity.HasOne(d => d.Application).WithOne(p => p.ApplicationFile)
                .HasForeignKey<ApplicationFile>(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationFile_Applications");

            entity.HasOne(d => d.Document).WithOne(p => p.ApplicationFile)
                .HasForeignKey<ApplicationFile>(d => d.DocumentId)
                .HasConstraintName("FK_ApplicationFile_Files");

            entity.Ignore(e => e.StatusEnum);
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(50);
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
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.UniversityId).HasColumnName("UniversityID");

            entity.HasOne(d => d.Contact).WithMany(p => p.Faculties)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_Faculties_Contacts");

            entity.HasOne(d => d.University).WithMany(p => p.Faculties)
                .HasForeignKey(d => d.UniversityId)
                .HasConstraintName("FK_Faculties_Universities");
        });

        modelBuilder.Entity<FacultyMobility>(entity =>
        {
            entity.HasKey(e => e.MobilityId);

            entity.ToTable(tb => tb.HasTrigger("TR_FacultyMobilities_TypeGuard"));

            entity.Property(e => e.MobilityId)
                .ValueGeneratedNever()
                .HasColumnName("MobilityID");
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.DisciplineId).HasColumnName("DisciplineID");
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");

            entity.HasOne(d => d.Contact).WithMany(p => p.FacultyMobilities)
                .HasForeignKey(d => d.ContactId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FacultyMobilities_Contacts");

            entity.HasOne(d => d.Discipline).WithMany(p => p.FacultyMobilities)
                .HasForeignKey(d => d.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FacultyMobilities_Disciplines");

            entity.HasOne(d => d.Faculty).WithMany(p => p.FacultyMobilities)
                .HasForeignKey(d => d.FacultyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FacultyMobilities_Faculties");

            entity.HasOne(d => d.Mobility).WithOne(p => p.FacultyMobility)
                .HasForeignKey<FacultyMobility>(d => d.MobilityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FacultyMobilities_Mobilities");
        });

        modelBuilder.Entity<API.Models.File>(entity =>
        {
            entity.HasIndex(e => e.FileContentId, "UQ_Files_FileContentID").IsUnique();

            entity.Property(e => e.FileId).HasColumnName("FileID");
            entity.Property(e => e.ContentType).HasMaxLength(100);
            entity.Property(e => e.FileContentId).HasColumnName("FileContentID");
            entity.Property(e => e.FileName).HasMaxLength(255);

            entity.HasOne(d => d.FileContent).WithOne(p => p.File)
                .HasForeignKey<API.Models.File>(d => d.FileContentId)
                .OnDelete(DeleteBehavior.ClientCascade)
                .HasConstraintName("FK_Files_FileContents");
        });

        modelBuilder.Entity<FileContent>(entity =>
        {
            entity.Property(e => e.FileContentId).HasColumnName("FileContentID");
            entity.Property(e => e.Content).HasColumnName("FileContent");
        });

        modelBuilder.Entity<Firm>(entity =>
        {
            entity.Property(e => e.FirmId).HasColumnName("FirmID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.Name).HasMaxLength(200);

            entity.HasOne(d => d.Contact).WithMany(p => p.Firms)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_Firms_Contacts");
        });

        modelBuilder.Entity<FirmMobility>(entity =>
        {
            entity.HasKey(e => e.MobilityId);

            entity.ToTable(tb => tb.HasTrigger("TR_FirmMobilities_TypeGuard"));

            entity.Property(e => e.MobilityId)
                .ValueGeneratedNever()
                .HasColumnName("MobilityID");
            entity.Property(e => e.FirmId).HasColumnName("FirmID");

            entity.HasOne(d => d.Firm).WithMany(p => p.FirmMobilities)
                .HasForeignKey(d => d.FirmId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FirmMobilities_Firms");

            entity.HasOne(d => d.Mobility).WithOne(p => p.FirmMobility)
                .HasForeignKey<FirmMobility>(d => d.MobilityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FirmMobilities_Mobilities");
        });

        modelBuilder.Entity<HashedToken>(entity =>
        {
            entity.Property(e => e.HashedTokenId).HasColumnName("HashedTokenID");
            entity.Property(e => e.Token).HasMaxLength(500);
            entity.Property(e => e.TokenType).HasMaxLength(20);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.Ignore(e => e.TokenTypeEnum);

            entity.HasOne(d => d.User).WithMany(p => p.HashedTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_HashedTokens_Users");
        });

        modelBuilder.Entity<LanguageCompetency>(entity =>
        {
            entity.HasIndex(e => e.CertificateId, "UQ_LanguageCompetencies_CertificateID").IsUnique();

            entity.Property(e => e.LanguageCompetencyId).HasColumnName("LanguageCompetencyID");
            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.Language).HasMaxLength(100);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.HasOne(d => d.Certificate).WithOne(p => p.LanguageCompetency)
                .HasForeignKey<LanguageCompetency>(d => d.CertificateId)
                .HasConstraintName("FK_LanguageCompetencies_Files");

            entity.HasOne(d => d.Student).WithMany(p => p.LanguageCompetencies)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LanguageCompetencies_Students");
        });

        modelBuilder.Entity<Mobility>(entity =>
        {
            entity.Property(e => e.MobilityId).HasColumnName("MobilityID");
            entity.Property(e => e.MobilityType).HasMaxLength(20);

            entity.Ignore(e => e.MobilityTypeEnum);
        });

        modelBuilder.Entity<RelDisciplineSubject>(entity =>
        {
            entity.HasKey(e => e.DisciplineSubjectsId);

            entity.ToTable("relDisciplineSubjects");

            entity.HasIndex(e => new { e.DisciplineId, e.SubjectId }, "UQ_relDisciplineSubjects").IsUnique();

            entity.Property(e => e.DisciplineSubjectsId).HasColumnName("DisciplineSubjectsID");
            entity.Property(e => e.DisciplineId).HasColumnName("DisciplineID");
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.Discipline).WithMany(p => p.RelDisciplineSubjects)
                .HasForeignKey(d => d.DisciplineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relDisciplineSubjects_Disciplines");

            entity.HasOne(d => d.Subject).WithMany(p => p.RelDisciplineSubjects)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relDisciplineSubjects_Subjects");
        });

        modelBuilder.Entity<RelFacultyMobilitiesSubject>(entity =>
        {
            entity.ToTable("relFacultyMobilitiesSubjects");

            entity.HasIndex(e => new { e.FacultyMobilityId, e.SubjectId }, "UQ_relFacMobSubj").IsUnique();

            entity.Property(e => e.RelFacultyMobilitiesSubjectId).HasColumnName("relFacultyMobilitiesSubjectID");
            entity.Property(e => e.FacultyMobilityId).HasColumnName("FacultyMobilityID");
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.FacultyMobility).WithMany(p => p.RelFacultyMobilitiesSubjects)
                .HasForeignKey(d => d.FacultyMobilityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relFacMobSubj_FacultyMobilities");

            entity.HasOne(d => d.Subject).WithMany(p => p.RelFacultyMobilitiesSubjects)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_relFacMobSubj_Subjects");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasIndex(e => e.UserId, "UQ_Students_UserID").IsUnique();

            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Nationality).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.Ignore(e => e.GenderEnum);

            entity.HasOne(d => d.User).WithOne(p => p.Student)
                .HasForeignKey<Student>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Students_Users");
        });

        modelBuilder.Entity<Study>(entity =>
        {
            entity.Property(e => e.StudyId).HasColumnName("StudyID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");

            entity.HasOne(d => d.Application).WithMany(p => p.Studies)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Studies_Applications");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.Name).HasMaxLength(200);

            entity.HasOne(d => d.Faculty).WithMany(p => p.Subjects)
                .HasForeignKey(d => d.FacultyId)
                .HasConstraintName("FK_Subjects_Faculties");
        });

        modelBuilder.Entity<Term>(entity =>
        {
            entity.Property(e => e.TermId).HasColumnName("TermID");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<University>(entity =>
        {
            entity.HasIndex(e => e.Code, "UQ_Universities_Code").IsUnique();

            entity.Property(e => e.UniversityId).HasColumnName("UniversityID");
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(200);
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
            entity.Property(e => e.ExperienceType).HasMaxLength(30);
            entity.Property(e => e.Organisation).HasMaxLength(200);

            entity.Ignore(e => e.ExperienceTypeEnum);

            entity.HasOne(d => d.Application).WithMany(p => p.WorkExperiences)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WorkExperiences_Applications");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
