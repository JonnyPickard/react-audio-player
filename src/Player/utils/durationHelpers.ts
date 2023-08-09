export const calcTimeRemaining = (
  duration: number,
  seekValue: number /* Current timestamp of the loaded songs playback*/,
): number => {
  return Math.round(duration - seekValue) || 0;
};

export const calcTimePlayed = (
  seekValue: number /* Current timestamp of the loaded songs playback*/,
): number => {
  return Math.round(seekValue) || 0;
};
