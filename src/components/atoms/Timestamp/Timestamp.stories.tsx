import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { StoryWrapper } from "styles/decorators";

import { Timestamp } from "./Timestamp";

const meta = {
  title: "components/Timestamp",
  parameters: {
    fitContent: true,
    layout: "centered",
  },
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof Timestamp>;

export const TimestampStory: Story = {
  name: "Timestamp",
  decorators: [StoryWrapper],
  render: (props) => <Timestamp {...props} />,

  args: {
    seconds: 65,
  },
  parameters: {
    design: config([
      {
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=70%3A459&mode=design&t=akaIWXRZHYdSwJit-1",
      },
    ]),
  },
};
