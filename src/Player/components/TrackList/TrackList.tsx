import * as React from "react";

import type { Track } from "../../models/player";

import { TrackItem } from "./TrackItem/TrackItem";
import { StyledTrackList } from "./TrackList.styles";

interface TrackList {
  tracks: Track[];
  isPlaying: boolean;
  currentlyLoadedTrack?: Track;
}

export const TrackList = ({
  tracks,
  isPlaying,
  currentlyLoadedTrack,
}: TrackList) => {
  return (
    <StyledTrackList>
      {tracks.map(({ artist, title, label, id }) => {
        const trackIsPlaying =
          isPlaying && currentlyLoadedTrack && currentlyLoadedTrack.id === id;
        return (
          <TrackItem
            isPlaying={trackIsPlaying}
            key={id}
            artist={artist}
            title={title}
            label={label}
          />
        );
      })}
    </StyledTrackList>
  );
};
