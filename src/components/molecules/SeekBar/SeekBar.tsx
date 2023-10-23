// THEMEING
// https://chakra-ui.com/docs/components/slider/theming
import {
  Box,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Artist } from "components/organisms/Player/models/Artist";
import { tokens } from "styles/components/tokens";

interface SeekBarProps {
  onSeek: (timestamp: number) => void;
  // onSeekEnd: (timestamp: number) => void; ?
  // onSeekStart: (timestamp: number) => void; ?
  seekTimestamp: number;
  timePlayed: number;
  timeRemaining: number;
  variant?: "slim" | "expanded";
  display?: "mobile" | "desktop";
}

export function SeekBar({
  onSeek,
  seekTimestamp,
  timePlayed,
  timeRemaining,
  variant,
  display = "desktop",
}: SeekBarProps) {
  return (
    <VStack>
      <h1>Hello from Seekbar!</h1>
      <Slider>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </VStack>
  );
}
