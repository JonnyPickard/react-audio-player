import { constants } from "./constants";

const { Icon, Button } = constants;

/*
  Sizes use REM 
  
  Base font size: 16px;

  Table of [name: number]: rem, px found here:
  https://chakra-ui-git-fix-typescript-autocomplete.chakra-ui.vercel.app/docs/theming/theme#spacing
*/
export const components = {
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
  Button: {
    variants: {
      sm: {
        boxSize: Button.sm.name,
      },
      md: {
        boxSize: Button.md.name,
      },
      lg: {
        boxSize: Button.lg.name,
      },
    },
    defaultProps: {
      variant: "sm",
    },
  },
};
