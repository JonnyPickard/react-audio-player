import * as howler from "howler";
import { testTrack1 } from "mocks/fixtures/test-tracks";

import { AudioPlayer, NewTrackDetails } from "./AudioPlayer";

describe("AudioPlayer getSelectedTrackTimeRemaining & getSelectedTrackTimePlayed", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: NewTrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer();
    trackDetails = testTrack1;
    audioPlayer.addTrackToTrackList(trackDetails, { selectTrack: true });
  });

  afterEach(() => {
    audioPlayer.removeAllTracks();
    audioPlayer.stopAllTracks();
    vi.restoreAllMocks();
  });

  test("should return null if no selectedTrack", () => {
    expect(audioPlayer.getSelectedTrackTimeRemaining()).toBeNull();
  });

  test("should return correct time remaining while playing", () => {
    vi.spyOn(howler.Howl.prototype, "duration").mockReturnValue(300);
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    audioPlayer.playSelectedTrack();

    // Seek to 100 seconds (out of 300 total duration)
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue(100);
    expect(audioPlayer.getSelectedTrackTimeRemaining()).toBe(200); // 300 - 100 = 200 seconds remaining
  });

  test("should return correct time remaining after seeking", () => {
    vi.spyOn(howler.Howl.prototype, "duration").mockReturnValue(300);
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    // Seek to 200 seconds (out of 300 total duration)
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue(200);
    expect(audioPlayer.getSelectedTrackTimeRemaining()).toBe(100); // 300 - 200 = 100 seconds remaining
  });

  test("should return null if seek time is not a number", () => {
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue({} as howler.Howl);

    expect(audioPlayer.getSelectedTrackTimeRemaining()).toBeNull();
  });

  test("getSelectedTrackTimePlayed should return null if no selectedTrack", () => {
    expect(audioPlayer.getSelectedTrackTimePlayed()).toBeNull();
  });

  test("getSelectedTrackTimePlayed should return correct time played while playing", () => {
    audioPlayer.playSelectedTrack();

    // Seek to 50 seconds (out of total duration)
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue(50);

    expect(audioPlayer.getSelectedTrackTimePlayed()).toBe(50);
  });

  test("should return null if seek time is not a number", () => {
    vi.spyOn(howler.Howl.prototype, "state").mockReturnValue("loaded");
    vi.spyOn(howler.Howl.prototype, "seek").mockReturnValue({} as howler.Howl);

    expect(audioPlayer.getSelectedTrackTimePlayed()).toBeNull();
  });
});
