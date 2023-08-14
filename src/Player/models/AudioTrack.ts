import { Howl } from "howler";
import { v4 } from "uuid";

// const howlOptions = {
//   html5: true,
// };

export interface TrackOptions {
  title: string;
  artist: string;
  /* Under vendor in shopify fields */
  label: string;
  url: string;
  /* Url to navigate to Product page*/
  productUrl: string;
  artworkUrl: string;
}

export class AudioTrack {
  artist: string;
  url: string;
  title: string;
  label: string;
  productUrl: string;
  artworkUrl: string;
  id: string;
  howl: Howl;

  constructor(options: TrackOptions, onTrackEndCallback: () => void) {
    this.artist = options.artist;
    this.url = options.url;
    this.title = options.title;
    this.label = options.label;
    this.productUrl = options.productUrl;
    this.artworkUrl = options.artworkUrl;
    this.id = v4();
    this.howl = new Howl({
      src: options.url,
      onend: onTrackEndCallback,
    });
  }
}
