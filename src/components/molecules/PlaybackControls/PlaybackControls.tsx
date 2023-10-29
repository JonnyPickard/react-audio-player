interface PlaybackControlsProps {
  onPlayPress: () => void;
  onStepForwardPress: () => void;
  onStepBackwardPress: () => void;
  canStepForward?: boolean;
  canStepBackward?: boolean;
  trackState: "paused" | "playing" | "loading" | "unloaded";
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function PlaybackControls({
  // canStepBackward = false,
  // canStepForward = false,
  variant = "desktop",
}: PlaybackControlsProps) {
  switch (variant) {
    case "mobile-slim":
      return <h1>Hello from mobile slim</h1>;
    case "mobile-expanded":
      return <h1>Hello from mobile expanded</h1>;
    default:
      return <h1>Hello from desktop</h1>;
  }
}
