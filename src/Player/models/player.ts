import { Howl, Howler } from "howler";
import remove from "lodash.remove";
import { v4 } from "uuid";

import { getTimePlayed, getTimeRemaining } from "../utils/durationHelpers";

export type Track = {
  id: string;
  /* creates howler instances using howler player to play the tracks */
  howl: Howl;
  title: string;
  artist: string;
  /* Under vendor in shopify fields */
  label: string;
  url: string;
  /* Url to navigate to Product page*/
  productUrl?: string;
  artworkUrl?: string;
};

export type TrackDetails = {
  artist: string;
  url: string;
  title: string;
  label: string;
  productUrl?: string;
  artworkUrl?: string;
};

const howlOptions = {
  // html5: true,
};

function isNumber(x?: number | null): x is number {
  return typeof x === "number";
}

interface PlayerOptions {
  initVolume?: number;
}

export class AudioPlayer {
  /* For all currently loaded tracks in the playlist */
  tracks: Array<Track | undefined>;
  currentlyLoadedTrack: Track | null;
  onTrackEndCallback: () => void;

  constructor({ initVolume = 1 }: PlayerOptions) {
    this.tracks = [];
    this.currentlyLoadedTrack = null;
    this.onTrackEndCallback = () => {};

    Howler.volume(initVolume);
  }

  public set setOnTrackEndCallback(callback: () => void) {
    this.onTrackEndCallback = callback;
  }

  createTrack = ({
    artist,
    url,
    title,
    label,
    productUrl = "",
    artworkUrl = "",
  }: TrackDetails): Track => {
    const track: Track = {
      artist,
      url,
      title,
      label,
      productUrl,
      artworkUrl,
      id: v4(),
      howl: new Howl({
        ...howlOptions,
        src: url,
        onend: this.onTrackEndCallback,
      }),
    };

    return track;
  };

  isPlaying(): boolean {
    if (this.currentlyLoadedTrack && this.currentlyLoadedTrack.howl.playing()) {
      return true;
    } else {
      return false;
    }
  }

  getTrackList() {
    return this.tracks;
  }

  getVolume() {
    return Howler.volume();
  }

  setVolume(volume: number) {
    Howler.volume(volume);

    return Howler.volume();
  }

  toggleMute(shouldMute: boolean) {
    Howler.mute(shouldMute);
  }

  getDurationAsync(): Promise<number | null> {
    return new Promise((resolve) => {
      if (this.currentlyLoadedTrack) {
        if (this.currentlyLoadedTrack.howl.state() === "loaded") {
          resolve(this.currentlyLoadedTrack.howl.duration()!);
        } else {
          this.currentlyLoadedTrack.howl.on("load", () => {
            const duration = this.currentlyLoadedTrack!.howl.duration()!;
            return resolve(duration);
          });
        }
      } else {
        resolve(null);
      }
    });
  }

  getTimeRemaining(): number | null {
    if (this.currentlyLoadedTrack && isNumber(this.seek())) {
      const duration = this.currentlyLoadedTrack.howl.duration()!;
      const seekTime = this.seek()!;

      return getTimeRemaining(duration, seekTime);
    }

    return null;
  }

  getTimePlayed() {
    if (this.currentlyLoadedTrack && isNumber(this.seek())) {
      const seekTime = this.seek() as number;

      return getTimePlayed(seekTime);
    }

    return null;
  }

  /* Finds the track in the playlist [tracks] using the tracks src url */
  findTrackByUrl(url: string) {
    return this.tracks.find((track) => track && track.url === url);
  }

  loadTrack = (details: TrackDetails): Track => {
    const track = this.findTrackByUrl(details.url) || this.createTrack(details);

    if (!this.findTrackByUrl(track.url)) {
      this.tracks.push(track);
    }

    this.currentlyLoadedTrack = track;

    return track;
  };

  addMultipleTracks = (tracklist: TrackDetails[]) => {
    /* creates an array of track objects to add to the Players playlist */
    const playlist = tracklist.map(
      (trackDetails) =>
        this.findTrackByUrl(trackDetails.url) || this.createTrack(trackDetails),
    );

    this.tracks.push(...playlist);

    if (!this.currentlyLoadedTrack) {
      this.currentlyLoadedTrack = playlist[0];
    }
  };

  playTrack(track: Track) {
    this.currentlyLoadedTrack = track;
    this.currentlyLoadedTrack.howl.play();
  }

  playCurrentlyLoadedTrack() {
    if (this.currentlyLoadedTrack) {
      this.currentlyLoadedTrack.howl.play();
    }
  }

  stopLoadedTrack() {
    if (this.currentlyLoadedTrack) {
      this.currentlyLoadedTrack.howl.stop();
    }
  }

  pauseTrack() {
    if (this.currentlyLoadedTrack) {
      this.currentlyLoadedTrack.howl.pause();
    }
  }

  removeTrack(url: string) {
    const track = this.findTrackByUrl(url);

    if (track) {
      if (track.id === this.currentlyLoadedTrack?.id) {
        this.currentlyLoadedTrack.howl.stop();
        this.currentlyLoadedTrack = null;
      }

      remove(this.tracks, (t) => t && t.id === track.id);
    }
  }

  removeAllTracks() {
    Howler.unload();

    this.tracks = [];
    this.currentlyLoadedTrack = null;
  }

  stopAllTracks() {
    Howler.stop();
  }

  /* 
    Check to see if its possible to skip forwards 
    return falsy or next track
  */
  getNextTrack() {
    if (this.tracks.length > 1 && this.currentlyLoadedTrack) {
      const currentTrackIndex = this.tracks.indexOf(this.currentlyLoadedTrack);

      const nextTrack = this.tracks[currentTrackIndex + 1];

      /* If a track object exists at position + 1 */
      if (nextTrack) {
        return nextTrack;
      }
    }
  }

  /* Check to see if its possible to skip backwards */
  getPreviousTrack() {
    if (this.tracks.length > 1 && this.currentlyLoadedTrack) {
      const currentTrackIndex = this.tracks.indexOf(this.currentlyLoadedTrack);

      const previousTrack = this.tracks[currentTrackIndex - 1];

      /* If a track object exists at position - 1 */
      if (previousTrack) {
        return previousTrack;
      }
    }
  }

  /* 
    Adds + Loads the next track in the tracklist
  */
  nextTrack() {
    this.stopLoadedTrack();
    const nextTrack = this.getNextTrack();

    if (nextTrack) {
      this.playTrack(nextTrack);
    }
  }

  previousTrack() {
    this.stopLoadedTrack();
    const previousTrack = this.getPreviousTrack();

    if (previousTrack) {
      this.playTrack(previousTrack);
    }
    if (!previousTrack && this.currentlyLoadedTrack) {
      this.playTrack(this.currentlyLoadedTrack);
    }
  }

  /* 
    Seeks to position if given number
      Returns seek time
  */
  seek(position?: number): number | null {
    if (
      this.currentlyLoadedTrack &&
      this.currentlyLoadedTrack.howl.state() === "loaded"
    ) {
      if (isNumber(position)) {
        this.currentlyLoadedTrack.howl.seek(position);
      }

      const seekTime = this.currentlyLoadedTrack.howl.seek();

      if (isNumber(seekTime)) {
        return seekTime;
      }
    }

    return null;
  }
}
