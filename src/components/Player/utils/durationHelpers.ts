export const calcTimeRemaining = (
  duration: number,
  /* Playback head timestamp for the selectedTrack */
  seekTimestamp: number,
): number => {
  return Math.round(duration - seekTimestamp) || 0;
};

export const calcTimePlayed = (
  /* Playback head timestamp for the selectedTrack */
  seekTimestamp: number,
): number => {
  return Math.round(seekTimestamp) || 0;
};
