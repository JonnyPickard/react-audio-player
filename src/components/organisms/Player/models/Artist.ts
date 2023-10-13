export interface ArtistOptions {
  name: string;
  /* Url linking to relevant artist page */
  url: string;
  imageUrl: string;
}

export class Artist {
  name: string;
  url?: string;
  imageUrl?: string;

  constructor(options: ArtistOptions) {
    this.name = options.name;
    this.url = options.url;
    this.imageUrl = options.imageUrl;
  }
}
