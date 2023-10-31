import { Image, Skeleton } from "@chakra-ui/react";
import { Artwork as ArtworkModel } from "components/organisms/Player/models";
import { useMemo } from "react";

interface ArtworkProps {
  title: string;
  artwork: ArtworkModel;
  variant: "desktop" | "mobile-slim" | "mobile-expanded";
}

export function Artwork({ title, artwork, variant = "desktop" }: ArtworkProps) {
  const artworkVariant = useMemo(() => {
    switch (variant) {
      case "mobile-slim":
        return artwork.sizes.xs;
      case "mobile-expanded":
        return artwork.sizes.lg;
      default:
        return artwork.sizes.sm;
    }
  }, [variant, artwork.sizes]);

  return (
    <Image
      boxSize={`${artworkVariant.px}px`}
      src={artworkVariant.src}
      fallback={
        <Skeleton h={`${artworkVariant.px}px`} w={`${artworkVariant.px}px`} />
      }
      alt={`${title} Artwork`}
      borderRadius={6}
      boxShadow={"1px 1px 5px 0px rgba(0, 0, 0, 0.30)"}
    />
  );
}
