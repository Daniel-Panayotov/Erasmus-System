using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class revised_db_model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_ReceivingInstitution",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_SendingInstitution",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Institutions",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Faculties_Institutions",
                table: "Faculties");

            migrationBuilder.DropForeignKey(
                name: "FK_relDiscSubj_Disciplines",
                table: "relDisciplineSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_relDiscSubj_Subjects",
                table: "relDisciplineSubjects");

            migrationBuilder.DropTable(
                name: "ApplicationDocuments");

            migrationBuilder.DropTable(
                name: "Institutions");

            migrationBuilder.DropTable(
                name: "relInstitutionApplicationSubjects");

            migrationBuilder.DropTable(
                name: "relInstitutionApplications");

            migrationBuilder.DropIndex(
                name: "IX_relDisciplineSubjects_DisciplineID",
                table: "relDisciplineSubjects");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_InstitutionID",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "InstitutionID",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "MobilityType",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "PriorStudyAbroad",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "PriorStudyDuration",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "InstitutionFacultyID",
                table: "Subjects",
                newName: "FacultyID");

            migrationBuilder.RenameIndex(
                name: "IX_Subjects_InstitutionFacultyID",
                table: "Subjects",
                newName: "IX_Subjects_FacultyID");

            migrationBuilder.RenameColumn(
                name: "InstitutionID",
                table: "Faculties",
                newName: "UniversityID");

            migrationBuilder.RenameIndex(
                name: "IX_Faculties_InstitutionID",
                table: "Faculties",
                newName: "IX_Faculties_UniversityID");

            migrationBuilder.RenameColumn(
                name: "SendingInstitution",
                table: "Applications",
                newName: "TermID");

            migrationBuilder.RenameColumn(
                name: "ReceivingInstitution",
                table: "Applications",
                newName: "SendingFacultyID");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_SendingInstitution",
                table: "Applications",
                newName: "IX_Applications_TermID");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_ReceivingInstitution",
                table: "Applications",
                newName: "IX_Applications_SendingFacultyID");

            migrationBuilder.AlterColumn<string>(
                name: "ExperienceType",
                table: "WorkExperiences",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Students",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<int>(
                name: "CertificateID",
                table: "LanguageCompetencies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompetencyLevel",
                table: "LanguageCompetencies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "HashedTokens",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiresAt",
                table: "HashedTokens",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddColumn<int>(
                name: "ContactID",
                table: "Faculties",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MotivationText",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Degree",
                table: "Applications",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<int>(
                name: "MobilityID",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PhotoID",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FileContents",
                columns: table => new
                {
                    FileContentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileContent = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileContents", x => x.FileContentID);
                });

            migrationBuilder.CreateTable(
                name: "Firms",
                columns: table => new
                {
                    FirmID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    ContactID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Firms", x => x.FirmID);
                    table.ForeignKey(
                        name: "FK_Firms_Contacts",
                        column: x => x.ContactID,
                        principalTable: "Contacts",
                        principalColumn: "ContactID");
                });

            migrationBuilder.CreateTable(
                name: "Mobilities",
                columns: table => new
                {
                    MobilityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MobilityType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mobilities", x => x.MobilityID);
                });

            migrationBuilder.CreateTable(
                name: "Studies",
                columns: table => new
                {
                    StudyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudyDuration = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Studies", x => x.StudyID);
                    table.ForeignKey(
                        name: "FK_Studies_Applications",
                        column: x => x.ApplicationID,
                        principalTable: "Applications",
                        principalColumn: "ApplicationID");
                });

            migrationBuilder.CreateTable(
                name: "Terms",
                columns: table => new
                {
                    TermID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ApplicationDeadline = table.Column<DateOnly>(type: "date", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terms", x => x.TermID);
                });

            migrationBuilder.CreateTable(
                name: "Universities",
                columns: table => new
                {
                    UniversityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Universities", x => x.UniversityID);
                });

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    FileID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FileSize = table.Column<int>(type: "int", nullable: false),
                    FileContentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.FileID);
                    table.ForeignKey(
                        name: "FK_Files_FileContents",
                        column: x => x.FileContentID,
                        principalTable: "FileContents",
                        principalColumn: "FileContentID");
                });

            migrationBuilder.CreateTable(
                name: "FacultyMobilities",
                columns: table => new
                {
                    MobilityID = table.Column<int>(type: "int", nullable: false),
                    ContactID = table.Column<int>(type: "int", nullable: false),
                    FacultyID = table.Column<int>(type: "int", nullable: false),
                    DisciplineID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacultyMobilities", x => x.MobilityID);
                    table.ForeignKey(
                        name: "FK_FacultyMobilities_Contacts",
                        column: x => x.ContactID,
                        principalTable: "Contacts",
                        principalColumn: "ContactID");
                    table.ForeignKey(
                        name: "FK_FacultyMobilities_Disciplines",
                        column: x => x.DisciplineID,
                        principalTable: "Disciplines",
                        principalColumn: "DisciplineID");
                    table.ForeignKey(
                        name: "FK_FacultyMobilities_Faculties",
                        column: x => x.FacultyID,
                        principalTable: "Faculties",
                        principalColumn: "FacultyID");
                    table.ForeignKey(
                        name: "FK_FacultyMobilities_Mobilities",
                        column: x => x.MobilityID,
                        principalTable: "Mobilities",
                        principalColumn: "MobilityID");
                });

            migrationBuilder.CreateTable(
                name: "FirmMobilities",
                columns: table => new
                {
                    MobilityID = table.Column<int>(type: "int", nullable: false),
                    FirmID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FirmMobilities", x => x.MobilityID);
                    table.ForeignKey(
                        name: "FK_FirmMobilities_Firms",
                        column: x => x.FirmID,
                        principalTable: "Firms",
                        principalColumn: "FirmID");
                    table.ForeignKey(
                        name: "FK_FirmMobilities_Mobilities",
                        column: x => x.MobilityID,
                        principalTable: "Mobilities",
                        principalColumn: "MobilityID");
                });

            migrationBuilder.CreateTable(
                name: "ApplicationFile",
                columns: table => new
                {
                    ApplicationFileID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SignedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Pending"),
                    ApplicationID = table.Column<int>(type: "int", nullable: false),
                    DocumentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationFile", x => x.ApplicationFileID);
                    table.ForeignKey(
                        name: "FK_ApplicationFile_Applications",
                        column: x => x.ApplicationID,
                        principalTable: "Applications",
                        principalColumn: "ApplicationID");
                    table.ForeignKey(
                        name: "FK_ApplicationFile_Files",
                        column: x => x.DocumentID,
                        principalTable: "Files",
                        principalColumn: "FileID");
                });

            migrationBuilder.CreateTable(
                name: "relFacultyMobilitiesSubjects",
                columns: table => new
                {
                    relFacultyMobilitiesSubjectID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FacultyMobilityID = table.Column<int>(type: "int", nullable: false),
                    SubjectID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_relFacultyMobilitiesSubjects", x => x.relFacultyMobilitiesSubjectID);
                    table.ForeignKey(
                        name: "FK_relFacMobSubj_FacultyMobilities",
                        column: x => x.FacultyMobilityID,
                        principalTable: "FacultyMobilities",
                        principalColumn: "MobilityID");
                    table.ForeignKey(
                        name: "FK_relFacMobSubj_Subjects",
                        column: x => x.SubjectID,
                        principalTable: "Subjects",
                        principalColumn: "SubjectID");
                });

            migrationBuilder.CreateIndex(
                name: "UQ_relDisciplineSubjects",
                table: "relDisciplineSubjects",
                columns: new[] { "DisciplineID", "SubjectID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_LanguageCompetencies_CertificateID",
                table: "LanguageCompetencies",
                column: "CertificateID",
                unique: true,
                filter: "[CertificateID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Faculties_ContactID",
                table: "Faculties",
                column: "ContactID");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_MobilityID",
                table: "Applications",
                column: "MobilityID");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_PhotoID",
                table: "Applications",
                column: "PhotoID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_ApplicationFile_ApplicationID",
                table: "ApplicationFile",
                column: "ApplicationID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_ApplicationFile_DocumentID",
                table: "ApplicationFile",
                column: "DocumentID",
                unique: true,
                filter: "[DocumentID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_FacultyMobilities_ContactID",
                table: "FacultyMobilities",
                column: "ContactID");

            migrationBuilder.CreateIndex(
                name: "IX_FacultyMobilities_DisciplineID",
                table: "FacultyMobilities",
                column: "DisciplineID");

            migrationBuilder.CreateIndex(
                name: "IX_FacultyMobilities_FacultyID",
                table: "FacultyMobilities",
                column: "FacultyID");

            migrationBuilder.CreateIndex(
                name: "UQ_Files_FileContentID",
                table: "Files",
                column: "FileContentID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FirmMobilities_FirmID",
                table: "FirmMobilities",
                column: "FirmID");

            migrationBuilder.CreateIndex(
                name: "IX_Firms_ContactID",
                table: "Firms",
                column: "ContactID");

            migrationBuilder.CreateIndex(
                name: "IX_relFacultyMobilitiesSubjects_SubjectID",
                table: "relFacultyMobilitiesSubjects",
                column: "SubjectID");

            migrationBuilder.CreateIndex(
                name: "UQ_relFacMobSubj",
                table: "relFacultyMobilitiesSubjects",
                columns: new[] { "FacultyMobilityID", "SubjectID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Studies_ApplicationID",
                table: "Studies",
                column: "ApplicationID");

            migrationBuilder.CreateIndex(
                name: "UQ_Universities_Code",
                table: "Universities",
                column: "Code",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Files",
                table: "Applications",
                column: "PhotoID",
                principalTable: "Files",
                principalColumn: "FileID");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Mobilities",
                table: "Applications",
                column: "MobilityID",
                principalTable: "Mobilities",
                principalColumn: "MobilityID");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_SendingFaculty",
                table: "Applications",
                column: "SendingFacultyID",
                principalTable: "Faculties",
                principalColumn: "FacultyID");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Terms",
                table: "Applications",
                column: "TermID",
                principalTable: "Terms",
                principalColumn: "TermID");

            migrationBuilder.AddForeignKey(
                name: "FK_Faculties_Contacts",
                table: "Faculties",
                column: "ContactID",
                principalTable: "Contacts",
                principalColumn: "ContactID");

            migrationBuilder.AddForeignKey(
                name: "FK_Faculties_Universities",
                table: "Faculties",
                column: "UniversityID",
                principalTable: "Universities",
                principalColumn: "UniversityID");

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageCompetencies_Files",
                table: "LanguageCompetencies",
                column: "CertificateID",
                principalTable: "Files",
                principalColumn: "FileID");

            migrationBuilder.AddForeignKey(
                name: "FK_relDisciplineSubjects_Disciplines",
                table: "relDisciplineSubjects",
                column: "DisciplineID",
                principalTable: "Disciplines",
                principalColumn: "DisciplineID");

            migrationBuilder.AddForeignKey(
                name: "FK_relDisciplineSubjects_Subjects",
                table: "relDisciplineSubjects",
                column: "SubjectID",
                principalTable: "Subjects",
                principalColumn: "SubjectID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Files",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Mobilities",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_SendingFaculty",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Terms",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Faculties_Contacts",
                table: "Faculties");

            migrationBuilder.DropForeignKey(
                name: "FK_Faculties_Universities",
                table: "Faculties");

            migrationBuilder.DropForeignKey(
                name: "FK_LanguageCompetencies_Files",
                table: "LanguageCompetencies");

            migrationBuilder.DropForeignKey(
                name: "FK_relDisciplineSubjects_Disciplines",
                table: "relDisciplineSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_relDisciplineSubjects_Subjects",
                table: "relDisciplineSubjects");

            migrationBuilder.DropTable(
                name: "ApplicationFile");

            migrationBuilder.DropTable(
                name: "FirmMobilities");

            migrationBuilder.DropTable(
                name: "relFacultyMobilitiesSubjects");

            migrationBuilder.DropTable(
                name: "Studies");

            migrationBuilder.DropTable(
                name: "Terms");

            migrationBuilder.DropTable(
                name: "Universities");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "Firms");

            migrationBuilder.DropTable(
                name: "FacultyMobilities");

            migrationBuilder.DropTable(
                name: "FileContents");

            migrationBuilder.DropTable(
                name: "Mobilities");

            migrationBuilder.DropIndex(
                name: "UQ_relDisciplineSubjects",
                table: "relDisciplineSubjects");

            migrationBuilder.DropIndex(
                name: "UQ_LanguageCompetencies_CertificateID",
                table: "LanguageCompetencies");

            migrationBuilder.DropIndex(
                name: "IX_Faculties_ContactID",
                table: "Faculties");

            migrationBuilder.DropIndex(
                name: "IX_Applications_MobilityID",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_PhotoID",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "CertificateID",
                table: "LanguageCompetencies");

            migrationBuilder.DropColumn(
                name: "CompetencyLevel",
                table: "LanguageCompetencies");

            migrationBuilder.DropColumn(
                name: "ContactID",
                table: "Faculties");

            migrationBuilder.DropColumn(
                name: "MobilityID",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "PhotoID",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "FacultyID",
                table: "Subjects",
                newName: "InstitutionFacultyID");

            migrationBuilder.RenameIndex(
                name: "IX_Subjects_FacultyID",
                table: "Subjects",
                newName: "IX_Subjects_InstitutionFacultyID");

            migrationBuilder.RenameColumn(
                name: "UniversityID",
                table: "Faculties",
                newName: "InstitutionID");

            migrationBuilder.RenameIndex(
                name: "IX_Faculties_UniversityID",
                table: "Faculties",
                newName: "IX_Faculties_InstitutionID");

            migrationBuilder.RenameColumn(
                name: "TermID",
                table: "Applications",
                newName: "SendingInstitution");

            migrationBuilder.RenameColumn(
                name: "SendingFacultyID",
                table: "Applications",
                newName: "ReceivingInstitution");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_TermID",
                table: "Applications",
                newName: "IX_Applications_SendingInstitution");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_SendingFacultyID",
                table: "Applications",
                newName: "IX_Applications_ReceivingInstitution");

            migrationBuilder.AlterColumn<string>(
                name: "ExperienceType",
                table: "WorkExperiences",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "HashedTokens",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiresAt",
                table: "HashedTokens",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<int>(
                name: "InstitutionID",
                table: "Contacts",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MotivationText",
                table: "Applications",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Degree",
                table: "Applications",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "MobilityType",
                table: "Applications",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "Applications",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<bool>(
                name: "PriorStudyAbroad",
                table: "Applications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PriorStudyDuration",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicationDocuments",
                columns: table => new
                {
                    ApplicationDocumentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationID = table.Column<int>(type: "int", nullable: false),
                    Application = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
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
                name: "Institutions",
                columns: table => new
                {
                    InstitutionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Institutions", x => x.InstitutionID);
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
                name: "IX_relDisciplineSubjects_DisciplineID",
                table: "relDisciplineSubjects",
                column: "DisciplineID");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_InstitutionID",
                table: "Contacts",
                column: "InstitutionID");

            migrationBuilder.CreateIndex(
                name: "UQ_ApplicationDocuments_ApplicationID",
                table: "ApplicationDocuments",
                column: "ApplicationID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_Institutions_Code",
                table: "Institutions",
                column: "Code",
                unique: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_ReceivingInstitution",
                table: "Applications",
                column: "ReceivingInstitution",
                principalTable: "Institutions",
                principalColumn: "InstitutionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_SendingInstitution",
                table: "Applications",
                column: "SendingInstitution",
                principalTable: "Institutions",
                principalColumn: "InstitutionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Institutions",
                table: "Contacts",
                column: "InstitutionID",
                principalTable: "Institutions",
                principalColumn: "InstitutionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Faculties_Institutions",
                table: "Faculties",
                column: "InstitutionID",
                principalTable: "Institutions",
                principalColumn: "InstitutionID");

            migrationBuilder.AddForeignKey(
                name: "FK_relDiscSubj_Disciplines",
                table: "relDisciplineSubjects",
                column: "DisciplineID",
                principalTable: "Disciplines",
                principalColumn: "DisciplineID");

            migrationBuilder.AddForeignKey(
                name: "FK_relDiscSubj_Subjects",
                table: "relDisciplineSubjects",
                column: "SubjectID",
                principalTable: "Subjects",
                principalColumn: "SubjectID");
        }
    }
}
