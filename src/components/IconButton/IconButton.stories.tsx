import type { Meta, StoryObj } from "@storybook/react";

import { PlayCircle } from "../Icon";
import * as IconButtonComponent from "./IconButton";

const meta = {
  title: "components/IconButton",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconButtonComponent.IconButton>;

export default meta;
type Story = StoryObj<typeof IconButtonComponent.IconButton>;

export const IconButton: Story = {
  render: (props) => <IconButtonComponent.IconButton {...props} />,
  args: {
    customIcon: "PlayCircle",
    // TODO: Define size constants for icons/ buttons etc
    // icon: PlayCircle,
    // icon: <PlayCircle />,
    "aria-label": "Play Track",
  },
};
