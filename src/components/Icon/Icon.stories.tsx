import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import * as icons from "./Icons";

const meta: Meta<typeof icons.ChevronDown> = {
  title: "components/Icon",
};

export default meta;
type IconPropsAndCustomArgs = React.ComponentProps<typeof icons.ChevronDown> & {
  iconName: keyof typeof iconList;
};

type Story = StoryObj<IconPropsAndCustomArgs>;

// TODO: Unified location to import this from
const iconList = {
  ChevronDown: icons.ChevronDown,
  ChevronUp: icons.ChevronUp,
  PauseCircle: icons.PauseCircle,
  PlayCircle: icons.PlayCircle,
  Repeat: icons.Repeat,
  SkipBackward: icons.SkipBackward,
  SkipForward: icons.SkipForward,
  StepBackward: icons.StepBackward,
  StepForward: icons.StepForward,
  VolumeHigh: icons.VolumeHigh,
  VolumeLow: icons.VolumeLow,
  VolumeMedium: icons.VolumeMedium,
  VolumeMuted: icons.VolumeMuted,
};

export const Icon: Story = {
  render: ({ iconName }) => {
    const SelectedIcon = iconList[iconName] || iconList.ChevronDown;

    return <SelectedIcon boxSize={20} />;
  },
  parameters: {
    layout: "centered",
  },
  argTypes: {
    iconName: {
      name: "Icon Name",
      options: Object.keys(iconList),
      control: {
        type: "select",
      },
      table: {
        type: { summary: "[Story only] The icon to render" },
        defaultValue: { summary: "ChevronDown" },
      },
    },
  },
};
