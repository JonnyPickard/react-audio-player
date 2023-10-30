import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { StoryWrapper } from "styles/decorators";

import { PlaybackControls, PlaybackControlsContainer } from ".";

const meta = {
  title: "components/PlaybackControls",
} satisfies Meta<typeof PlaybackControlsContainer>;

export default meta;
type Story = StoryObj<typeof PlaybackControlsContainer>;

export const PlaybackControlsStory: Story = {
  name: "PlaybackControls",
  decorators: [StoryWrapper],
  render: (props) => (
    <PlaybackControlsContainer {...props}>
      <PlaybackControls />
    </PlaybackControlsContainer>
  ),
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
    trackState: {
      control: {
        type: "select",
      },
      table: {
        type: { summary: "PlaybackControls track state" },
        defaultValue: { summary: "unloaded" },
      },
      options: ["paused", "playing", "loading", "unloaded"],
    },
  },
  args: {
    variant: "desktop",
  },
  parameters: {
    design: config([
      {
        name: "Desktop",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=233%3A249&mode=design&t=3168O6yfRcymwPON-1",
      },
      {
        name: "Mobile - Slim",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=233%3A240&mode=design&t=3168O6yfRcymwPON-1",
      },
      {
        name: "Mobile - Expanded",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=233%3A1820&mode=design&t=3168O6yfRcymwPON-1",
      },
    ]),
  },
};
