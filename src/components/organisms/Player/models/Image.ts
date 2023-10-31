export interface ImageOptions {
  src: string;
  srcSet: string;
}

export class Image implements ImageOptions {
  src: string;
  srcSet: string;

  constructor({ src, srcSet }: ImageOptions) {
    this.src = src;
    this.srcSet = srcSet;
  }
}
