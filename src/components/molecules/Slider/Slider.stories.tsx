import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./Slider";

const meta = {
  title: "components/Slider",
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const SliderStory: Story = {
  name: "Slider",
  render: (props) => (
    /* 
    Note: I made a container wrapper due to some quirks with SB background colors 
      that I don't want to prioritise at present.  
    */
    <Box
      bg="grayscale.almostBlack"
      padding="2"
      color="white"
      borderRadius={6}
      w="100%"
    >
      <Slider {...props} />
    </Box>
  ),
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      table: {
        type: { summary: "Slider variant" },
        defaultValue: { summary: "desktop" },
      },
      options: ["desktop", "mobile-slim", "mobile-expanded"],
    },
  },
  args: {
    variant: "desktop",
  },
};
