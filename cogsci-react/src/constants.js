// bonuses
export const GOT_0_BONUS_POINTS = 0; // stlpec valuated v tabulke announcement_comments = 0 znamena, ze dostal 0 bodov
export const GOT_1_BONUS_POINTS = 1; // stlpec valuated v tabulke announcement_comments = 1 znamena, ze dostal 1 bod
export const NOT_YET_EVALUATED_BONUS_POINTS = "nehodnotené"; // stlpec valuated v tabulke announcement_comments = NULL znamena, ze este nebol hodnoteny ucitelom
export const NOT_YET_COMMENTED = "nekomentoval";
export const RESET_STATE = "RESET_STATE";
export const USER_LOGOUT = "USER_LOGOUT";

// ked sa hodnoti prezentacia podla roznych kriterii, tak aky je maximalny pocet bodov pre dane kriterium
export const MAX_POINT_HEIGHT_PRES_EVALUATION = 10;

// URL pre router
export const URL_HOME = "/home-student";
export const URL_SUBJECTS = "/subjects";
export const URL_BONUSES = "/bonus";
export const URL_PRESENTATIONS = "/presentation";
export const URL_TERMS = "/terms";

export const URL_ADMIN_SUBJECTS = "/admin/subjects";
export const URL_ADMIN_USERS = "/admin/users";
export const URL_ADMIN_BONUSES = "/admin/bonus";
export const URL_ADMIN_PRESENTATIONS = "/admin/presentation";
export const URL_ADMIN_SETTINGS = "/admin/settings";
export const URL_ADMIN_HOME = "/admin/home";
export const URL_ADMIN_EMAIL = "/admin/email";
export const URL_ADMIN_STUDENT_DETAIL = "/admin/student";
export const URL_ADMIN_OVERALL_ATTENDANCE = "/admin/overall-attendance";
export const URL_ADMIN_OVERALL_BONUSES = "/admin/overall-bonuses";

export const URL_NOT_AUTHORIZED = "/not-authorized";
export const URL_REGISTER = "/register";
export const URL_FORGOTTEN_PASSWORD = "/forgotten-password";
export const URL_RESETED_PASSWORD = "/reseted-password";
export const URL_LOGIN = "/login";

// konstanty z databazy
export const IS_STUDENT = 1; // rola pouzivatela, ktora ja v tabulke user v stlpci role
export const IS_ADMIN = 2; // rola pouzivatela, ktora ja v tabulke user v stlpci role

export const STUD_PRES_NEUTRAL = 0; // student presentation, ktora je poslana na feedback pre ucitela, aby ju student mohol este doladit
export const STUD_PRES_OPENED = 1; // student presentation, ktora ma status OPENED, cize otvorena na hodnotenie
export const STUD_PRES_CLOSED = 2; // student presentation, ktora ma status CLOSED, cize uz uzatvorena na hodnotenie

export const SUMMER_SEASON = 1; // letny semester - stlpec season v tabulke subject
export const WINTER_SEASON = 2; // zimny semester - stlpec season v tabulke subject

export const SUBJ_IS_ACTIVE = 1;
export const SUBJ_IS_NOT_ACTIVE = 2;

export const PENDING_FOR_SUBJ = 1; // v tabulke user_subject_lookup stlpec status hovori o tom,
export const ACCEPTED_TO_SUBJ = 2; // ci je student cakajuci, prijaty alebo zmietnuty pre prihlasenie sa na dany predmet
export const REJECTED_TO_SUBJ = 3;

export const ATTENDANCE_CLOSED = 1; // v tabulke attendance stlpec status hovori o tom, ci je pre dany tyzden otvorena abo zatvorena dochadzka
export const ATTENDANCE_OPENED = 2;

export const MINIMAL_PASSWORD_LENGTH = 6;
export const DIFFERENT_PASSWORD_ERROR = "Heslá sa nezhodujú !";
export const SHORT_PASSWORD_ERROR = `Heslo musí mať aspoň ${MINIMAL_PASSWORD_LENGTH} znakov !`;

// URL na API
export const createUrlToDownloadPresentation = (
  subjectId,
  presId,
  fileName,
  isTeacherPres
) => {
  return `http://localhost:8080/api/subject/${subjectId}/presentation/${presId}/download?filename=${encodeURIComponent(
    fileName
  )}&teacherPres=${isTeacherPres}`;
};

export const createUrlToUploadPresentation = (
  subjectId,
  isTeacherPres,
  userId
) => {
  return `http://localhost:8080/api/subject/${subjectId}/presentation/upload?teacherPres=${isTeacherPres}&userId=${userId}`;
};
