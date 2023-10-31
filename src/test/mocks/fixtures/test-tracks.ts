import bonoboArtworkSrcXs from "assets/test-tracks/album-artwork-bonobo-40w.png";
import bonoboArtworkSrcSm from "assets/test-tracks/album-artwork-bonobo-56w.png";
import bonoboArtworkSrcLg from "assets/test-tracks/album-artwork-bonobo-420w.png";
import polaAndBrysonArtworkSrcXs from "assets/test-tracks/album-artwork-pola-and-bryson-40w.png";
import polaAndBrysonArtworkSrcSm from "assets/test-tracks/album-artwork-pola-and-bryson-56w.png";
import polaAndBrysonArtworkSrcLg from "assets/test-tracks/album-artwork-pola-and-bryson-420w.png";
import breaks from "assets/test-tracks/breaks.mp3";
import techno from "assets/test-tracks/techno.mp3";

const productUrl = "#";

export const testTrack1 = {
  url: breaks,
  productUrl: "#friend",
  title:
    "Friend - Really long track title to show how overflowing text gets handled. Extra characters, Extra characters, Extra characters.",
  label: "Shogun Audio",
  artists: [
    { name: "Pola & Bryson", url: "#pola-and-bryson" },
    { name: "Ruth Royal" },
  ],
  artwork: {
    src: polaAndBrysonArtworkSrcXs,
    px: 40,
    sizes: {
      xs: {
        src: polaAndBrysonArtworkSrcXs,
        px: 40,
      },
      sm: {
        src: polaAndBrysonArtworkSrcSm,
        px: 56,
      },
      lg: {
        src: polaAndBrysonArtworkSrcLg,
        px: 420,
      },
    },
  },
};

export const testTrack2 = {
  url: techno,
  productUrl: "#cirrus",
  title: "Cirrus",
  label: "Ninja Tune",
  artists: [{ name: "Bonobo", url: "#bonobo" }],
  artwork: {
    src: bonoboArtworkSrcXs,
    px: 40,
    sizes: {
      xs: {
        src: bonoboArtworkSrcXs,
        px: 40,
      },
      sm: {
        src: bonoboArtworkSrcSm,
        px: 56,
      },
      lg: {
        src: bonoboArtworkSrcLg,
        px: 420,
      },
    },
  },
};

export const testTrack3 = {
  url: techno,
  productUrl,
  title: "Test Track 2",
  label: "Label 2",
  artists: [{ name: "Test Artist3" }],
  artwork: {
    src: bonoboArtworkSrcXs,
    px: 40,
    sizes: {
      xs: {
        src: bonoboArtworkSrcXs,
        px: 40,
      },
      sm: {
        src: bonoboArtworkSrcSm,
        px: 56,
      },
      lg: {
        src: bonoboArtworkSrcLg,
        px: 420,
      },
    },
  },
};
