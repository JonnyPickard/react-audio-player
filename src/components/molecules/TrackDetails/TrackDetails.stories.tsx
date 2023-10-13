import type { Meta, StoryObj } from "@storybook/react";
import { testTrack1 } from "mocks/fixtures/test-tracks";

import { TrackDetails } from "./TrackDetails";

const meta = {
  title: "components/TrackDetails",
  tags: ["autodocs"],
} satisfies Meta<typeof TrackDetails>;

export default meta;
type Story = StoryObj<typeof TrackDetails>;

export const TrackDetailsStory: Story = {
  name: "TrackDetails",
  render: (props) => <TrackDetails {...props} />,
  args: {
    artists: testTrack1.artists,
    title: testTrack1.title,
    artworkUrl: testTrack1.artworkUrl,
    productUrl: testTrack1.productUrl,
  },
};
