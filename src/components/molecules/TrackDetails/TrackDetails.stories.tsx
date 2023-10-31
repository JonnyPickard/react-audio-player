import { config } from "@storybook/addon-designs";
import type { Meta, StoryObj } from "@storybook/react";
import { testTrack1 } from "mocks/fixtures/test-tracks";

import { TrackDetails } from "./TrackDetails";

const meta = {
  title: "components/TrackDetails",
} satisfies Meta<typeof TrackDetails>;

export default meta;
type Story = StoryObj<typeof TrackDetails>;

export const TrackDetailsStory: Story = {
  name: "TrackDetails",
  render: (props) => <TrackDetails {...props} />,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      table: {
        type: { summary: "PlaybackControls variant" },
        defaultValue: { summary: "desktop" },
      },
      options: ["desktop", "mobile-slim", "mobile-expanded"],
    },
  },
  args: {
    variant: "desktop",
    artists: testTrack1.artists,
    title: testTrack1.title,
    artworkUrl: testTrack1.artworkUrl,
    productUrl: testTrack1.productUrl,
  },
  parameters: {
    design: config([
      {
        type: "figma",
        url: "https://www.figma.com/file/HfIFZ2xe4LJgyCSk08SL8I/Player?type=design&node-id=61%3A181&mode=design&t=WK89mzXD1kcI4erK-1",
      },
    ]),
  },
};
