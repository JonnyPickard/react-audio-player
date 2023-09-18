import "@emotion/react";

import { theme } from "./theme";

declare module "@emotion/react" {
  type Custom = typeof theme;
  export interface Theme extends Custom {}
}
