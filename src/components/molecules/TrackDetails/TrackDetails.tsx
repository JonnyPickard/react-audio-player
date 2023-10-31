import { HStack, Image, Skeleton } from "@chakra-ui/react";
import {
  Artist,
  Image as PlayerImage,
} from "components/organisms/Player/models";
import { tokens } from "styles/components/tokens";

import { TrackDetailsText } from ".";

interface TrackDetailsProps {
  artists: Artist[];
  title: string;
  artwork: PlayerImage;
  productUrl: string;
  variant: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function TrackDetails({
  artists,
  title,
  artwork,
  productUrl,
  variant = "desktop",
}: TrackDetailsProps) {
  const imageSize = tokens.Image[variant].name;

  return (
    <HStack bg="grayscale.almostBlack" gap="0">
      <Image
        boxSize={imageSize}
        src={artwork.src}
        fallback={<Skeleton h={imageSize} w={imageSize} />}
        alt={`${title} Artwork`}
      />
      <TrackDetailsText
        artists={artists}
        title={title}
        productUrl={productUrl}
        variant={variant}
      />
    </HStack>
  );
}
