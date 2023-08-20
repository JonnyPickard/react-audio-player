import * as howler from "howler";

import { AudioPlayerError } from "../constants/errors";
import { AudioPlayer, NewTrackDetails } from "./AudioPlayer";

describe("AudioPlayer getSelectedTrackDurationAsync", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: NewTrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer();
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

    audioPlayer.addTrackToTrackList(trackDetails, { selectTrack: true });

    const duration = await audioPlayer.getSelectedTrackDurationAsync();

    expect(duration).toBe(123);
  });

  test("should reject with an error if no selectedTrack", async () => {
    await expect(
      audioPlayer.getSelectedTrackDurationAsync(),
    ).rejects.toThrowError(
      AudioPlayerError.getSelectedTrackDurationAsync.NO_TRACK_LOADED,
    );
  });

  test("should reject with an error if tracks internal state is not loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(
      () => "unloaded",
    );
    audioPlayer.addTrackToTrackList(trackDetails, { selectTrack: true });

    expect(audioPlayer.getSelectedTrackDurationAsync()).rejects.toThrowError(
      AudioPlayerError.getSelectedTrackDurationAsync.LOAD_TRACK_FAILURE,
    );
    audioPlayer.selectedTrack!.howl._emit("loaderror");
  });

  test("should resolve with duration if tracks internal state becomes loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(
      () => "unloaded",
    );
    vi.spyOn(howler.Howl.prototype, "duration").mockImplementation(() => 123);
    audioPlayer.addTrackToTrackList(trackDetails, { selectTrack: true });

    expect(audioPlayer.getSelectedTrackDurationAsync()).resolves.toEqual(123);
    audioPlayer.selectedTrack!.howl._emit("load");
  });
});
