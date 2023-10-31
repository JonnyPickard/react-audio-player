import { Box, Flex } from "@chakra-ui/react";
import { Artwork } from "components/atoms/Artwork";
import {
  Artist,
  Artwork as ArtworkModel,
} from "components/organisms/Player/models";

import { TrackDetailsText } from ".";

interface TrackDetailsExpandedProps {
  artists: Artist[];
  title: string;
  artwork: ArtworkModel;
  productUrl: string;
  variant: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function TrackDetailsExpanded({
  artists,
  title,
  artwork,
  productUrl,
  variant = "desktop",
}: TrackDetailsExpandedProps) {
  return (
    <Box>
      <Flex align={"center"} justify="center">
        <Artwork variant={variant} title={title} artwork={artwork} />
      </Flex>
      <TrackDetailsText
        artists={artists}
        title={title}
        productUrl={productUrl}
        variant={variant}
      />
    </Box>
  );
}
