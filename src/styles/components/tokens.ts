// Harcoded list of chakra token values used to create component variants
// Customised component styles overview: https://chakra-ui.com/docs/styled-system/component-style

// Base font size = 16px;
// name: the chakra sizing name selector
// Table of [name: number]: rem, px found here:
// https://chakra-ui-git-fix-typescript-autocomplete.chakra-ui.vercel.app/docs/theming/theme#spacing

export const tokens = {
  IconButton: {
    sm: { px: "32px", rem: "2rem", name: "8" },
    md: { px: "48px", rem: "3rem", name: "12" },
    lg: { px: "56px", rem: "3.5rem", name: "14" },
  },
  Icon: {
    sm: { px: "16px", rem: "1rem", name: "4" },
    md: { px: "24px", rem: "1.5rem", name: "6" },
    lg: { px: "32px", rem: "2rem", name: "8" },
    xl: { px: "56px", rem: "3.5rem", name: "14" },
  },
  Spinner: {
    // Note: these are based on the outer path size of circular icons
    sm: { px: "12px" },
    md: { px: "18px" },
    lg: { px: "24px" },
    xl: { px: "42px" },
  },
  Text: {
    xxs: { px: "11px", rem: "0.688rem" },
    xs: { px: "13px", rem: "0.813rem" },
    sm: { px: "14px", rem: "0.875rem" },
    md: { px: "16px", rem: "1rem" },
    lg: { px: "24px", rem: "1.5rem" },
  },
  Image: {
    "mobile-slim": { rem: "2.5rem", name: "10" },
    "mobile-expanded": { rem: "28rem", name: "md" },
    desktop: { rem: "3.5rem", name: "14" },
  },
};
