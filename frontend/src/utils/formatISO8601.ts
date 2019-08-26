import moment from "moment";

function formatISO8601(timestamp: string): string {
  return moment.utc(timestamp).format("MM/DD/YY HH:mm");
}

export default formatISO8601;
