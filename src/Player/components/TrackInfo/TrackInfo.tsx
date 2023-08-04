import * as React from "react";
import * as styles from "./TrackInfo.styles";
import { Button } from "../../../SharedComponents/Button/Button";
import { AritstLabel, TitleLabel } from "../Labels/Labels.styles";

interface Props {
  title: string;
  artist: string;
  toggleSlimPlayer: () => void;
  isSlimPlayer: boolean;
  artworkUrl?: string;
  productUrl?: string;
}

export const TrackInfo = ({
  title,
  artist,
  artworkUrl,
  toggleSlimPlayer,
  isSlimPlayer,
  productUrl,
}: Props) => {
  return (
    <div css={[styles.trackInfo, isSlimPlayer && styles.trackInfoSlim]}>
      <a
        css={styles.trackInfoAnchorImage}
        href={productUrl}
        title="Go to product"
      >
        <img
          css={[styles.trackInfoImg, !artworkUrl && styles.trackInfoLogo]}
          alt="Album artwork - Vinyl Record"
          src={
            (artworkUrl && artworkUrl.replace("_300x", "_100x")) ||
            "https://cdn.shopify.com/s/files/1/0922/5304/t/41/assets/icon-logo-white.svg?v=11523088302575865531"
          }
        />
      </a>
      <a
        href={productUrl}
        title="Go to product"
        css={[
          styles.infoTextContainer,
          !title && styles.infoTextContainerNothingPlaying,
          styles.trackInfoAnchor,
        ]}
      >
        <TitleLabel
          isSlimPlayer={isSlimPlayer}
          aria-label={title || "Nothing playing yet"}
          id="player-currently-playing-title"
        >
          {title || "Nothing playing yet"}
        </TitleLabel>
        <AritstLabel
          isSlimPlayer={isSlimPlayer}
          id="player-currently-playing-artist"
          aria-label={artist || "Unknown artist"}
        >
          {artist || "Unknown artist"}
        </AritstLabel>
      </a>
      <div
        css={[styles.toggleSlimPlayerCaret, isSlimPlayer && styles.hideElement]}
      >
        <Button icon="AiFillCaretRight" onClick={toggleSlimPlayer}></Button>
      </div>
    </div>
  );
};
