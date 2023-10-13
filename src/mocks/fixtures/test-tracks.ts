import artworkUrl from "assets/test-tracks/dnb-radio.jpeg";
import techno from "assets/test-tracks/techno.mp3";

const productUrl = "#";

export const testTrack1 = {
  url: techno,
  title:
    "Test Track 1 super duper long track title super duper long track title super duper long track title",
  label: "Label 1",
  artists: [{ name: "Test Artist 1", url: "#" }, { name: "Test Artist 2" }],
  artworkUrl,
  productUrl,
};

export const testTrack2 = {
  url: techno,
  title: "Test Track 2",
  label: "Label 2",
  artists: [{ name: "Test Artist 2" }],
  artworkUrl,
  productUrl,
};

export const testTrack3 = {
  url: techno,
  title: "Test Track 2",
  label: "Label 2",
  artists: [{ name: "Test Artist3" }],
  artworkUrl,
  productUrl,
};
