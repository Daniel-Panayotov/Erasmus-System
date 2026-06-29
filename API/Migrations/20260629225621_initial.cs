using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Institutions",
                columns: table => new
                {
                    InstitutionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Institutions", x => x.InstitutionID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    ContactID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    InstitutionID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.ContactID);
                    table.ForeignKey(
                        name: "FK_Contacts_Institutions",
                        column: x => x.InstitutionID,
                        principalTable: "Institutions",
                        principalColumn: "InstitutionID");
                });

            migrationBuilder.CreateTable(
                name: "Faculties",
                columns: table => new
                {
                    FacultyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    InstitutionID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculties", x => x.FacultyID);
                    table.ForeignKey(
                        name: "FK_Faculties_Institutions",
                        column: x => x.InstitutionID,
                        principalTable: "Institutions",
                        principalColumn: "InstitutionID");
                });

            migrationBuilder.CreateTable(
                name: "HashedRefreshTokens",
                columns: table => new
                {
                    HashedRefreshTokenID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HashedToken = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashedRefreshTokens", x => x.HashedRefreshTokenID);
                    table.ForeignKey(
                        name: "FK_HashedRefreshTokens_Users",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    StudentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    BirthDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.StudentID);
                    table.ForeignKey(
                        name: "FK_Students_Users",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Disciplines",
                columns: table => new
                {
                    DisciplineID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FacultyID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disciplines", x => x.DisciplineID);
                    table.ForeignKey(
                        name: "FK_Disciplines_Faculties",
                        column: x => x.FacultyID,
                        principalTable: "Faculties",
                        principalColumn: "FacultyID");
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    SubjectID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Credits = table.Column<int>(type: "int", nullable: false),
                    InstitutionFacultyID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.SubjectID);
                    table.ForeignKey(
                        name: "FK_Subjects_Faculties",
                        column: x => x.InstitutionFacultyID,
                        principalTable: "Faculties",
                        principalColumn: "FacultyID");
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    ApplicationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Photo = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    MobilityType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StudyFrom = table.Column<DateOnly>(type: "date", nullable: false),
                    StudyTo = table.Column<DateOnly>(type: "date", nullable: false),
                    Accommodation = table.Column<bool>(type: "bit", nullable: false),
                    AccommodationFrom = table.Column<DateOnly>(type: "date", nullable: true),
                    AccommodationTo = table.Column<DateOnly>(type: "date", nullable: true),
                    BulgarianCourse = table.Column<bool>(type: "bit", nullable: false),
                    MotivationText = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Degree = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PriorStudyAbroad = table.Column<bool>(type: "bit", nullable: false),
                    PriorStudyDuration = table.Column<int>(type: "int", nullable: true),
                    StudentID = table.Column<int>(type: "int", nullable: false),
                    SendingInstitution = table.Column<int>(type: "int", nullable: false),
                    ReceivingInstitution = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.ApplicationID);
                    table.ForeignKey(
                        name: "FK_Applications_ReceivingInstitution",
                        column: x => x.ReceivingInstitution,
                        principalTable: "Institutions",
                        principalColumn: "InstitutionID");
                    table.ForeignKey(
                        name: "FK_Applications_SendingInstitution",
                        column: x => x.SendingInstitution,
                        principalTable: "Institutions",
                        principalColumn: "InstitutionID");
                    table.ForeignKey(
                        name: "FK_Applications_Students",
                        column: x => x.StudentID,
                        principalTable: "Students",
                        principalColumn: "StudentID");
                });

            migrationBuilder.CreateTable(
                name: "LanguageCompetencies",
                columns: table => new
                {
                    LanguageCompetencyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Language = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CanFollowLectures = table.Column<bool>(type: "bit", nullable: false),
                    CanFollowLecturesWithLessons = table.Column<bool>(type: "bit", nullable: false),
                    StudentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LanguageCompetencies", x => x.LanguageCompetencyID);
                    table.ForeignKey(
                        name: "FK_LanguageCompetencies_Students",
                        column: x => x.StudentID,
                        principalTable: "Students",
                        principalColumn: "StudentID");
                });

            migrationBuilder.CreateTable(
                name: "relDisciplineSubjects",
                columns: table => new
                {
                    DisciplineSubjectsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisciplineID = table.Column<int>(type: "int", nullable: false),
                    SubjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_relDisciplineSubjects", x => x.DisciplineSubjectsID);
                    table.ForeignKey(
                        name: "FK_relDiscSubj_Disciplines",
                        column: x => x.DisciplineID,
                        principalTable: "Disciplines",
                        principalColumn: "DisciplineID");
                    table.ForeignKey(
                        name: "FK_relDiscSubj_Subjects",
                        column: x => x.SubjectID,
                        principalTable: "Subjects",
                        principalColumn: "SubjectID");
                });

            migrationBuilder.CreateTable(
                name: "ApplicationDocuments",
                columns: table => new
                {
                    ApplicationDocumentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Application = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ApplicationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationDocuments", x => x.ApplicationDocumentID);
                    table.ForeignKey(
                        name: "FK_ApplicationDocuments_Applications",
                        column: x => x.ApplicationID,
                        principalTable: "Applications",
                        principalColumn: "ApplicationID");
                });

            migrationBuilder.CreateTable(
                name: "relInstitutionApplications",
                columns: table => new
                {
                    InstitutionApplicationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationID = table.Column<int>(type: "int", nullable: false),
                    ContactID = table.Column<int>(type: "int", nullable: false),
                    DisciplineID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_relInstitutionApplications", x => x.InstitutionApplicationID);
                    table.ForeignKey(
                        name: "FK_relInstApp_Applications",
                        column: x => x.ApplicationID,
                        principalTable: "Applications",
                        principalColumn: "ApplicationID");
                    table.ForeignKey(
                        name: "FK_relInstApp_Contacts",
                        column: x => x.ContactID,
                        principalTable: "Contacts",
                        principalColumn: "ContactID");
                    table.ForeignKey(
                        name: "FK_relInstApp_Disciplines",
                        column: x => x.DisciplineID,
                        principalTable: "Disciplines",
                        principalColumn: "DisciplineID");
                });

            migrationBuilder.CreateTable(
                name: "WorkExperiences",
                columns: table => new
                {
                    WorkExperienceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExperienceType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Organisation = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    From = table.Column<DateOnly>(type: "date", nullable: false),
                    To = table.Column<DateOnly>(type: "date", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ApplicationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkExperiences", x => x.WorkExperienceID);
                    table.ForeignKey(
                        name: "FK_WorkExperiences_Applications",
                        column: x => x.ApplicationID,
                        principalTable: "Applications",
                        principalColumn: "ApplicationID");
                });

            migrationBuilder.CreateTable(
                name: "relInstitutionApplicationSubjects",
                columns: table => new
                {
                    InstitutionApplicationSubjectID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InstitutionApplicationID = table.Column<int>(type: "int", nullable: false),
                    SubjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_relInstitutionApplicationSubjects", x => x.InstitutionApplicationSubjectID);
                    table.ForeignKey(
                        name: "FK_relInstAppSubj_Subjects",
                        column: x => x.SubjectID,
                        principalTable: "Subjects",
                        principalColumn: "SubjectID");
                    table.ForeignKey(
                        name: "FK_relInstAppSubj_relInstApp",
                        column: x => x.InstitutionApplicationID,
                        principalTable: "relInstitutionApplications",
                        principalColumn: "InstitutionApplicationID");
                });

            migrationBuilder.CreateIndex(
                name: "UQ_ApplicationDocuments_ApplicationID",
                table: "ApplicationDocuments",
                column: "ApplicationID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ReceivingInstitution",
                table: "Applications",
                column: "ReceivingInstitution");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_SendingInstitution",
                table: "Applications",
                column: "SendingInstitution");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_StudentID",
                table: "Applications",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_InstitutionID",
                table: "Contacts",
                column: "InstitutionID");

            migrationBuilder.CreateIndex(
                name: "IX_Disciplines_FacultyID",
                table: "Disciplines",
                column: "FacultyID");

            migrationBuilder.CreateIndex(
                name: "IX_Faculties_InstitutionID",
                table: "Faculties",
                column: "InstitutionID");

            migrationBuilder.CreateIndex(
                name: "IX_HashedRefreshTokens_UserID",
                table: "HashedRefreshTokens",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "UQ_Institutions_Code",
                table: "Institutions",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LanguageCompetencies_StudentID",
                table: "LanguageCompetencies",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_relDisciplineSubjects_DisciplineID",
                table: "relDisciplineSubjects",
                column: "DisciplineID");

            migrationBuilder.CreateIndex(
                name: "IX_relDisciplineSubjects_SubjectID",
                table: "relDisciplineSubjects",
                column: "SubjectID");

            migrationBuilder.CreateIndex(
                name: "IX_relInstitutionApplications_ApplicationID",
                table: "relInstitutionApplications",
                column: "ApplicationID");

            migrationBuilder.CreateIndex(
                name: "IX_relInstitutionApplications_ContactID",
                table: "relInstitutionApplications",
                column: "ContactID");

            migrationBuilder.CreateIndex(
                name: "IX_relInstitutionApplications_DisciplineID",
                table: "relInstitutionApplications",
                column: "DisciplineID");

            migrationBuilder.CreateIndex(
                name: "IX_relInstitutionApplicationSubjects_InstitutionApplicationID",
                table: "relInstitutionApplicationSubjects",
                column: "InstitutionApplicationID");

            migrationBuilder.CreateIndex(
                name: "IX_relInstitutionApplicationSubjects_SubjectID",
                table: "relInstitutionApplicationSubjects",
                column: "SubjectID");

            migrationBuilder.CreateIndex(
                name: "UQ_Students_UserID",
                table: "Students",
                column: "UserID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_InstitutionFacultyID",
                table: "Subjects",
                column: "InstitutionFacultyID");

            migrationBuilder.CreateIndex(
                name: "UQ_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkExperiences_ApplicationID",
                table: "WorkExperiences",
                column: "ApplicationID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationDocuments");

            migrationBuilder.DropTable(
                name: "HashedRefreshTokens");

            migrationBuilder.DropTable(
                name: "LanguageCompetencies");

            migrationBuilder.DropTable(
                name: "relDisciplineSubjects");

            migrationBuilder.DropTable(
                name: "relInstitutionApplicationSubjects");

            migrationBuilder.DropTable(
                name: "WorkExperiences");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "relInstitutionApplications");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Disciplines");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Faculties");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Institutions");
        }
    }
}
