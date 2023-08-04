/// <reference types="react-scripts" />
import { CSSProp } from "@emotion/react";

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
