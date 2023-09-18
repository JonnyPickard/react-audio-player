import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

const meta = {
  title: "IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
