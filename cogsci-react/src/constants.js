// kolko MINUT tahat data z Reduxu ak tam su... po uplynuti tohto casu nacita data z databazy
export const TIME_TO_WAIT_FOR_FETCHING = 1;

// bonuses
export const GOT_0_BONUS_POINTS = 0;
export const GOT_1_BONUS_POINTS = 1;
export const NOT_YET_EVALUATED_BONUS_POINTS = "nehodnotené";
export const LOGOUT_EVENT = "logout";

// URL pre router
export const URL_HOME_STUDENT = "/home-student";
export const URL_SUBJECTS = "/subjects";
export const URL_BONUSES = "/bonus";
export const URL_PRESENTATIONS = "/presentation";

// konstanty z databazy
export const IS_STUDENT = 1; // rola pouzivatela, ktora ja v tabulke user v stlpci role
export const IS_ADMIN = 2; // rola pouzivatela, ktora ja v tabulke user v stlpci role
export const STUD_PRES_OPENED = 1; // student presentation, ktora ma status OPENED, cize otvorena na hodnotenie
export const STUD_PRES_CLOSED = 2; // student presentation, ktora ma status CLOSED, cize uz uzatvorena na hodnotenie
