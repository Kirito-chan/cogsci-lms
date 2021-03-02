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
export const IS_STUDENT = 1;
export const IS_ADMIN = 2;

// ked sa klikne Diskutovat, tak to ma usera nascrollovat na dolnu cast stranky, avsak niekedy neurobime dostatocne
// daleko, tak treba opatovne spustit scrollovanie - avsak oneskorenie spustenia tohto scrollovania musi byt
// dobre nastavene, lebo ak je prirychle, tak to nenaskrolluje a ak zase pomale, tak to user uvidi
export const SCROLL_DELAY = 500;
