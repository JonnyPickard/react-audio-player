import { AllIcons } from "components/atoms/Icon";
import { IconButton } from "components/molecules/IconButton";
import { useContext } from "react";

import { PlaybackControlsContext } from ".";

export function PlaybackControls() {
  const { variant } = useContext(PlaybackControlsContext);

  switch (variant) {
    case "mobile-slim":
      return <IconButton icon={AllIcons.Play} aria-label="Play" />;
    case "mobile-expanded":
      return <h1>Hello from mobile expanded</h1>;
    default:
      return <h1>Hello from desktop</h1>;
  }
}
