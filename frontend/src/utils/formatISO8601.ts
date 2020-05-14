import moment from "moment";

function formatISO8601(timestamp: string): string {
  return moment.utc(timestamp).format("MM/DD/YY HH:mm");
}

function formatDateOnly(timestamp: string): string {
  return moment.utc(timestamp).format("MM/DD/YY");
}

export default formatISO8601;
export { formatDateOnly };
