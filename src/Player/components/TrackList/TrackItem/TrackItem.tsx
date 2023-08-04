import * as React from "react";

import { StyledTrackItem, Spacer } from "./TrackItem.styles";

import { AritstLabel, TitleLabel } from "../../Labels/Labels.styles";

import { BsVolumeUp } from "react-icons/bs";

interface Props {
  artist: string;
  label: string;
  title: string;
  isPlaying?: boolean;
}

export const TrackItem = ({
  artist,
  label,
  title,
  isPlaying = false,
}: Props) => {
  return (
    <StyledTrackItem>
      <Spacer>{isPlaying && <BsVolumeUp />}</Spacer>
      <TitleLabel>{title}</TitleLabel>
      <AritstLabel>
        {artist} ({label})
      </AritstLabel>
    </StyledTrackItem>
  );
};
