import { Box } from "@chakra-ui/react";
import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";

import { SeekBar } from "./SeekBar";

const meta = {
  title: "components/SeekBar",
} satisfies Meta<typeof SeekBar>;

export default meta;
type Story = StoryObj<typeof SeekBar>;

export const SeekBarStory: Story = {
  name: "SeekBar",
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
      <SeekBar {...props} />
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
    timePlayed: 0,
    timeRemaining: 100,
  },
  parameters: {
    design: config([
      {
        name: "Desktop",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=146%3A164&mode=design&t=P6Bw2Y6LAfzIZPNN-1",
      },
      {
        name: "Mobile - Slim",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=61%3A242&mode=design&t=P6Bw2Y6LAfzIZPNN-1",
      },
      {
        name: "Mobile - Expanded",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=146%3A163&mode=design&t=P6Bw2Y6LAfzIZPNN-1",
      },
    ]),
  },
};
