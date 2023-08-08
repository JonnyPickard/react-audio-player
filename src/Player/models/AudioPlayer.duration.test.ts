import { Howl } from "howler";
import { Mock } from "vitest";

import { AudioPlayerError } from "../constants/errors";
import { AudioPlayer, Track, TrackDetails } from "./AudioPlayer";

vi.mock("howler");

class MockHowl {
  loaded: string;
  constructor({ loaded }: { loaded: string }) {
    this.loaded = loaded;
  }
  duration() {
    return 123; // Mock duration value for testing
  }
  play() {}
  on() {}
  off() {}
  once() {}
  state() {
    return this.loaded; // Mock state value for testing
  }
}

describe("AudioPlayer getDurationAsync", () => {
  let audioPlayer: AudioPlayer;
  let track: Track;
  let trackDetails: TrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer({});
    trackDetails = {
      artist: "Artist 1",
      url: "test.mp3",
      title: "Track 1",
      label: "Label 1",
    };
    track = audioPlayer.createTrack(trackDetails);
  });

  afterEach(() => {
    audioPlayer.removeAllTracks();
    audioPlayer.stopAllTracks();
    vi.clearAllMocks();
  });

  test("should return track duration if the track is loaded", async () => {
    (Howl as Mock).mockImplementation(() => new MockHowl({ loaded: "loaded" }));
    audioPlayer.loadTrack(trackDetails);

    const duration = await audioPlayer.getDurationAsync();

    expect(duration).toBe(123);
  });

  test("should return track duration if the track is already loaded", async () => {
    (Howl as Mock).mockImplementation(() => new MockHowl({ loaded: "loaded" }));
    audioPlayer.playTrack(track);

    const duration = await audioPlayer.getDurationAsync();

    expect(duration).toBe(123);
  });

  test("should reject with an error if no track is loaded", async () => {
    (Howl as Mock).mockImplementation(
      () => new MockHowl({ loaded: "unloaded" }),
    );
    await expect(audioPlayer.getDurationAsync()).rejects.toThrowError(
      AudioPlayerError.NO_TRACK_LOADED,
    );
  });
});
