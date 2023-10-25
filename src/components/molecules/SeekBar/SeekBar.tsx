import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { Timestamp } from "components/atoms/Timestamp";
import { Slider } from "components/molecules/Slider";

interface SeekBarProps {
  onSeek: (timestamp: number) => void;
  // onSeekEnd: (timestamp: number) => void; ?
  // onSeekStart: (timestamp: number) => void; ?
  /* Time in seconds */
  playbackPosition: number;
  timePlayed: number;
  timeRemaining: number;
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function SeekBar({
  onSeek,
  playbackPosition,
  timePlayed,
  timeRemaining,
  variant = "desktop",
}: SeekBarProps) {
  switch (variant) {
    case "mobile-slim":
      return <Slider variant={variant} />;
    case "mobile-expanded":
      return (
        <VStack>
          <Slider variant={variant} />
          <Flex justify="space-between" w="100%" align="center">
            <Timestamp seconds={timePlayed} />
            <Timestamp seconds={timeRemaining} />
          </Flex>
        </VStack>
      );
    default:
      return (
        <HStack>
          <Timestamp seconds={timePlayed} />
          <Slider variant={variant} />
          <Timestamp seconds={timeRemaining} />
        </HStack>
      );
  }
}
