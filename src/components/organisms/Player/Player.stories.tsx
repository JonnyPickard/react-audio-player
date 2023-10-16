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
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=26-905&mode=design&t=BWPrJpGpcDVOOA33-4",
      },
      {
        name: "Mobile Player - Slim",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=43-128&mode=design&t=BWPrJpGpcDVOOA33-4",
      },
      {
        name: "Mobile Player - Expanded",
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=70-257&mode=design&t=BWPrJpGpcDVOOA33-4",
      },
    ]),
  },
};
