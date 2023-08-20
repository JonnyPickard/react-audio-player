import { AudioTrack } from "../models/AudioTrack";

/* Cleaning the tracklist data of the Howl instance */
export const cleanTrackData = (track: AudioTrack) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { howl, ...rest } = track;

  return rest;
};
