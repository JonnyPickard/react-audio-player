import * as React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { VolumeControlsContainer } from "./Volume.styles";
import { Button, ICON_NAMES } from "../../../SharedComponents/Button/Button";
import {
  displayWhite,
  notActiveGrey,
} from "../../../constants/globalStyleVariables";

interface Props {
  handleVolumeChange: (volume: number) => void;
  handleToggleMute: () => void;
  currentVolume: number;
  isMuted: boolean;
}

export function Volume({
  handleVolumeChange,
  handleToggleMute,
  currentVolume,
  isMuted = false,
}: Props) {
  return (
    <VolumeControlsContainer>
      <Button
        onClick={handleToggleMute}
        icon={
          isMuted ? ICON_NAMES.HiOutlineVolumeOff : ICON_NAMES.HiOutlineVolumeUp
        }
      />
      <Slider
        tabIndex={-1}
        onChange={handleVolumeChange}
        min={0}
        max={100}
        ariaLabelForHandle="Volume slider"
        style={{
          display: "flex",
          margin: "0px 10px",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "200px",
        }}
        handleStyle={{
          border: "none",
          height: 11,
          width: 11,
          top: "50%",
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
        dotStyle={{
          backgroundColor: displayWhite,
          height: "2px",
          width: "2px",
        }}
        value={currentVolume}
      />
    </VolumeControlsContainer>
  );
}
