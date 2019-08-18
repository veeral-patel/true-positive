import moment from "moment";

function formatISO8601(timestamp: string): string {
  return moment(timestamp).format("MM/DD/YY hh:mm");
}

export default formatISO8601;
