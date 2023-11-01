import { create } from "@storybook/theming/create";

import textLogo from "../src/assets/text-logo.svg";

export default create({
  base: "dark",
  brandTitle: "React Audio Player",
  brandUrl: "https://github.com/JonnyPickard/react-audio-player",
  brandImage: textLogo,
  brandTarget: "_self",
});
