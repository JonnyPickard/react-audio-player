import * as howler from "howler";

import { AudioPlayerError } from "../constants/errors";
import { AudioPlayer, NewTrackDetails } from "./AudioPlayer";

describe("AudioPlayer getDurationAsync", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: NewTrackDetails;

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

    audioPlayer.addTrackToTrackList(trackDetails, true);

    const duration = await audioPlayer.getDurationAsync();

    expect(duration).toBe(123);
  });

  test("should reject with an error if no selectedTrack", async () => {
    await expect(audioPlayer.getDurationAsync()).rejects.toThrowError(
      AudioPlayerError.NO_TRACK_LOADED,
    );
  });

  test("should reject with an error if tracks internal state is not loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(
      () => "unloaded",
    );
    audioPlayer.addTrackToTrackList(trackDetails, true);

    expect(audioPlayer.getDurationAsync()).rejects.toThrowError(
      AudioPlayerError.LOAD_TRACK_FAILURE,
    );
    audioPlayer.selectedTrack!.howl._emit("loaderror");
  });

  test("should resolve with duration if tracks internal state becomes loaded", async () => {
    vi.spyOn(howler.Howl.prototype, "state").mockImplementation(
      () => "unloaded",
    );
    vi.spyOn(howler.Howl.prototype, "duration").mockImplementation(() => 123);
    audioPlayer.addTrackToTrackList(trackDetails, true);

    expect(audioPlayer.getDurationAsync()).resolves.toEqual(123);
    audioPlayer.selectedTrack!.howl._emit("load");
  });

  test("seekToTimestamp should change the current playback position", () => {
    vi.spyOn(Howl.prototype, "state").mockImplementationOnce(() => "loaded");
    vi.spyOn(Howl.prototype, "seek").mockReturnValue(40);
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.selectedTrack = track;

    const seekPosition = 30; // Seek to 30 seconds
    const mockSeek = vi.spyOn(Howl.prototype, "seek");

    audioPlayer.seekToTimestamp(seekPosition);

    expect(mockSeek).toHaveBeenCalledWith(seekPosition);
    mockSeek.mockRestore();
  });

  test("seekToTimestamp should not change the playback position if no track is loaded", () => {
    const mockSeek = vi.spyOn(Howl.prototype, "seek");

    audioPlayer.seekToTimestamp(30);

    expect(mockSeek).not.toHaveBeenCalled();
    mockSeek.mockRestore();
  });

  test("seekToTimestamp should return null if seek doesn't return a number", () => {
    vi.spyOn(Howl.prototype, "state").mockImplementationOnce(() => "loaded");
    const mockSeek = vi
      .spyOn(Howl.prototype, "seek")
      .mockReturnValue({} as Howl);
    audioPlayer.seekToTimestamp(30);

    expect(mockSeek).not.toHaveBeenCalled();
    mockSeek.mockRestore();
  });
});
