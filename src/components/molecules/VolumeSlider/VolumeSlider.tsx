import { HStack } from "@chakra-ui/react";
import { IconButton } from "components/molecules/IconButton";
import { Slider } from "components/molecules/Slider";
import { useContext } from "react";

import { VolumeContext } from ".";
import { pickVolumeIcon } from "./utils";

const ARIA_LABEL = "Volume slider handle";

export function VolumeSlider() {
  const {
    volume,
    onVolumeChange,
    toggleMute,
    muted = false,
  } = useContext(VolumeContext);

  return (
    <HStack role="group">
      <IconButton
        aria-label="Mute Track"
        size="md"
        icon={pickVolumeIcon(volume, muted)}
        onClick={() => toggleMute()}
      />
      <Slider
        aria-label={ARIA_LABEL}
        onChange={onVolumeChange}
        value={muted ? 0 : volume}
        step={0.05}
        min={0}
        max={1}
      />
    </HStack>
  );
}
