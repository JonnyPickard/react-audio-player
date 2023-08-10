import * as howler from "howler";

import { AudioPlayerError } from "../constants/errors";
import { AudioPlayer, TrackDetails } from "./AudioPlayer";

describe("AudioPlayer getDurationAsync", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: TrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer({});
    trackDetails = {
      artist: "Artist 1",
      url: "test.mp3",
      title: "Track 1",
      label: "Label 1",
    };
  });

  afterEach(() => {
    audioPlayer.removeAllTracks();
    audioPlayer.stopAllTracks();
    vi.restoreAllMocks();
  });

  test("should return track duration if the track is loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(() => "loaded");
    vi.spyOn(howler.Howl.prototype, "duration").mockImplementation(() => 123);

    audioPlayer.loadTrack(trackDetails);

    const duration = await audioPlayer.getDurationAsync();

    expect(duration).toBe(123);
  });

  test("should reject with an error if no track is loaded", async () => {
    await expect(audioPlayer.getDurationAsync()).rejects.toThrowError(
      AudioPlayerError.NO_TRACK_LOADED,
    );
  });

  test("should reject with an error if tracks internal state is not loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(
      () => "unloaded",
    );
    audioPlayer.loadTrack(trackDetails);

    expect(audioPlayer.getDurationAsync()).rejects.toThrowError(
      AudioPlayerError.LOAD_TRACK_FAILURE,
    );
    audioPlayer.loadedTrack!.howl._emit("loaderror");
  });

  test("should resolve with duration if tracks internal state becomes loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(
      () => "unloaded",
    );
    vi.spyOn(howler.Howl.prototype, "duration").mockImplementation(() => 123);
    audioPlayer.loadTrack(trackDetails);

    expect(audioPlayer.getDurationAsync()).resolves.toEqual(123);
    audioPlayer.loadedTrack!.howl._emit("load");
  });
});
