import type { Meta, StoryObj } from "@storybook/react";

import { AllIcons } from "../../atoms/Icon";
import { IconButton } from "./IconButton";

const meta = {
  title: "components/IconButton",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const IconButtonStory: Story = {
  name: "IconButton",
  render: (props) => <IconButton {...props} />,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    icon: {
      options: AllIcons,
      control: {
        type: "select",
      },
      table: {
        type: { summary: "Name of the icon to render" },
        defaultValue: { summary: "ChevronDown" },
      },
    },
  },
  args: {
    size: "md",
    icon: AllIcons.PlayCircle,
    "aria-label": "Play Track",
  },
};
