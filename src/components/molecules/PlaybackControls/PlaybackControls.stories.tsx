import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { StoryWrapper } from "styles/decorators";

import { PlaybackControls, PlaybackControlsContainer } from ".";

const meta = {
  title: "components/PlaybackControls",
} satisfies Meta<typeof PlaybackControls>;

export default meta;
type Story = StoryObj<typeof PlaybackControls>;

export const PlaybackControlsStory: Story = {
  name: "PlaybackControls",
  decorators: [
    StoryWrapper,
    (Story) => (
      <PlaybackControlsContainer>
        <Story />
      </PlaybackControlsContainer>
    ),
  ],
  render: (props) => <PlaybackControls {...props} />,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      table: {
        type: { summary: "Slider variant" },
        defaultValue: { summary: "desktop" },
      },
      options: ["desktop", "mobile-slim", "mobile-expanded"],
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
