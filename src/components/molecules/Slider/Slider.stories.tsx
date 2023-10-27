import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { StoryWrapper } from "styles/decorators";

import { Slider } from "./Slider";

const meta = {
  title: "components/Slider",
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const SliderStory: Story = {
  name: "Slider",
  decorators: [StoryWrapper],
  render: (props) => <Slider {...props} />,
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
  parameters: {
    design: config([
      {
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=30%3A46&mode=design&t=WK89mzXD1kcI4erK-1",
      },
    ]),
  },
};
