import * as howler from "howler";

import { AudioPlayer, TrackDetails } from "./AudioPlayer";

describe("AudioPlayer getTimeRemaining & getTimePlayed", () => {
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
    audioPlayer.loadTrack(trackDetails);
  });

  afterEach(() => {
    audioPlayer.removeAllTracks();
    audioPlayer.stopAllTracks();
    vi.restoreAllMocks();
  });

  test("should return null if no track is loaded", () => {
    expect(audioPlayer.getTimeRemaining()).toBeNull();
  });

  test("should return correct time remaining while playing", () => {
    vi.spyOn(howler.Howl.prototype, "duration").mockReturnValue(300);
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    audioPlayer.playCurrentlyLoadedTrack();

    // Seek to 100 seconds (out of 300 total duration)
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue(100);
    expect(audioPlayer.getTimeRemaining()).toBe(200); // 300 - 100 = 200 seconds remaining
  });

  test("should return correct time remaining after seeking", () => {
    vi.spyOn(howler.Howl.prototype, "duration").mockReturnValue(300);
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    // Seek to 200 seconds (out of 300 total duration)
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue(200);
    expect(audioPlayer.getTimeRemaining()).toBe(100); // 300 - 200 = 100 seconds remaining
  });

  test("should return null if seek time is not a number", () => {
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue({} as howler.Howl);

    expect(audioPlayer.getTimeRemaining()).toBeNull();
  });

  test("getTimePlayed should return null if no track is loaded", () => {
    expect(audioPlayer.getTimePlayed()).toBeNull();
  });

  test("getTimePlayed should return correct time played while playing", () => {
    audioPlayer.playCurrentlyLoadedTrack();

    // Seek to 50 seconds (out of total duration)
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue(50);

    expect(audioPlayer.getTimePlayed()).toBe(50);
  });

  test("should return null if seek time is not a number", () => {
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue({} as howler.Howl);

    expect(audioPlayer.getTimePlayed()).toBeNull();
  });
});
