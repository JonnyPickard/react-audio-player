import { Stack } from "@chakra-ui/react";
import { Artwork } from "components/atoms/Artwork";
import {
  Artist,
  Artwork as ArtworkModel,
} from "components/organisms/Player/models";

import { TrackDetailsText } from ".";

interface TrackDetailsProps {
  artists: Artist[];
  title: string;
  artwork: ArtworkModel;
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
  return (
    <Stack direction={variant === "mobile-expanded" ? "column" : "row"} gap="0">
      <Artwork variant={variant} title={title} artwork={artwork} />
      <TrackDetailsText
        artists={artists}
        title={title}
        productUrl={productUrl}
        variant={variant}
      />
    </Stack>
  );
}
