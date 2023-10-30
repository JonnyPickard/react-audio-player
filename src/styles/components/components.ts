import { sliderAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/react";

import { tokens } from "./tokens";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(sliderAnatomy.keys);

const { Icon, IconButton, Spinner } = tokens;

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
      "sm-white": {
        // 16px
        boxSize: Icon.sm.name,
        color: "grayscale.almostWhite",
        fill: "grayscale.almostWhite",
      },
      "md-white": {
        // 24px
        boxSize: Icon.md.name,
        color: "grayscale.almostWhite",
        fill: "grayscale.almostWhite",
      },
      "lg-white": {
        // 32px
        boxSize: Icon.lg.name,
        color: "grayscale.almostWhite",
        fill: "grayscale.almostWhite",
      },
      "xl-white": {
        // 56px
        boxSize: Icon.xl.name,
        color: "grayscale.almostWhite",
        fill: "grayscale.almostWhite",
      },
      "sm-lightGray": {
        // 16px
        boxSize: Icon.sm.name,
        color: "grayscale.lightGray",
        fill: "grayscale.lightGray",
      },
      "md-lightGray": {
        // 24px
        boxSize: Icon.md.name,
        color: "grayscale.lightGray",
        fill: "grayscale.lightGray",
      },
      "lg-lightGray": {
        // 32px
        boxSize: Icon.lg.name,
        color: "grayscale.lightGray",
        fill: "grayscale.lightGray",
      },
      "xl-lightGray": {
        // 56px
        boxSize: Icon.xl.name,
        color: "grayscale.lightGray",
        fill: "grayscale.lightGray",
      },
      "sm-black": {
        // 16px
        boxSize: Icon.sm.name,
        color: "grayscale.almostBlack",
        fill: "grayscale.almostBlack",
      },
      "md-black": {
        // 24px
        boxSize: Icon.md.name,
        color: "grayscale.almostBlack",
        fill: "grayscale.almostBlack",
      },
      "lg-black": {
        // 32px
        boxSize: Icon.lg.name,
        color: "grayscale.almostBlack",
        fill: "grayscale.almostBlack",
      },
      "xl-black": {
        // 56px
        boxSize: Icon.xl.name,
        color: "grayscale.almostBlack",
        fill: "grayscale.almostBlack",
      },
    },
    defaultProps: {
      variant: "sm-black",
    },
  },
  // Note: IconButton & Button use the same config
  Button: defineStyleConfig({
    sizes: {
      sm: defineStyle({
        h: IconButton.sm.name,
        w: IconButton.sm.name,
      }),
      md: defineStyle({
        h: IconButton.md.name,
        w: IconButton.md.name,
      }),
      lg: defineStyle({
        h: IconButton.lg.name,
        w: IconButton.lg.name,
      }),
    },
  }),
  Spinner: defineStyleConfig({
    sizes: {
      sm: defineStyle({
        h: Spinner.sm.px,
        w: Spinner.sm.px,
      }),
      md: defineStyle({
        h: Spinner.md.px,
        w: Spinner.md.px,
      }),
      lg: defineStyle({
        h: Spinner.lg.px,
        w: Spinner.lg.px,
      }),
      xl: defineStyle({
        h: Spinner.xl.px,
        w: Spinner.xl.px,
      }),
    },
  }),
  Slider: defineMultiStyleConfig({
    baseStyle: definePartsStyle({
      thumb: {
        _focus: {
          boxShadow: "none",
          outline: "none",
          bg: "grayscale.almostWhite",
        },
        filledTrack: {
          bg: "grayscale.almostWhite",
        },
        track: {
          bg: "grayscale.lightBlack",
        },
      },
    }),
    variants: {
      desktop: definePartsStyle({
        thumb: {
          opacity: 0,
          bg: "grayscale.almostWhite",
        },
        filledTrack: {
          bg: "grayscale.almostWhite",
        },
        track: {
          bg: "grayscale.lightBlack",
        },
      }),
      "mobile-expanded": definePartsStyle({
        thumb: {
          bg: "grayscale.almostWhite",
        },
        filledTrack: {
          bg: "brand.secondary.light",
        },
        track: {
          bg: "grayscale.lightBlack",
        },
      }),
      "mobile-slim": definePartsStyle({
        container: {
          h: "2px",
          pointerEvents: "none",
        },
        thumb: {
          display: "none",
          bg: "grayscale.almostWhite",
        },
        filledTrack: {
          h: "2px",
          bg: "grayscale.almostWhite",
        },
        track: {
          h: "2px",
          bg: "grayscale.lightBlack",
        },
      }),
    },
  }),
};
