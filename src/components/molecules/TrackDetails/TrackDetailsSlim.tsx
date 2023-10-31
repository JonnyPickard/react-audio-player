import { HStack } from "@chakra-ui/react";
import { Artwork } from "components/atoms/Artwork";
import {
  Artist,
  Artwork as ArtworkModel,
} from "components/organisms/Player/models";

import { TrackDetailsText } from ".";

interface TrackDetailsSlimProps {
  artists: Artist[];
  title: string;
  artwork: ArtworkModel;
  productUrl: string;
  variant: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function TrackDetailsSlim({
  artists,
  title,
  artwork,
  productUrl,
  variant = "desktop",
}: TrackDetailsSlimProps) {
  return (
    <HStack gap="0">
      <Artwork variant={variant} title={title} artwork={artwork} />
      <TrackDetailsText
        artists={artists}
        title={title}
        productUrl={productUrl}
        variant={variant}
      />
    </HStack>
  );
}
