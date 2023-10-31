import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Artist } from "components/organisms/Player/models/Artist";
import { useMemo } from "react";
import { grayscale } from "styles/colors";

interface TrackDetailsTextProps {
  artists: Artist[];
  title: string;
  productUrl: string;
  variant?: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function TrackDetailsText({
  artists,
  title,
  productUrl,
  variant = "desktop",
}: TrackDetailsTextProps) {
  const fontSize = useMemo(() => {
    switch (variant) {
      case "desktop":
        return "xs";
      case "mobile-expanded":
        return "lg";
      default:
        return "sm";
    }
  }, [variant]);

  return (
    <HStack bg="grayscale.almostBlack" gap="0">
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
          <Link
            color="grayscale.almostWhite"
            href={productUrl}
            fontSize={fontSize}
          >
            {title}
          </Link>
        </Box>
        <Box>
          <HStack color="grayscale.darkWhite">
            {artists.map((artist, i, { length }) => {
              const shouldAddComma = length - 1 === i ? "" : ",";
              const artistName = artist.name + shouldAddComma;
              const key = `${artist.name}-${i}`;

              // Note: Ideally all artists would have a link to an artist page
              return artist.url ? (
                <Link
                  key={key}
                  href={artist.url}
                  fontSize={fontSize}
                  _hover={{
                    color: grayscale.almostWhite,
                    textDecoration: "underline",
                  }}
                >
                  {artistName}
                </Link>
              ) : (
                <Text key={key} fontSize={fontSize}>
                  {artistName}
                </Text>
              );
            })}
          </HStack>
        </Box>
      </VStack>
    </HStack>
  );
}
