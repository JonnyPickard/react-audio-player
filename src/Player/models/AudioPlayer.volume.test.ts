import { AudioPlayer, TrackDetails } from "./AudioPlayer";

describe("AudioPlayer getVolume", () => {
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
    audioPlayer.createTrack(trackDetails);
  });

  afterEach(() => {
    audioPlayer.removeAllTracks();
    audioPlayer.stopAllTracks();
  });

  test("should return the initial volume", () => {
    const initialVolume = audioPlayer.getVolume();
    expect(initialVolume).toBe(1);
  });

  test("should return the current volume after setting", () => {
    const newVolume = 0.5;
    audioPlayer.setVolume(newVolume);
    const currentVolume = audioPlayer.getVolume();
    expect(currentVolume).toBe(newVolume);
  });

  test("should return the updated volume after setting multiple times", () => {
    const volume1 = 0.3;
    const volume2 = 0.7;

    audioPlayer.setVolume(volume1);
    const currentVolume1 = audioPlayer.getVolume();
    expect(currentVolume1).toBe(volume1);

    audioPlayer.setVolume(volume2);
    const currentVolume2 = audioPlayer.getVolume();
    expect(currentVolume2).toBe(volume2);
  });

  test("should clamp volume to lower bound of 0 after setting to an invalid negative value", () => {
    const expectedVolume = 0;

    // Set an invalid volume
    audioPlayer.setVolume(-1.5);

    const currentVolume = audioPlayer.getVolume();
    expect(currentVolume).toBe(expectedVolume);
  });

  test("should clamp volume to higher bound of 1 after setting to an invalid value above 1", () => {
    const expectedVolume = 1;

    // Set a volume above 1
    audioPlayer.setVolume(1.5);

    const currentVolume = audioPlayer.getVolume();
    expect(currentVolume).toBe(expectedVolume);
  });
});
