import { Howler } from "howler";
import clamp from "lodash.clamp";
import clone from "lodash.clone";
import remove from "lodash.remove";

import { AudioPlayerError } from "../constants/errors";
import { calcTimePlayed, calcTimeRemaining } from "../utils/durationHelpers";
import { isNumber } from "../utils/isNumber";
import { AudioTrack } from "./AudioTrack";

export interface TrackDetails {
  artist: string;
  url: string;
  title: string;
  label: string;
  productUrl?: string;
  artworkUrl?: string;
}

interface PlayerOptions {
  initVolume?: number;
}

export class AudioPlayer {
  trackList: AudioTrack[];
  loadedTrack: AudioTrack | null;
  onTrackEndCallback: () => void;

  constructor({ initVolume = 1 }: PlayerOptions) {
    this.trackList = [];
    this.loadedTrack = null;
    this.onTrackEndCallback = () => {};

    Howler.volume(initVolume);
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
  }: TrackDetails) {
    return new AudioTrack(
      { artist, url, title, label, productUrl, artworkUrl },
      this.onTrackEndCallback,
    );
  }

  isPlaying(): boolean {
    if (this.loadedTrack !== null && this.loadedTrack.howl.playing()) {
      return true;
    } else {
      return false;
    }
  }

  getTrackList() {
    return clone(this.trackList);
  }

  getVolume() {
    return Howler.volume();
  }

  setVolume(volume: number) {
    /* Ensures volume is between 0 - 1 */
    Howler.volume(clamp(volume, 0, 1));

    return Howler.volume();
  }

  toggleMute(shouldMute: boolean) {
    Howler.mute(shouldMute);
  }

  getDurationAsync(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.loadedTrack) {
        reject(new Error(AudioPlayerError.NO_TRACK_LOADED));
        return;
      }

      // on "load"
      const onLoad = () => {
        const duration = this.loadedTrack!.howl.duration();

        this.loadedTrack!.howl.off("load", onLoad);
        this.loadedTrack!.howl.off("loaderror", onError);

        resolve(duration);
      };

      // on "loaderror"
      const onError = () => {
        this.loadedTrack!.howl.off("load", onLoad);
        this.loadedTrack!.howl.off("loaderror", onError);
        reject(new Error(AudioPlayerError.LOAD_TRACK_FAILURE));
      };

      if (this.loadedTrack.howl.state() === "loaded") {
        resolve(this.loadedTrack.howl.duration()!);
      } else {
        this.loadedTrack.howl.once("load", onLoad);
        this.loadedTrack.howl.once("loaderror", onError);
      }
    });
  }

  getTimeRemaining(): number | null {
    if (this.loadedTrack && isNumber(this.seek())) {
      const duration = this.loadedTrack.howl.duration()!;
      const seekTime = this.seek()!;

      return calcTimeRemaining(duration, seekTime);
    }

    return null;
  }

  getTimePlayed() {
    const seekTime = this.seek();

    if (seekTime && isNumber(seekTime)) {
      return calcTimePlayed(seekTime);
    }

    return null;
  }

  /* Finds the track in the trackList using the tracks src url */
  findTrackByUrl(url: string) {
    return this.trackList.find((track) => track && track.url === url);
  }

  /* 
    Selects track given provided track details
    Will add new track if it doesn't exist
  */
  loadTrack(details: TrackDetails): AudioTrack {
    const track = this.addTrackToTrackList(details);

    this.loadedTrack = track;

    return track;
  }

  addTrackToTrackList(details: TrackDetails): AudioTrack {
    const track = this.createTrack(details);

    this.trackList.push(track);

    return track;
  }

  // TODO: addMultipleTracksToTrackList(trackList, shouldLoadTrack) {}
  addMultipleTracksToTrackList(tracks: TrackDetails[]) {
    if (!tracks.length) {
      return;
    }

    /* creates an array of track objects to add to the Players trackList */
    this.trackList.push(
      ...tracks.map(
        (trackDetails) =>
          this.findTrackByUrl(trackDetails.url) ||
          this.createTrack(trackDetails),
      ),
    );

    if (!this.loadedTrack) {
      this.loadedTrack = this.trackList[0]!;
    }
  }

  playTrack(track: AudioTrack) {
    if (track) {
      this.loadedTrack = track;
      this.loadedTrack.howl.play();
    }
  }

  playCurrentlyLoadedTrack() {
    if (this.loadedTrack) {
      this.loadedTrack.howl.play();
    }
  }

  stopLoadedTrack() {
    if (this.loadedTrack) {
      this.loadedTrack.howl.stop();
    }
  }

  pauseTrack() {
    if (this.loadedTrack) {
      this.loadedTrack.howl.pause();
    }
  }

  removeTrack(url: string) {
    const track = this.findTrackByUrl(url);

    if (track) {
      if (track.id === this.loadedTrack?.id) {
        this.loadedTrack.howl.unload();
        this.loadedTrack = null;
      }

      remove(this.trackList, (t) => t && t.id === track.id);
    }
  }

  removeAllTracks() {
    Howler.unload();

    this.trackList = [];
    this.loadedTrack = null;
  }

  stopAllTracks() {
    Howler.stop();
  }

  /* 
    Check to see if its possible to skip forwards 
    return falsy or next track
  */
  getNextTrack() {
    if (this.trackList.length > 1 && this.loadedTrack) {
      const currentTrackIndex = this.trackList.indexOf(this.loadedTrack);

      const nextTrack = this.trackList[currentTrackIndex + 1];

      /* If a track object exists at position + 1 */
      if (nextTrack) {
        return nextTrack;
      }
    }
  }

  /* Check to see if its possible to skip backwards */
  getPreviousTrack() {
    if (this.trackList.length > 1 && this.loadedTrack) {
      const currentTrackIndex = this.trackList.indexOf(this.loadedTrack);

      const previousTrack = this.trackList[currentTrackIndex - 1];

      /* If a track object exists at position - 1 */
      if (previousTrack) {
        return previousTrack;
      }
    }
  }

  /* 
    Adds + Loads the next track in the tracklist
  */
  playNextTrack() {
    this.stopLoadedTrack();
    const nextTrack = this.getNextTrack();

    if (nextTrack) {
      this.playTrack(nextTrack);
    }
  }

  playPreviousTrack() {
    this.stopLoadedTrack();
    const previousTrack = this.getPreviousTrack();

    if (previousTrack) {
      this.playTrack(previousTrack);
    }
    // Restart track on backwards click if first track in list
    if (!previousTrack && this.loadedTrack) {
      this.playTrack(this.loadedTrack);
    }
  }

  // TODO: Potentially use a shared utility func like this
  // private currentTrackIsLoaded() {
  //   if (this.loadedTrack && this.loadedTrack.howl.state() === "loaded") {
  //     return true;
  //   }
  // }

  /* 
    Seeks to position if given number
      Returns seek time
  */
  seek(position?: number): number | null {
    if (this.loadedTrack && this.loadedTrack.howl.state() === "loaded") {
      if (isNumber(position)) {
        this.loadedTrack.howl.seek(position);
      }

      const seekTime = this.loadedTrack.howl.seek();

      if (isNumber(seekTime)) {
        return seekTime;
      }
    }

    return null;
  }
}
