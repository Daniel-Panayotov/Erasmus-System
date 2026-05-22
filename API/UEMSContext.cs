using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API;

public partial class UEMSContext : DbContext
{
    public UEMSContext() { }

    public UEMSContext(DbContextOptions<UEMSContext> options) : base(options) { }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Application> Applications { get; set; }

    public virtual DbSet<ApplicationDocument> ApplicationDocuments { get; set; }

    public virtual DbSet<Institution> Institutions { get; set; }

    public virtual DbSet<InstitutionContact> InstitutionContacts { get; set; }

    public virtual DbSet<InstitutionFaculty> InstitutionFaculties { get; set; }

    public virtual DbSet<LanguageCompetency> LanguageCompetencies { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudyForInstitution> StudyForInstitutions { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WorkExperience> WorkExperiences { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admins__719FE4E84FCBC04A");

            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.Password).HasMaxLength(255);
        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.ApplicationId).HasName("PK__Applicat__C93A4F7962057B62");

            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Degree).HasMaxLength(100);
            entity.Property(e => e.MobilityType).HasMaxLength(100);
            entity.Property(e => e.ReceivingInstitutionId).HasColumnName("ReceivingInstitutionID");
            entity.Property(e => e.SendingInstitutionId).HasColumnName("SendingInstitutionID");
            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.StudyFieldCode).HasMaxLength(100);

            entity.HasOne(d => d.ReceivingInstitution).WithMany(p => p.ApplicationReceivingInstitutions)
                .HasForeignKey(d => d.ReceivingInstitutionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_ReceivingInstitution");

            entity.HasOne(d => d.SendingInstitution).WithMany(p => p.ApplicationSendingInstitutions)
                .HasForeignKey(d => d.SendingInstitutionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_SendingInstitution");

            entity.HasOne(d => d.Student).WithMany(p => p.Applications)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Applications_Students");
        });

        modelBuilder.Entity<ApplicationDocument>(entity =>
        {
            entity.HasKey(e => e.ApplicationDocumentId).HasName("PK__Applicat__9A4B1C0F376129BD");

            entity.Property(e => e.ApplicationDocumentId).HasColumnName("ApplicationDocumentID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Status).HasMaxLength(100);

            entity.HasOne(d => d.ApplicationNavigation).WithMany(p => p.ApplicationDocuments)
                .HasForeignKey(d => d.ApplicationId)
                .HasConstraintName("FK_ApplicationDocuments_Applications");
        });

        modelBuilder.Entity<Institution>(entity =>
        {
            entity.HasKey(e => e.InstitutionId).HasName("PK__Institut__8DF6B94D0C66B969");

            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Code).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<InstitutionContact>(entity =>
        {
            entity.HasKey(e => e.ContactId).HasName("PK__Institut__5C6625BB879A5E2C");

            entity.Property(e => e.ContactId).HasColumnName("ContactID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(20);

            entity.HasOne(d => d.Institution).WithMany(p => p.InstitutionContacts)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_InstitutionContacts_Institutions");
        });

        modelBuilder.Entity<InstitutionFaculty>(entity =>
        {
            entity.HasKey(e => e.InstitutionFacultyId).HasName("PK__Institut__2CB4202FF4631EEE");

            entity.Property(e => e.InstitutionFacultyId).HasColumnName("InstitutionFacultyID");
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.Institution).WithMany(p => p.InstitutionFaculties)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_InstitutionFaculties_Institutions");
        });

        modelBuilder.Entity<LanguageCompetency>(entity =>
        {
            entity.HasKey(e => e.LanguageCompetencyId).HasName("PK__Language__A7D1AB93C7D2A083");

            entity.Property(e => e.LanguageCompetencyId).HasColumnName("LanguageCompetencyID");
            entity.Property(e => e.Language).HasMaxLength(100);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.Studying).HasMaxLength(100);

            entity.HasOne(d => d.Student).WithMany(p => p.LanguageCompetencies)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_LanguageCompetencies_Students");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Students__32C52A797CDB10E3");

            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.CurrentAddress).HasMaxLength(500);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Nationality).HasMaxLength(100);
            entity.Property(e => e.PermanentAddress).HasMaxLength(500);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Students)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Students_Users");
        });

        modelBuilder.Entity<StudyForInstitution>(entity =>
        {
            entity.HasKey(e => e.StudyForInstitutionId).HasName("PK__StudyFor__3CF55E82E1D56A95");

            entity.Property(e => e.StudyForInstitutionId).HasColumnName("StudyForInstitutionID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");

            entity.HasOne(d => d.Application).WithMany(p => p.StudyForInstitutions)
                .HasForeignKey(d => d.ApplicationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudyForInstitutions_Applications");

            entity.HasOne(d => d.Institution).WithMany(p => p.StudyForInstitutions)
                .HasForeignKey(d => d.InstitutionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudyForInstitutions_Institutions");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subjects__AC1BA388CD005AA4");

            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");
            entity.Property(e => e.InstitutionFacultyId).HasColumnName("InstitutionFacultyID");
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.InstitutionFaculty).WithMany(p => p.Subjects)
                .HasForeignKey(d => d.InstitutionFacultyId)
                .HasConstraintName("FK_Subjects_InstitutionFaculties");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC2DEAA197");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
        });

        modelBuilder.Entity<WorkExperience>(entity =>
        {
            entity.HasKey(e => e.WorkExperienceId).HasName("PK__WorkExpe__55A2B8A9C125D1F8");

            entity.Property(e => e.WorkExperienceId).HasColumnName("WorkExperienceID");
            entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.ExperienceType).HasMaxLength(100);
            entity.Property(e => e.Organisation).HasMaxLength(255);

            entity.HasOne(d => d.Application).WithMany(p => p.WorkExperiences)
                .HasForeignKey(d => d.ApplicationId)
                .HasConstraintName("FK_WorkExperiences_Applications");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
