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
    design: config({
      name: "Wireframe",
      type: "figma",
      url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Components?type=design&node-id=17-3&mode=design&t=c6HbDEqO4hPvLdQu-0",
    }),
  },
};
