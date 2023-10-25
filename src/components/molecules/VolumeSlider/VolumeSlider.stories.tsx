import { Box } from "@chakra-ui/react";
import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";

import { VolumeSlider } from "./VolumeSlider";

const meta = {
  title: "components/VolumeSlider",
} satisfies Meta<typeof VolumeSlider>;

export default meta;
type Story = StoryObj<typeof VolumeSlider>;

export const VolumeSliderStory: Story = {
  name: "VolumeSlider",
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
      <VolumeSlider {...props} />
    </Box>
  ),
  args: {},
  parameters: {
    design: config([
      {
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=171%3A162&mode=design&t=WK89mzXD1kcI4erK-1",
      },
    ]),
  },
};
