import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

import { constants } from "./constants";

const { Icon, IconButton } = constants;

/*
  Sizes use REM 
  
  Base font size: 16px;

  Table of [name: number]: rem, px found here:
  https://chakra-ui-git-fix-typescript-autocomplete.chakra-ui.vercel.app/docs/theming/theme#spacing
*/
export const components = {
  // Icon doesn't have the standard component API
  Icon: {
    variants: {
      sm: {
        // 16px
        boxSize: Icon.sm.name,
      },
      md: {
        // 24px
        boxSize: Icon.md.name,
      },
      lg: {
        // 32px
        boxSize: Icon.lg.name,
      },
    },
    defaultProps: {
      variant: "sm",
    },
  },
  Button: defineStyleConfig({
    sizes: {
      sm: defineStyle({
        size: IconButton.sm.name,
      }),
      md: defineStyle({
        size: IconButton.md.name,
      }),
      lg: defineStyle({
        size: IconButton.lg.name,
      }),
    },
    defaultProps: { size: "lg" },
  }),
};
