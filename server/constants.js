export const FROM_EMAIL_RESET_PASSWORD = "kiritochan776@gmail.com";

export const IS_STUDENT = 1; // rola pouzivatela, ktora ja v tabulke user v stlpci role
export const IS_ADMIN = 2; // rola pouzivatela, ktora ja v tabulke user v stlpci role

export const STUD_PRES_NEUTRAL = 0; // student presentation, ktora ma status NEUTRAL, cize poslana na feedback pre ucitela aby ju este mohol upravit do finalnej verzie
export const STUD_PRES_OPENED = 1; // student presentation, ktora ma status OPENED, cize otvorena na hodnotenie
export const STUD_PRES_CLOSED = 2; // student presentation, ktora ma status CLOSED, cize uz uzatvorena na hodnotenie
export const SUMMER_SEASON = 1; // letny semester - stlpec season v tabulke subject
export const WINTER_SEASON = 2; // zimny semester - stlpec season v tabulke subject

export const SUBJ_IS_ACTIVE = 1; // status pre subject - ze je aktivny
export const SUBJ_IS_NOT_ACTIVE = 2; // status pre subject - ze je neaktivny

export const ATTENDANCE_WEIGHT = 30; // val_attendance v subject tabulke, je to v percentach mienene
export const PRESENTATION_WEIGHT = 40; // val_presentation v subject tabulke
export const COMMENT_WEIGHT = 30; // val_comment v subject tabulke

export const PENDING_FOR_SUBJ = 1; // v tabulke user_subject_lookup stlpec status hovori o tom,
export const ACCEPTED_TO_SUBJ = 2; // ci je student cakajuci, prijaty alebo zmietnuty pre prihlasenie sa na dany predmet
export const REJECTED_TO_SUBJ = 3;
export const ADMIN_FOR_SUBJ = 4; // aby sa odlisil admin/ucitel od ostatnych studentov v tabulke user_subject_lookup
// kedze tam maju byt aj ucitelia, aby vedeli hodnotit zo svojho uctu prezentacie studentov
// kedze v tabulke user_presentation_valuation treba usl_id pre hodnotenie prezentacie

export const ATTENDANCE_CLOSED = 1; // v tabulke attendance stplec status, ci je otvorena alebo uzavreta dochadzka na dany tyzden
export const ATTENDANCE_OPENED = 2;

export const GOT_0_BONUS_POINTS = 0;
export const GOT_1_BONUS_POINTS = 1;
export const NOT_YET_EVALUATED_BONUS_POINTS = "nehodnotené";
export const NOT_YET_COMMENTED = "nekomentoval";

// ked sa hodnoti prezentacia podla roznych kriterii, tak aky je maximalny pocet bodov pre dane kriterium
export const MAX_POINT_HEIGHT_PRES_EVALUATION = 10;

export const TEACHER = "teacher"; // ked sa ziskavaju komentare, tak aby cez parameter TEACHER alebo STUDENT
export const STUDENT = "student"; // zistil koho komentare ma vybrat z databazy

export const A = 100; // pre tabulku subject_valuation
export const B = 90;
export const C = 80;
export const D = 70;
export const E = 60;
export const Fx = 50;

export const SALT_ROUNDS = 10;

export const URL_RESETED_PASSWORD = "/reseted-password";

export const getEmailTextForResetPassword = (clientURL, userId, token) => {
  const url = clientURL + URL_RESETED_PASSWORD + "/" + userId + "/" + token;
  return (
    "<h4><b>Resetovanie hesla</b></h4>" +
    "<p>Na obnovenie hesla vyplňte formulár na nasledujúcom linku:</p>" +
    `<a href="${url}">${url}</a>` +
    "<br><br>" +
    "<p>-- Admin z kognitívnych vied</p>"
  );
};
