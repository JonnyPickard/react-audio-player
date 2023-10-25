import { Text } from "@chakra-ui/react";

import { formatTime } from "./utils/formatTime";

interface TimestampProps {
  seconds: number;
}

export function Timestamp({ seconds }: TimestampProps) {
  return (
    <Text color="grayscale.darkWhite" fontSize="xxs">
      {formatTime(seconds)}
    </Text>
  );
}
