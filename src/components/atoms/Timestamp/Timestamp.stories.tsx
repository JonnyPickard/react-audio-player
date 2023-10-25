import { Flex } from "@chakra-ui/react";
import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";

import { Timestamp } from "./Timestamp";

const meta = {
  title: "components/Timestamp",
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof Timestamp>;

export const TimestampStory: Story = {
  name: "Timestamp",
  render: (props) => (
    /* 
    Note: I made a container wrapper due to some quirks with SB background colors 
      that I don't want to prioritise at present.  
    */
    <Flex bg="grayscale.almostBlack" padding="2" borderRadius={6}>
      <Timestamp {...props} />
    </Flex>
  ),

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
