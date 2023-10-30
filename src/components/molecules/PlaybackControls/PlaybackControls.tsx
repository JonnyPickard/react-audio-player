import { useContext } from "react";

import { PlaybackControlsContext } from ".";

export function PlaybackControls() {
  const { variant } = useContext(PlaybackControlsContext);

  switch (variant) {
    case "mobile-slim":
      return <h1>Hello from mobile slim</h1>;
    case "mobile-expanded":
      return <h1>Hello from mobile expanded</h1>;
    default:
      return <h1>Hello from desktop</h1>;
  }
}
