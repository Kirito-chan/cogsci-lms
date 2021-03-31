import format from "date-fns/format";
import {
  SUMMER_SEASON,
  TIME_TO_WAIT_FOR_FETCHING,
  WINTER_SEASON,
} from "../constants";
import moment from "moment";

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

export function dataInReduxAreRecent(lastFetch) {
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < TIME_TO_WAIT_FOR_FETCHING) return true;
  return false;
}
