// Harcoded list of chakra token values used to create component variants

// Base font size = 16px;
// name: the chakra sizing name selector
// Table of [name: number]: rem, px found here:
// https://chakra-ui-git-fix-typescript-autocomplete.chakra-ui.vercel.app/docs/theming/theme#spacing

export const constants = {
  IconButton: {
    sm: { px: 32, rem: 2, name: "8" },
    md: { px: 48, rem: 3, name: "12" },
    lg: { px: 56, rem: 3.5, name: "14" },
  },
  Icon: {
    sm: { px: 16, rem: 1, name: "4" },
    md: { px: 24, rem: 1.5, name: "6" },
    lg: { px: 32, rem: 2, name: "8" },
  },
};
