import type { Meta, StoryObj } from "@storybook/react";

import { PlayCircle } from "../Icon";
import * as IconButtonComponent from "./IconButton";

const meta = {
  title: "components/IconButton",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconButtonComponent.IconButton>;

export default meta;
type Story = StoryObj<typeof IconButtonComponent.IconButton>;

export const IconButton: Story = {
  render: (props) => <IconButtonComponent.IconButton {...props} />,
  args: {
    // TODO: Define size constants for icons/ buttons etc
    icon: <PlayCircle boxSize={8} />,
    "aria-label": "Play Track",
  },
};
