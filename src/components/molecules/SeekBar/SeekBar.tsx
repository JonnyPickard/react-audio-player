import { Flex, HStack, VStack } from "@chakra-ui/react";
import { Timestamp } from "components/atoms/Timestamp";
import { Slider } from "components/molecules/Slider";

const ARIA_LABEL = "Seek bar slider handle";

interface SeekBarProps {
  onSeek: (timestamp: number) => void;
  onSeekEnd: (timestamp: number) => void;
  onSeekStart: (timestamp: number) => void;
  /* Time in seconds */
  playbackPosition: number;
  timePlayed: number;
  timeRemaining: number;
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function SeekBar({
  onSeek: onChange,
  onSeekEnd: onChangeEnd,
  onSeekStart: onChangeStart,
  playbackPosition: value,
  timePlayed,
  timeRemaining,
  variant = "desktop",
}: SeekBarProps) {
  const controlProps = { onChange, onChangeEnd, onChangeStart, value };

  switch (variant) {
    case "mobile-slim":
      return (
        <Slider aria-label={ARIA_LABEL} variant={variant} {...controlProps} />
      );
    case "mobile-expanded":
      return (
        <VStack>
          <Slider aria-label={ARIA_LABEL} variant={variant} {...controlProps} />
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
          <Slider aria-label={ARIA_LABEL} variant={variant} {...controlProps} />
          <Timestamp seconds={timeRemaining} />
        </HStack>
      );
  }
}
