import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { StoryWrapper } from "styles/decorators";

import { VolumeSlider, VolumeSliderContainer } from ".";

const meta = {
  title: "components/VolumeSlider",
} satisfies Meta<typeof VolumeSliderContainer>;

export default meta;
type Story = StoryObj<typeof VolumeSliderContainer>;

export const VolumeSliderContainerStory: Story = {
  name: "VolumeSlider",
  decorators: [
    StoryWrapper,
    (Story) => (
      <VolumeSliderContainer>
        <Story />
      </VolumeSliderContainer>
    ),
  ],
  render: () => <VolumeSlider />,
  parameters: {
    design: config([
      {
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=171%3A162&mode=design&t=WK89mzXD1kcI4erK-1",
      },
    ]),
  },
};
