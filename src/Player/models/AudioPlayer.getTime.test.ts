import { Howl } from "howler";
import { Mock } from "vitest";

import { AudioPlayer, Track, TrackDetails } from "./AudioPlayer";

class MockHowl {
  duration() {
    return 300; // Mock duration value for testing (in seconds)
  }
  on() {}
  off() {}
  seek() {}
  play() {}
  state() {
    return "loaded"; // Mock state value for testing
  }
}

vi.mock("howler");

describe("AudioPlayer getTimeRemaining & getTimePlayed", () => {
  let audioPlayer: AudioPlayer;
  let track: Track;
  let trackDetails: TrackDetails;

  beforeEach(() => {
    (Howl as Mock).mockImplementation(() => new MockHowl());
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

  test("should return null if no track is loaded", () => {
    const timeRemaining = audioPlayer.getTimeRemaining();
    expect(timeRemaining).toBeNull();
  });

  test("should return correct time remaining while playing", () => {
    audioPlayer.playTrack(track);

    // Seek to 100 seconds (out of 300 total duration)
    const seekMock = vi.spyOn(MockHowl.prototype, "seek").mockReturnValue(100);
    const timeRemaining = audioPlayer.getTimeRemaining();

    expect(timeRemaining).toBe(200); // 300 - 100 = 200 seconds remaining

    seekMock.mockRestore(); // Restore the original method
  });

  test("should return correct time remaining after seeking", () => {
    audioPlayer.playTrack(track);

    // Seek to 200 seconds (out of 300 total duration)
    const seekMock = vi.spyOn(MockHowl.prototype, "seek").mockReturnValue(200);
    const timeRemaining = audioPlayer.getTimeRemaining();

    expect(timeRemaining).toBe(100); // 300 - 200 = 100 seconds remaining

    seekMock.mockRestore(); // Restore the original method
  });

  test("should return null if seek time is not a number", () => {
    const invalidSeekMock = vi
      .spyOn(MockHowl.prototype, "seek")
      .mockReturnValue(null);
    const timeRemaining = audioPlayer.getTimeRemaining();

    expect(timeRemaining).toBeNull();

    invalidSeekMock.mockRestore(); // Restore the original method
  });

  test("should return null if no track is loaded", () => {
    const timePlayed = audioPlayer.getTimePlayed();
    expect(timePlayed).toBeNull();
  });

  test("should return correct time played while playing", () => {
    audioPlayer.playTrack(track);

    // Seek to 50 seconds (out of total duration)
    const seekMock = vi.spyOn(MockHowl.prototype, "seek").mockReturnValue(50);
    const timePlayed = audioPlayer.getTimePlayed();

    expect(timePlayed).toBe(50);

    seekMock.mockRestore(); // Restore the original method
  });

  test("should return null if seek time is not a number", () => {
    const invalidSeekMock = vi
      .spyOn(MockHowl.prototype, "seek")
      .mockReturnValue(null);
    const timePlayed = audioPlayer.getTimePlayed();

    expect(timePlayed).toBeNull();

    invalidSeekMock.mockRestore(); // Restore the original method
  });
});
