import format from "date-fns/format";
import { SUMMER_SEASON, WINTER_SEASON } from "../constants";

export default function formatDate(date) {
  return format(new Date(date), "dd. MM. yyyy");
}

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export const getCurrentSchoolYear = () => {
  if (currentMonth < 6 || currentMonth === 12)
    return `${currentYear - 1}/${currentYear}`;
  else return `${currentYear}/${currentYear + 1}`;
};

export const getCurrentSeason = () => {
  if (currentMonth < 6 || currentMonth === 12) return SUMMER_SEASON;
  else return WINTER_SEASON;
};
