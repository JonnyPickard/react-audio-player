import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-interactions",
    "@storybook/addon-storysource",
    "@storybook/addon-designs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
  staticDirs: ["../src/assets"],
  viteFinal: async (config) => {
    config.plugins!.push(
      /** @see https://github.com/aleclarson/vite-tsconfig-paths */
      tsconfigPaths({}),
    );
    return config;
  },
};
export default config;
