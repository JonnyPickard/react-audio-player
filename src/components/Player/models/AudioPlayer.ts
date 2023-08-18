import { Howler } from "howler";
import clamp from "lodash.clamp";
import clone from "lodash.clone";
import remove from "lodash.remove";

import { AudioPlayerError } from "../constants/errors";
import { calcTimePlayed, calcTimeRemaining } from "../utils/durationHelpers";
import { isNumber } from "../utils/isNumber";
import { AudioTrack } from "./AudioTrack";

export interface NewTrackDetails {
  artist: string;
  url: string;
  title: string;
  label: string;
  productUrl?: string;
  artworkUrl?: string;
}

export class AudioPlayer {
  trackList: AudioTrack[];
  selectedTrack: AudioTrack | null;
  onTrackEndCallback: () => void;

  constructor() {
    this.trackList = [];
    this.selectedTrack = null;
    this.onTrackEndCallback = () => {};
  }

  setOnTrackEndCallback(callback: () => void) {
    this.onTrackEndCallback = callback;
  }

  createTrack({
    artist,
    url,
    title,
    label,
    productUrl = "",
    artworkUrl = "",
  }: NewTrackDetails) {
    return new AudioTrack(
      { artist, url, title, label, productUrl, artworkUrl },
      this.onTrackEndCallback,
    );
  }

  isPlaying(): boolean {
    if (this.selectedTrack === null) {
      return false;
    }

    return this.selectedTrack.howl.playing();
  }

  getTrackList() {
    return clone(this.trackList);
  }

  getSelectedTrack() {
    return this.selectedTrack;
  }

  getVolume() {
    return Howler.volume();
  }

  setVolume(volume: number) {
    /* Ensures volume is between 0 - 1 */
    Howler.volume(clamp(volume, 0, 1));

    return Howler.volume();
  }

  mute(shouldMute: boolean) {
    Howler.mute(shouldMute);
  }

  getDurationAsync(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.selectedTrack) {
        reject(new Error(AudioPlayerError.NO_TRACK_LOADED));
        return;
      }

      const onLoad = () => {
        const duration = this.selectedTrack!.howl.duration();

        this.selectedTrack!.howl.off("load", onLoad);
        this.selectedTrack!.howl.off("loaderror", onError);

        resolve(duration);
      };

      const onError = () => {
        this.selectedTrack!.howl.off("load", onLoad);
        this.selectedTrack!.howl.off("loaderror", onError);
        reject(new Error(AudioPlayerError.LOAD_TRACK_FAILURE));
      };

      if (this.selectedTrack.howl.state() === "loaded") {
        resolve(this.selectedTrack.howl.duration()!);
      } else {
        this.selectedTrack.howl.once("load", onLoad);
        this.selectedTrack.howl.once("loaderror", onError);
      }
    });
  }

  getTimeRemaining(): number | null {
    if (this.selectedTrack && isNumber(this.getSeekTimestamp())) {
      const duration = this.selectedTrack.howl.duration()!;
      const seekTimestamp = this.getSeekTimestamp()!;

      return calcTimeRemaining(duration, seekTimestamp);
    }

    return null;
  }

  getTimePlayed() {
    const seekTimestamp = this.getSeekTimestamp();

    if (seekTimestamp && isNumber(seekTimestamp)) {
      return calcTimePlayed(seekTimestamp);
    }

    return null;
  }

  /* Finds track in the trackList */
  findTrackByUrl(url: string) {
    return this.trackList.find((track) => track && track.url === url);
  }

  addTrackToTrackList(
    details: NewTrackDetails,
    shouldSelectTrack: boolean = false,
  ): AudioTrack {
    const track = this.createTrack(details);
    console.log("track", track);

    this.trackList.push(track);

    if (shouldSelectTrack) {
      console.log("here");
      this.selectedTrack = track;
      console.log(this.selectedTrack);
    }

    return track;
  }

  addMultipleTracksToTrackList(
    tracks: NewTrackDetails[],
    shouldSelectTrack: boolean = false,
  ) {
    if (!tracks.length) {
      return;
    }

    const trackList = tracks.map((trackDetails) =>
      this.createTrack(trackDetails),
    );

    this.trackList.push(...trackList);

    if (shouldSelectTrack) {
      this.selectedTrack = trackList[0];
    }
  }

  playTrack(track: AudioTrack) {
    if (track) {
      this.selectedTrack = track;
      this.selectedTrack.howl.play();
    }
  }

  // TODO: do nothing if already playing
  playSelectedTrack() {
    console.log(this.selectedTrack);
    console.log(this.getSelectedTrack());
    console.log(this.trackList);
    if (this.selectedTrack) {
      this.selectedTrack.howl.play();
    }
  }

  stopSelectedTrack() {
    if (this.selectedTrack) {
      this.selectedTrack.howl.stop();
    }
  }

  pauseTrack() {
    if (this.selectedTrack) {
      this.selectedTrack.howl.pause();
    }
  }

  removeTrackByUrl(url: string) {
    const track = this.findTrackByUrl(url);

    if (track) {
      if (track.id === this.selectedTrack?.id) {
        this.selectedTrack.howl.unload();
        this.selectedTrack = null;
      }

      remove(this.trackList, (t) => t && t.id === track.id);
    }
  }

  removeAllTracks() {
    Howler.unload();

    this.trackList = [];
    this.selectedTrack = null;
  }

  stopAllTracks() {
    Howler.stop();
  }

  /* 
    Check to see if its possible to skip forwards 
    return falsy or next track
  */
  getNextTrack() {
    if (this.trackList.length > 1 && this.selectedTrack) {
      const currentTrackIndex = this.trackList.indexOf(this.selectedTrack);

      const nextTrack = this.trackList[currentTrackIndex + 1];

      /* If a track object exists at position + 1 */
      if (nextTrack) {
        return nextTrack;
      }
    }

    return null;
  }

  /* Check to see if its possible to skip backwards */
  getPreviousTrack() {
    if (this.trackList.length > 1 && this.selectedTrack) {
      const currentTrackIndex = this.trackList.indexOf(this.selectedTrack);

      const previousTrack = this.trackList[currentTrackIndex - 1];

      /* If a track object exists at position - 1 */
      if (previousTrack) {
        return previousTrack;
      }
    }

    return null;
  }

  /* 
    Adds + Loads the next track in the tracklist
  */
  playNextTrack() {
    this.stopSelectedTrack();
    const nextTrack = this.getNextTrack();

    if (nextTrack) {
      this.playTrack(nextTrack);
    }
  }

  playPreviousTrack() {
    this.stopSelectedTrack();
    const previousTrack = this.getPreviousTrack();

    if (previousTrack) {
      this.playTrack(previousTrack);
    }
    // Restart track on backwards click if first track in trackList
    if (!previousTrack && this.selectedTrack) {
      this.playTrack(this.selectedTrack);
    }
  }

  /* 
    Seeks to a given timestamp
      
    Returns seek timestamp
  */
  seekToTimestamp(timestamp: number): number | null {
    if (this.selectedTrack && this.selectedTrack.howl.state() === "loaded") {
      if (isNumber(timestamp)) {
        this.selectedTrack.howl.seek(timestamp);
      }

      const seekTimestamp = this.selectedTrack.howl.seek();

      if (isNumber(seekTimestamp)) {
        return seekTimestamp;
      }
    }

    return null;
  }

  getSeekTimestamp(): number | null {
    if (this.selectedTrack && this.selectedTrack.howl.state() === "loaded") {
      const seekTimestamp = this.selectedTrack.howl.seek();

      if (isNumber(seekTimestamp)) {
        return seekTimestamp;
      }
    }

    return null;
  }
}
