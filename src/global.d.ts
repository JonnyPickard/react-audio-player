import { CSSProp } from "@emotion/react";

declare module "howler" {
  interface Howl {
    _emit: (event: string) => void;
    seek(seek: number, id?: number): this | number;
  }
}

declare module "react" {
  interface DOMAttributes {
    css?: CSSProp;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp;
    }
  }
}
