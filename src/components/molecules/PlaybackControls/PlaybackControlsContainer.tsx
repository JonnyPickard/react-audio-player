// PlaybackControlsContainer
// Note: This is not the finalised way of doing this as ideally state will be
//   centralised/ provided by the Player. This is more of an intermediary step to
//   show how it could eventually work.
import React, { createContext } from "react";

type PlaybackControlsContext = {
  onPlayPress: () => void;
  onStepForwardPress: () => void;
  onStepBackwardPress: () => void;
  canStepForward?: boolean;
  canStepBackward?: boolean;
  trackState: "paused" | "playing" | "loading" | "unloaded";
};

const defaultPlaybackControlsConttext: PlaybackControlsContext = {
  onPlayPress: () => {},
  onStepForwardPress: () => {},
  onStepBackwardPress: () => {},
  canStepForward: false,
  canStepBackward: false,
  trackState: "unloaded",
};

export const PlaybackControlsContext = createContext<PlaybackControlsContext>(
  defaultPlaybackControlsConttext,
);

export const PlaybackControlsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PlaybackControlsContext.Provider value={defaultPlaybackControlsConttext}>
      {children}
    </PlaybackControlsContext.Provider>
  );
};
