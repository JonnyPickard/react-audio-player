export interface ArtworkOptions {
  src: string;
  /* Px only as artwork is always a 1:1 aspect ratio */
  px: number;
  sizes: {
    [size: string]: { px: number; src: string };
  };
}

export class Artwork implements ArtworkOptions {
  src: string;
  px: number;
  sizes: {
    [size: string]: { px: number; src: string };
  };

  constructor({ src, px, sizes }: ArtworkOptions) {
    this.src = src;
    this.px = px;
    this.sizes = sizes;
  }
}
