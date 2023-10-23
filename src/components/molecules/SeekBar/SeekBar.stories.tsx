import type { Meta, StoryObj } from "@storybook/react";
import { testTrack1 } from "mocks/fixtures/test-tracks";

import { SeekBar } from "./SeekBar";

const meta = {
  title: "components/SeekBar",
  tags: ["autodocs"],
} satisfies Meta<typeof SeekBar>;

export default meta;
type Story = StoryObj<typeof SeekBar>;

export const SeekBarStory: Story = {
  name: "SeekBar",
  render: (props) => <SeekBar {...props} />,
  argTypes: {
    display: {
      options: ["mobile", "desktop"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    display: "desktop",
  },
};
