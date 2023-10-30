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
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
};

export const PlaybackControlsContext = createContext<PlaybackControlsContext>({
  onPlayPress: () => {},
  onStepForwardPress: () => {},
  onStepBackwardPress: () => {},
  canStepForward: false,
  canStepBackward: false,
  trackState: "unloaded",
});

interface PlaybackControlsContainerProps extends PlaybackControlsContext {
  children: React.ReactNode;
}

export const PlaybackControlsContainer = ({
  trackState = "unloaded",
  variant = "desktop",
  children,
  ...props
}: PlaybackControlsContainerProps) => {
  return (
    <PlaybackControlsContext.Provider value={{ trackState, variant, ...props }}>
      {children}
    </PlaybackControlsContext.Provider>
  );
};
