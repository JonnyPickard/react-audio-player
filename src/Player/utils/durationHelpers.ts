export const calcTimeRemaining = (
  duration: number,
  seekTimestamp: number /* Playback head timestamp for the selectedTrack */,
): number => {
  return Math.round(duration - seekTimestamp) || 0;
};

export const calcTimePlayed = (
  seekTimestamp: number /* Playback head timestamp for the selectedTrack */,
): number => {
  return Math.round(seekTimestamp) || 0;
};
