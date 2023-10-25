import { Flex, HStack, VStack } from "@chakra-ui/react";
import { Timestamp } from "components/atoms/Timestamp";
import { Slider } from "components/molecules/Slider";

const ARIA_LABEL = "Volume slider handle";

interface VolumeSliderProps {
  /* From 0 - 1 (0 meaning muted & 1 being full volume) */
  volume: number;
  onVolumeChange: (value: number) => void;
  isMuted?: boolean;
  toggleMute: (mute: boolean) => void;
}

export function VolumeSlider({
  volume,
  onVolumeChange,
  isMuted,
  toggleMute,
}: VolumeSliderProps) {
  return (
    <Slider
      aria-label={ARIA_LABEL}
      onChange={onVolumeChange}
      value={volume}
      min={0}
      max={1}
    />
  );
}
