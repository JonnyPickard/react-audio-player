import { extendTheme } from "@chakra-ui/react";

import { grayscale } from "./colors";
import { components } from "./components";
import { typography } from "./typography";

// Has to adhere to this structure:
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/foundations/index.ts
export const theme = extendTheme({
  components,
  colors: {
    grayscale,
  },
  ...typography,
});
