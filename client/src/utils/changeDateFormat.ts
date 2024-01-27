import moment from "moment-timezone";

export function changeDateFormat(
  dateString: string,
  targetTimeZone: string
): string {
  const formattedDateString = moment
    .utc(dateString)
    .tz(targetTimeZone)
    .format("YYYY-MM-DDTHH:mm:ss");

  return formattedDateString;
}
