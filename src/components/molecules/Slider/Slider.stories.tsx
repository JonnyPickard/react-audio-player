import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./Slider";

const meta = {
  title: "components/Slider",
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const SliderStory: Story = {
  name: "Slider",
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
};
