import type { Meta, StoryObj } from "@storybook/react";
import { AllIcons } from "components/atoms/Icon";
import { StoryWrapper } from "styles/decorators";

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
  decorators: [StoryWrapper],
  render: (props) => <IconButton {...props} />,
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      description: "Design system defaults for button + icon size",
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
    hoverAnimation: {
      control: {
        type: "boolean",
      },
      description: "Whether to show the on hover animation",
    },
    isLoading: {
      control: {
        type: "boolean",
      },
      description: "Whether to show the loading spinner",
    },
    "aria-label": {
      control: {
        type: "text",
      },
      description: "Accessible label. Also used for the on hover tooltip",
    },
  },
  args: {
    isLoading: false,
    hoverAnimation: true,
    size: "lg",
    // iconSize: "xl",
    icon: AllIcons.PlayCircle,
    "aria-label": "Play Track",
  },
};
