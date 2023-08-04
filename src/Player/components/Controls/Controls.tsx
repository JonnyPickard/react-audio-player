import * as React from "react";

import { ControlsContainer } from "./Controls.styles";
import { Button } from "../../../SharedComponents/Button/Button";

interface Props {
  trackIsLoaded: boolean;
  isPlaying: boolean;

  onPlayClick: () => void;
  onPauseClick: () => void;

  onStepForwardClick: () => void;
  onStepBackwardClick: () => void;

  canStepForward?: boolean;
}

export function Controls({
  trackIsLoaded,
  canStepForward,
  isPlaying,
  onPlayClick,
  onPauseClick,
  onStepBackwardClick,
  onStepForwardClick,
}: Props) {
  return (
    <ControlsContainer>
      <Button
        disabled={!trackIsLoaded}
        icon="AiFillStepBackward"
        onClick={onStepBackwardClick}
      />
      <Button
        disabled={!trackIsLoaded}
        onClick={isPlaying ? onPauseClick : onPlayClick}
        icon={isPlaying ? "AiFillPauseCircle" : "AiFillPlayCircle"}
      />
      <Button
        disabled={!canStepForward}
        icon="AiFillStepForward"
        onClick={onStepForwardClick}
      />
    </ControlsContainer>
  );
}
