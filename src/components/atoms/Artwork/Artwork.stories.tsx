import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { testTrack2 } from "mocks/fixtures/test-tracks";
import { StoryWrapper } from "styles/decorators";

import { Artwork } from "./Artwork";

const meta = {
  title: "components/Artwork",
} satisfies Meta<typeof Artwork>;

export default meta;
type Story = StoryObj<typeof Artwork>;

export const ArtworkStory: Story = {
  name: "Artwork",
  decorators: [StoryWrapper],
  render: (props) => <Artwork {...props} />,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      table: {
        type: { summary: "PlaybackControls variant" },
        defaultValue: { summary: "desktop" },
      },
      options: ["desktop", "mobile-slim", "mobile-expanded"],
    },
  },
  args: {
    variant: "desktop",
    title: testTrack2.title,
    artwork: testTrack2.artwork,
  },
  parameters: {
    design: config([
      {
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=61-188&mode=design&t=NVDL7kKQiTkEUGoF-4",
      },
    ]),
  },
};
