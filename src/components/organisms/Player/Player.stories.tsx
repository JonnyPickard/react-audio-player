import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "components/Player",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const PlayerStory: Story = {
  name: "Player",
  render: () => <h1>Smoke test story to check figma integration</h1>,
  parameters: {
    design: config([
      {
        name: "Desktop Player",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Components?type=design&node-id=26%3A905&mode=design&t=LbvwWMAYpDrexPcz-1",
      },
    ]),
  },
};
