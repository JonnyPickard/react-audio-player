import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { AllIcons, Icon } from ".";

const meta: Meta<typeof Icon> = {
  title: "components/Icon",
};

export default meta;
type IconPropsAndCustomArgs = React.ComponentProps<typeof Icon>;

type Story = StoryObj<IconPropsAndCustomArgs>;

export const IconStory: Story = {
  name: "Icon",
  render: (props) => {
    return <Icon {...props} />;
  },
  parameters: {
    layout: "centered",
  },
  args: {
    icon: "ChevronDown",
    size: "sm",
  },
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
};
