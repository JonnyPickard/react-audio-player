import { Howler } from "howler";
import clamp from "lodash.clamp";
import clone from "lodash.clone";
import remove from "lodash.remove";

import { logger } from "../../../services";
import { AudioPlayerError } from "../constants/errors";
import { calcTimePlayed, calcTimeRemaining } from "../utils/durationHelpers";
import { isNumber } from "../utils/isNumber";
import { AudioTrack } from "./AudioTrack";

/**
 * Details required to create a new audio track.
 */
export interface NewTrackDetails {
  artist: string;
  url: string;
  title: string;
  label: string;
  productUrl?: string;
  artworkUrl?: string;
}

/**
 * AudioPlayer class for managing audio playback, track list and track information.
 */
export class AudioPlayer {
  /**
   * List of audio tracks managed by the player.
   */
  trackList: AudioTrack[];
  /**
   * Currently selected audio track.
   */
  selectedTrack: AudioTrack | null;
  /**
   * Callback function triggered when a track ends.
   */
  onTrackEndCallback: () => void;
  /**
   * Logger instance for the AudioPlayer class.
   *
   * Uses: {@link https://tslog.js.org/ | tslog}
   */
  logger;

  /**
   * Constructs an instance of the AudioPlayer class.
   */
  constructor(debug: boolean = false) {
    this.trackList = [];
    this.selectedTrack = null;
    this.onTrackEndCallback = () => {};
    this.logger = logger({ debug, name: "AudioPlayer" });
  }

  /**
   * Sets the callback function to be triggered when a track ends.
   * @param callback - The callback function.
   */
  setOnTrackEndCallback(callback: () => void) {
    this.onTrackEndCallback = callback;
  }

  /**
   * Creates a new AudioTrack instance based on provided track details.
   * @param details - Details for the new track.
   * @returns The created AudioTrack instance.
   */
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

  /**
   * Checks if any track is currently playing.
   * @returns `true` if a track is playing, otherwise `false`.
   */
  isPlaying(): boolean {
    if (this.selectedTrack === null) {
      return false;
    }

    return this.selectedTrack.howl.playing();
  }

  /**
   * Retrieves a copy of the track list.
   * @returns A copy of the track list.
   */
  getTrackList() {
    // TODO: Maybe map here & only return relevent details?
    // _pick function? or _omit
    // Warning: I've used the getTrackList()[0].howl in a few tests
    return clone(this.trackList);
  }

  /**
   * Retrieves the currently selected track.
   * @returns The currently selected track.
   */
  getSelectedTrack() {
    return this.selectedTrack;
  }

  /**
   * Retrieves the current volume level.
   * @returns The current volume level.
   */
  getVolume() {
    return Howler.volume();
  }

  /**
   * Sets the volume level for audio playback.
   * @param volume - The new volume level (between 0 and 1).
   * @returns The updated volume level.
   */
  setVolume(volume: number) {
    /* Ensures volume is between 0 - 1 */
    Howler.volume(clamp(volume, 0, 1));

    return Howler.volume();
  }

  /**
   * Mutes or unmutes the audio playback.
   * @param shouldMute - Set to `true` to mute, `false` to unmute.
   */
  mute(shouldMute: boolean) {
    Howler.mute(shouldMute);
  }

  // TODO: maybe workout more gracefull errors for this?
  /**
   * Retrieves the duration of the currently selected track asynchronously.
   * @returns A promise that resolves with the duration of the track.
   * @throws {Error} If no track is loaded.
   */
  getDurationAsync(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.selectedTrack) {
        reject(new Error(AudioPlayerError.getDurationAsync.NO_TRACK_LOADED));
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
        reject(new Error(AudioPlayerError.getDurationAsync.LOAD_TRACK_FAILURE));
      };

      if (this.selectedTrack.howl.state() === "loaded") {
        resolve(this.selectedTrack.howl.duration()!);
      } else {
        this.selectedTrack.howl.once("load", onLoad);
        this.selectedTrack.howl.once("loaderror", onError);
      }
    });
  }

  /**
   * Calculates the remaining time of the currently selected track.
   * @returns The remaining time in seconds, or `null` if no track is selected.
   */
  getTimeRemaining(): number | null {
    if (this.selectedTrack && isNumber(this.getSeekTimestamp())) {
      const duration = this.selectedTrack.howl.duration()!;
      const seekTimestamp = this.getSeekTimestamp()!;

      return calcTimeRemaining(duration, seekTimestamp);
    }

    return null;
  }

  /**
   * Calculates the played time of the currently selected track.
   * @returns The played time in seconds, or `null` if no track is selected.
   */
  getTimePlayed() {
    const seekTimestamp = this.getSeekTimestamp();

    if (seekTimestamp && isNumber(seekTimestamp)) {
      return calcTimePlayed(seekTimestamp);
    }

    return null;
  }

  /**
   * Finds a track in the track list by its URL.
   * @param url - The URL of the track.
   * @returns The found AudioTrack instance, or `undefined` if not found.
   */
  findTrackByUrl(url: string) {
    return this.trackList.find((track) => track && track.url === url);
  }

  /* 
    TODO: shouldSelectTrack
    is probably cleaner as { selectTrack: boolean }
  */
  /**
   * Adds a new track to the track list.
   * @param details - Details of the new track.
   * @param shouldSelectTrack - Set to `true` to select the added track, `false` by default.
   * @returns The newly created AudioTrack instance.
   */
  addTrackToTrackList(
    details: NewTrackDetails,
    shouldSelectTrack: boolean = false,
  ): AudioTrack {
    const track = this.createTrack(details);

    this.trackList.push(track);

    if (shouldSelectTrack) {
      this.selectedTrack = track;
    }

    return track;
  }

  /**
   * Adds multiple tracks to the track list.
   * @param tracks - Array of track details.
   * @param shouldSelectTrack - Set to `true` to select the first added track, `false` by default.
   */
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

  /**
   * Plays the specified track.
   * @param track - The track to be played.
   */
  playTrack(track: AudioTrack) {
    if (track) {
      this.selectedTrack = track;
      this.selectedTrack.howl.play();
    }
  }

  /**
   * Plays the currently selected track.
   */
  playSelectedTrack() {
    if (!this.selectedTrack) {
      this.logger.log({
        fn: "playSelectedTrack",
        message: AudioPlayerError.playSelectedTrack.NO_TRACK_SELECTED,
      });
      return;
    }

    if (this.isPlaying()) {
      this.logger.log({
        fn: "playSelectedTrack",
        message: AudioPlayerError.playSelectedTrack.TRACK_ALREADY_PLAYING,
      });
      return;
    }

    this.selectedTrack.howl.play();
  }

  /**
   * Stops the currently selected track and resets its seek timestamp to 0.
   */
  stopSelectedTrack() {
    if (this.selectedTrack) {
      this.selectedTrack.howl.stop();
    }
  }

  /**
   * Pauses the currently selected track at it's current seek timestamp.
   */
  pauseSelectedTrack() {
    if (this.selectedTrack) {
      this.selectedTrack.howl.pause();
    }
  }

  /**
   * Removes a track from the track list by its URL.
   * @param url - The URL of the track to be removed.
   */
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

  /**
   * Removes all tracks from the track list and stops playback.
   */
  removeAllTracks() {
    Howler.unload();

    this.trackList = [];
    this.selectedTrack = null;
  }

  /**
   * Stops playback of all tracks.
   */
  stopAllTracks() {
    Howler.stop();
  }

  /**
   * Retrieves the next track in the track list if available.
   * @returns The next track or `null` if not available.
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

  /**
   * Retrieves the previous track in the track list if available.
   * @returns The previous track or `null` if not available.
   */
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

  /**
   * Plays the next track in the track list.
   */
  playNextTrack() {
    this.stopSelectedTrack();
    const nextTrack = this.getNextTrack();

    if (nextTrack) {
      this.playTrack(nextTrack);
    }
  }

  /**
   * Plays the previous track in the track list or restarts the current track if it's the first.
   */
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

  /**
   * Seeks to a specified timestamp in the currently selected track.
   * @param timestamp - The timestamp to seek to in seconds.
   * @returns The updated seek timestamp or `null` if seeking failed.
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

  /**
   * Retrieves the current seek timestamp of the selected track.
   * @returns The current seek timestamp in seconds or `null` if unavailable.
   */
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
