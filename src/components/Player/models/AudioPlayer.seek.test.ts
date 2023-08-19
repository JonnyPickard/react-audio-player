import { Howl } from "howler";
import { vi } from "vitest";

import { AudioPlayer, NewTrackDetails } from "./AudioPlayer";

describe("AudioPlayer Seek", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: NewTrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer();
    trackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track",
      label: "Test Label",
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("seekToTimestamp should change the current playback position", () => {
    vi.spyOn(Howl.prototype, "state").mockImplementationOnce(() => "loaded");
    vi.spyOn(Howl.prototype, "seek").mockReturnValueOnce(40);
    const track = audioPlayer["createTrack"](trackDetails);
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
      .mockReturnValueOnce({} as Howl);
    audioPlayer.seekToTimestamp(30);

    expect(mockSeek).not.toHaveBeenCalled();
    mockSeek.mockRestore();
  });
});
