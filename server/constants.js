export const IS_STUDENT = 1; // rola pouzivatela, ktora ja v tabulke user v stlpci role
export const IS_ADMIN = 2; // rola pouzivatela, ktora ja v tabulke user v stlpci role

export const STUD_PRES_NEUTRAL = 0; // student presentation, ktora ma status NEUTRAL, cize poslana na feedback pre ucitela aby ju este mohol upravit do finalnej verzie
export const STUD_PRES_OPENED = 1; // student presentation, ktora ma status OPENED, cize otvorena na hodnotenie
export const STUD_PRES_CLOSED = 2; // student presentation, ktora ma status CLOSED, cize uz uzatvorena na hodnotenie
export const SUMMER_SEASON = 1; // letny semester - stlpec season v tabulke subject
export const WINTER_SEASON = 2; // zimny semester - stlpec season v tabulke subject

export const TEACHER = "teacher"; // ked sa ziskavaju komentare, tak aby cez parameter TEACHER alebo STUDENT
export const STUDENT = "student"; // zistil koho komentare ma vybrat z databazy
