import type { Preview } from "@storybook/react";

import { chakraTheme } from "../src/styles/theme";

const preview: Preview = {
  parameters: {
    chakra: {
      theme: chakraTheme,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
