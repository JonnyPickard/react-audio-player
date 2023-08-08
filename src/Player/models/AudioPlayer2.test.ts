import { AudioPlayer, Track, TrackDetails } from "./AudioPlayer";

// window.HTMLMediaElement.prototype.load = () => {
//   /* do nothing */
// };
// window.HTMLMediaElement.prototype.play = () => {
//   /* do nothing */
// };
// window.HTMLMediaElement.prototype.pause = () => {
//   /* do nothing */
// };
// window.HTMLMediaElement.prototype.addTextTrack = () => {
//   /* do nothing */
// };

describe("AudioPlayer isPlaying", () => {
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
  });

  test("should return false when no track is playing", () => {
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });

  test("should return true when a track is playing", () => {
    audioPlayer.playTrack(track);
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(true);
  });

  test("should return false when a track is paused", () => {
    audioPlayer.playTrack(track);
    audioPlayer.pauseTrack();
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });

  test("should return false when a track is stopped", () => {
    audioPlayer.playTrack(track);
    audioPlayer.stopLoadedTrack();
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });

  test("should return false after stopping all tracks", () => {
    audioPlayer.playTrack(track);
    audioPlayer.stopAllTracks();
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });

  test("should return true when a track is playing and another track is loaded", () => {
    audioPlayer.playTrack(track);

    // Load another track
    const track2 = audioPlayer.createTrack({
      ...trackDetails,
      url: "test2.mp3",
      title: "Track 2",
    });
    audioPlayer.loadTrack({
      ...trackDetails,
      url: "test2.mp3",
      title: "Track 2",
    });

    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(true);
  });

  test("should return false when a track is paused and another track is loaded", () => {
    audioPlayer.playTrack(track);
    audioPlayer.pauseTrack();

    // Load another track
    const track2 = audioPlayer.createTrack({
      ...trackDetails,
      url: "test2.mp3",
      title: "Track 2",
    });
    audioPlayer.loadTrack({
      ...trackDetails,
      url: "test2.mp3",
      title: "Track 2",
    });

    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });
});
