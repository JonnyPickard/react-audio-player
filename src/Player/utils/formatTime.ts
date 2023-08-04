// Formats to audio timestamp notation
export function formatTime(seconds: number): string {
  let minutes: any = Math.floor(seconds / 60);
  let secs: any = Math.floor(seconds % 60);

  if (isNaN(minutes)) {
    return "00:00";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (secs < 10) {
    secs = "0" + secs;
  }

  return minutes + ":" + secs;
}
