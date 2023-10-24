import { Box, Stack, Text } from "@chakra-ui/react";
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
  return variant === "mobile-slim" ? (
    <Slider variant={variant} />
  ) : (
    <Stack direction={variant === "mobile-expanded" ? "column" : "row"}>
      <Text>{timePlayed}</Text>
      <Slider variant={variant} />
      <Text>{timeRemaining}</Text>
    </Stack>
  );
}
