export const calcTimeRemaining = (
  duration: number,
  /* Playback head timestamp for the selectedTrack */
  playbackPosition: number,
): number => {
  return Math.round(duration - playbackPosition) || 0;
};

export const calcTimePlayed = (
  /* Playback head timestamp for the selectedTrack */
  playbackPosition: number,
): number => {
  return Math.round(playbackPosition) || 0;
};
