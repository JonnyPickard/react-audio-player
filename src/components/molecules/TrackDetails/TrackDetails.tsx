import { Box, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { tokens } from "styles/components/tokens";

interface TrackDetailsProps {
  artist: string;
  title: string;
  artworkUrl: string;
  productUrl: string;
  variant?: "slim" | "expanded";
  display?: "mobile" | "desktop";
}

export function TrackDetails({
  artist,
  title,
  artworkUrl,
  // productUrl,
  // variant = "slim",
  display = "desktop",
}: TrackDetailsProps) {
  const fontSize = display === "desktop" ? "sm" : "xs";

  return (
    <HStack bg="grayscale.almostBlack" gap="0">
      <Image
        boxSize={tokens.Image[display].name}
        src={artworkUrl}
        fallback={<Skeleton />}
        alt={`${title} Artwork`}
      />
      <VStack
        mr="1"
        ml="1"
        pl="2"
        pr="2"
        position="relative"
        align="start"
        gap="0"
        overflow="hidden"
        whiteSpace="nowrap"
        _before={{
          content: "''",
          w: "2",
          h: "100%",
          position: "absolute",
          left: 0,
          bgGradient: `linear(\
            to-r,\
            grayscale.almostBlack 0%,\
            grayscaleAlpha.almostBlack.500 80%,\
            grayscaleAlpha.almostBlack.100 90%,\
            grayscaleAlpha.almostBlack.0 100%\
          )`,
        }}
        _after={{
          content: "''",
          w: "2",
          h: "100%",
          right: 0,
          position: "absolute",
          bgGradient: `linear(\
            to-l,\
            grayscale.almostBlack 0%,\
            grayscaleAlpha.almostBlack.500 80%,\
            grayscaleAlpha.almostBlack.100 90%,\
            grayscaleAlpha.almostBlack.0 100%\
          )`,
        }}
      >
        <Box>
          <Text fontSize={fontSize}>{title}</Text>
        </Box>
        <Box>
          <Text fontSize={fontSize}>{artist}</Text>
        </Box>
      </VStack>
    </HStack>
  );
}
