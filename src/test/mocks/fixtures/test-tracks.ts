import bonoboArtworkSrcLg from "assets/test-tracks/album-artwork-bonobo-lg.png";
import bonoboArtworkSrcSm from "assets/test-tracks/album-artwork-bonobo-sm.png";
import bonoboArtworkSrcXs from "assets/test-tracks/album-artwork-bonobo-xs.png";
import polaAndBrysonArtworkSrcLg from "assets/test-tracks/album-artwork-pola-and-bryson-lg.png";
import polaAndBrysonArtworkSrcSm from "assets/test-tracks/album-artwork-pola-and-bryson-sm.png";
import polaAndBrysonArtworkSrcXs from "assets/test-tracks/album-artwork-pola-and-bryson-xs.png";
import breaks from "assets/test-tracks/breaks.mp3";
import techno from "assets/test-tracks/techno.mp3";

const productUrl = "#";

export const testTrack1 = {
  url: breaks,
  title:
    "Friend - Really long track title to show how overflowing text gets handled. Extra characters, Extra characters, Extra characters.",
  label: "Shogun Audio",
  artists: [
    { name: "Pola & Bryson", url: "#pola-and-bryson" },
    { name: "Ruth Royal" },
  ],
  artwork: {
    src: polaAndBrysonArtworkSrcXs,
    srcSet: `${polaAndBrysonArtworkSrcXs}, ${polaAndBrysonArtworkSrcSm}, ${polaAndBrysonArtworkSrcLg}`,
  },
  productUrl: "#friend",
};

export const testTrack2 = {
  url: techno,
  title: "Cirrus",
  label: "Ninja Tune",
  artists: [{ name: "Bonobo", url: "#bonobo" }],
  artwork: {
    src: bonoboArtworkSrcXs,
    srcSet: `${bonoboArtworkSrcXs}, ${bonoboArtworkSrcSm}, ${bonoboArtworkSrcLg}`,
  },
  productUrl: "#cirrus",
};

export const testTrack3 = {
  url: techno,
  title: "Test Track 2",
  label: "Label 2",
  artists: [{ name: "Test Artist3" }],
  artwork: {
    src: bonoboArtworkSrcXs,
    srcSet: `${bonoboArtworkSrcXs}, ${bonoboArtworkSrcSm}, ${bonoboArtworkSrcLg}`,
  },
  productUrl,
};
