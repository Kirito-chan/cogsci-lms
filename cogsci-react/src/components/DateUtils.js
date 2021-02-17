import format from "date-fns/format";
import { TIME_TO_WAIT_FOR_FETCHING } from "../constants";
import moment from "moment";

export default function formatDate(date) {
  return format(new Date(date), "dd. MM. yyyy");
}

export function dataInReduxAreRecent(lastFetch) {
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < TIME_TO_WAIT_FOR_FETCHING) return true;
  return false;
}
