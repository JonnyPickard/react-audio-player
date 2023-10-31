import { Box } from "@chakra-ui/react";
import {
  Artist,
  Artwork as ArtworkModel,
} from "components/organisms/Player/models";

import { TrackDetailsExpanded, TrackDetailsSlim } from ".";

interface TrackDetailsProps {
  artists: Artist[];
  title: string;
  artwork: ArtworkModel;
  productUrl: string;
  variant: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function TrackDetails({
  variant = "desktop",
  ...props
}: TrackDetailsProps) {
  return (
    <Box overflow="hidden">
      {variant === "mobile-expanded" ? (
        <TrackDetailsExpanded variant={variant} {...props} />
      ) : (
        <TrackDetailsSlim variant={variant} {...props} />
      )}
    </Box>
  );
}
