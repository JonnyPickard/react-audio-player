import { useContext } from "react";

import { PlaybackControlsContext } from ".";

interface PlaybackControlsProps {
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function PlaybackControls({
  variant = "desktop",
}: PlaybackControlsProps) {
  const { onPlayPress } = useContext(PlaybackControlsContext);

  switch (variant) {
    case "mobile-slim":
      return <h1>Hello from mobile slim</h1>;
    case "mobile-expanded":
      return <h1>Hello from mobile expanded</h1>;
    default:
      return <h1>Hello from desktop</h1>;
  }
}
