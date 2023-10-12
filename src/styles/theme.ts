import { extendTheme } from "@chakra-ui/react";

import { brand, grayscale, grayscaleAlpha } from "./colors";
import { components } from "./components";
import { typography } from "./typography";

// Has to adhere to this structure:
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/foundations/index.ts
export const theme = extendTheme({
  components,
  colors: {
    grayscale,
    grayscaleAlpha,
    brand,
  },
  ...typography,
});
