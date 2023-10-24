// For longer dates use UTC string
// H:MM:SS
const toUTCString = (seconds: number): string => {
  const date = new Date(seconds * 1000);

  const utc = date.toUTCString().split(" ")[4].split(":");

  const hours = Math.floor(Number(utc[0]) % 60);

  return `${hours}:${utc[1]}:${utc[2]}`;
};

/**
 * Formats to audio timestamp notation
 * Note: It doesn't support > 1 day
 *
 * @export
 * @param {number} seconds
 * @returns {string}  timestamp in sepcific formats
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  // Convert to out of 60
  let secs: string | number = Math.floor(seconds % 60);

  if (isNaN(minutes) || secs < 0) {
    return "0:00";
  }

  if (secs < 10) {
    secs = `0${secs}`;
  }

  return hours > 0 ? toUTCString(seconds) : minutes + ":" + secs;
}
