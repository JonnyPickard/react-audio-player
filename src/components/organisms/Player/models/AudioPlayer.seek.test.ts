import { Howl } from "howler";
import { testTrack1 } from "mocks/fixtures/test-tracks";
import { vi } from "vitest";

import { AudioPlayer, NewTrackDetails } from "./AudioPlayer";

describe("AudioPlayer Seek", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: NewTrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer();
    trackDetails = testTrack1;
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

    audioPlayer.seekToTimestampForSelectedTrack(seekPosition);

    expect(mockSeek).toHaveBeenCalledWith(seekPosition);
    mockSeek.mockRestore();
  });

  test("seekToTimestamp should not change the playback position if no track is loaded", () => {
    const mockSeek = vi.spyOn(Howl.prototype, "seek");

    audioPlayer.seekToTimestampForSelectedTrack(30);

    expect(mockSeek).not.toHaveBeenCalled();
    mockSeek.mockRestore();
  });

  test("seekToTimestamp should return null if seek doesn't return a number", () => {
    vi.spyOn(Howl.prototype, "state").mockImplementationOnce(() => "loaded");
    const mockSeek = vi
      .spyOn(Howl.prototype, "seek")
      .mockReturnValueOnce({} as Howl);
    audioPlayer.seekToTimestampForSelectedTrack(30);

    expect(mockSeek).not.toHaveBeenCalled();
    mockSeek.mockRestore();
  });
});
