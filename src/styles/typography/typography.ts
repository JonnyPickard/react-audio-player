import { tokens } from "styles/components/tokens";

// Has to adhere to this structure:
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/foundations/typography.ts
export const typography = {
  baseStyle: {
    color: "grayscale.almostBlack",
  },
  fonts: {
    heading: "Noto Sans, sans-serif",
    body: "Noto Sans, sans-serif",
  },
  fontSizes: {
    xxs: tokens.Text.xxs.rem,
    xs: tokens.Text.xs.rem,
    sm: tokens.Text.sm.rem,
    md: tokens.Text.md.rem,
    lg: tokens.Text.lg.rem,
  },
};
