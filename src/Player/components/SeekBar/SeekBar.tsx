import * as React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { SeekBarContainer } from "./SeekBar.styles";
import { formatTime } from "../../utils/formatTime";

import {
  TimeDisplayLabel,
  TimeDisplayContainer,
} from "../Labels/Labels.styles";

import {
  displayWhite,
  notActiveGrey,
} from "../../../constants/globalStyleVariables";

interface Props {
  onSeek: (seekTo: number) => void;
  onSeekEnd: (seekTo: number) => void;
  // onSeekStart: (seekTo: number) => void;
  timePlayed: number;
  timeRemaining: number;
  value: number;
  duration: number;
}

export const SeekBar = ({
  onSeek,
  onSeekEnd,
  timePlayed,
  timeRemaining,
  duration,
  value = 0,
}: Props) => {
  return (
    <SeekBarContainer>
      <TimeDisplayContainer>
        <TimeDisplayLabel>{formatTime(timePlayed)}</TimeDisplayLabel>
      </TimeDisplayContainer>
      <Slider
        tabIndex={-1}
        ariaLabelForHandle="Seekbar slider handle"
        onChange={onSeek}
        onAfterChange={onSeekEnd}
        max={duration}
        style={{
          margin: "0 20px",
        }}
        handleStyle={{
          marginTop: "-7px",
          border: "2px solid white",
          height: 20,
          width: 20,
        }}
        trackStyle={{
          height: "4px",
          backgroundColor: displayWhite,
        }}
        railStyle={{
          backgroundColor: notActiveGrey,
          height: "4px",
          cursor: "pointer",
        }}
        value={value}
      />
      <TimeDisplayContainer>
        <TimeDisplayLabel>{formatTime(timeRemaining)}</TimeDisplayLabel>
      </TimeDisplayContainer>
    </SeekBarContainer>
  );
};
