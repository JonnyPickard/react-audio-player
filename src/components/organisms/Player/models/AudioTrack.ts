import { Howl } from "howler";
import { v4 } from "uuid";

import { Artist } from "./Artist";

export interface TrackOptions {
  title: string;
  artists: Artist[];
  label: string;
  url: string;
  /* Url to navigate to Product page*/
  productUrl: string;
  artworkUrl: string;
}

export class AudioTrack {
  artists: Artist[];
  url: string;
  title: string;
  label: string;
  productUrl: string;
  artworkUrl: string;
  id: string;
  howl: Howl;

  constructor(options: TrackOptions, onTrackEndCallback: () => void) {
    this.artists = options.artists;
    this.url = options.url;
    this.title = options.title;
    this.label = options.label;
    this.productUrl = options.productUrl;
    this.artworkUrl = options.artworkUrl;
    this.id = v4();
    this.howl = new Howl({
      src: options.url,
      onend: onTrackEndCallback,
      // Note: Set to use html5 audio by default
      // html5: true,
    });
  }
}
