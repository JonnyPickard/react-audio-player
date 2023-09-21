import { extendTheme } from "@chakra-ui/react";

import { grayscale } from "./colors";
import { mediaQuery } from "./mediaQuery";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors: {
    grayscale,
  },
  ...typography,
  spacing,
  mediaQuery,
};

export const chakraTheme = extendTheme(theme);
