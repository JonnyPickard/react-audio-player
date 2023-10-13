import {
  Box,
  HStack,
  Image,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Artist } from "components/organisms/Player/models/Artist";
import { tokens } from "styles/components/tokens";

interface TrackDetailsProps {
  artists: Artist[];
  title: string;
  artworkUrl: string;
  productUrl: string;
  variant?: "slim" | "expanded";
  display?: "mobile" | "desktop";
}

export function TrackDetails({
  artists,
  title,
  artworkUrl,
  productUrl,
  display = "desktop",
}: TrackDetailsProps) {
  const fontSize = display === "desktop" ? "sm" : "xs";
  const imageSize = tokens.Image[display].name;

  return (
    <HStack bg="grayscale.almostBlack" gap="0">
      <Image
        boxSize={imageSize}
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
          <Link href={productUrl} fontSize={fontSize}>
            {title}
          </Link>
        </Box>
        <Box>
          <HStack>
            {artists.map((artist, i, { length }) => {
              const shouldAddComma = length - 1 === i ? "" : ",";
              const artistName = artist.name + shouldAddComma;
              const key = `${artist.name}-${i}`;

              // Note: Ideally all artists would have a link to an artist page
              return artist.url ? (
                <Link key={key} href={artist.url} fontSize={fontSize}>
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
