import type { Meta, StoryObj } from "@storybook/react";

import { Timestamp } from "./Timestamp";

const meta = {
  title: "components/Timestamp",
  tags: ["autodocs"],
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof Timestamp>;

export const TimestampStory: Story = {
  name: "Timestamp",
  render: (props) => <Timestamp {...props} />,
  args: {
    seconds: 65,
  },
};
