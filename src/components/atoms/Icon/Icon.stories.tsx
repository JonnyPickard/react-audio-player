import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { StoryWrapperIcon } from "styles/decorators";

import { AllIcons, Icon } from ".";

const meta: Meta<typeof Icon> = {
  title: "components/Icon",
};

export default meta;
type IconPropsAndCustomArgs = React.ComponentProps<typeof Icon>;

type Story = StoryObj<IconPropsAndCustomArgs>;

export const IconStory: Story = {
  name: "Icon",
  decorators: [StoryWrapperIcon],
  render: (props) => <Icon {...props} />,
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "ChevronDown",
    size: "xl",
    color: "black",
    hoverAnimation: true,
  },
  argTypes: {
    color: {
      options: ["black", "white"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["sm", "md", "lg", "xl"],
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
};
