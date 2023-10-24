import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Slider } from "components/molecules/Slider";

interface SeekBarProps {
  onSeek: (timestamp: number) => void;
  // onSeekEnd: (timestamp: number) => void; ?
  // onSeekStart: (timestamp: number) => void; ?
  seekTimestamp: number;
  timePlayed: number;
  timeRemaining: number;
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function SeekBar({
  onSeek,
  seekTimestamp,
  timePlayed,
  timeRemaining,
  variant = "desktop",
}: SeekBarProps) {
  return (
    <VStack>
      <h1>Hello from Seekbar!</h1>
      <Slider variant={variant} />
    </VStack>
  );
}
