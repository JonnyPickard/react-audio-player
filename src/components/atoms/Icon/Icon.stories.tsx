import { Flex } from "@chakra-ui/react";
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
  render: (props) => (
    /* 
      Note: I made a container wrapper due to some quirks with SB background colors 
        that I don't want to prioritise at present.  
    */
    <Flex
      bg={
        props.color === "white"
          ? "grayscale.almostBlack"
          : "grayscale.almostWhite"
      }
      borderRadius={6}
      w={"50vw"}
      h={"50vh"}
      align={"center"}
      justify={"center"}
    >
      <Icon {...props} />
    </Flex>
  ),
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
