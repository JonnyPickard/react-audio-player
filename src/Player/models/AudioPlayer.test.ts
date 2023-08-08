import { Howl } from "howler";
import { Mock } from "vitest";

import { AudioPlayer, TrackDetails } from "./AudioPlayer";

vi.mock("howler");

describe("AudioPlayer", () => {
  let audioPlayer: AudioPlayer;

  beforeEach(() => {
    audioPlayer = new AudioPlayer({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("createTrack should return a valid track", () => {
    const trackDetails: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track",
      label: "Test Label",
    };

    const track = audioPlayer.createTrack(trackDetails);

    expect(track).toHaveProperty("id");
    expect(track).toHaveProperty("howl");
    expect(track).toHaveProperty("title", "Test Track");
    expect(track).toHaveProperty("artist", "Test Artist");
    expect(track).toHaveProperty("label", "Test Label");
    expect(track).toHaveProperty("url", "test_url.mp3");
    expect(track).toHaveProperty("productUrl", "");
    expect(track).toHaveProperty("artworkUrl", "");
    expect(Howl).toHaveBeenCalledWith({
      src: "test_url.mp3",
      onend: expect.any(Function),
    });
  });

  test("loadTrack should create a new track if the URL does not exist", () => {
    const trackDetails: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track",
      label: "Test Label",
    };

    audioPlayer.loadTrack(trackDetails);

    expect(audioPlayer.getTrackList()).toHaveLength(1);
    expect(audioPlayer.getTrackList()[0]).toHaveProperty("url", "test_url.mp3");
  });

  test("loadTrack should not add duplicate existing tracks if the URL already exists", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.loadTrack(trackDetails1);
    audioPlayer.loadTrack(trackDetails2);

    expect(audioPlayer.getTrackList()).toHaveLength(1);
    expect(audioPlayer.getTrackList()[0]).toHaveProperty(
      "title",
      "Test Track 1",
    );
  });

  test("loadTrack should not add multiple tracks if the URLs are unique", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "test_url2.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.loadTrack(trackDetails1);
    audioPlayer.loadTrack(trackDetails2);

    expect(audioPlayer.getTrackList()).toHaveLength(2);
    expect(audioPlayer.getTrackList()[0]).toHaveProperty(
      "title",
      "Test Track 1",
    );
    expect(audioPlayer.getTrackList()[1]).toHaveProperty(
      "title",
      "Test Track 2",
    );
  });

  test("playTrack should return false when no track is playing", () => {
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });

  test("playTrack should return true when a track is playing", () => {
    const trackDetails = {
      artist: "Artist 1",
      url: "test.mp3",
      title: "Track 1",
      label: "Label 1",
    };
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.playTrack(track);
    expect(track.howl.play).toHaveBeenCalled();
    (track.howl.playing as Mock).mockReturnValue(true);
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(true);
  });

  test("removeTrack should remove a track from the playlist", () => {
    const trackDetails: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track",
      label: "Test Label",
    };

    audioPlayer.loadTrack(trackDetails);
    expect(audioPlayer.getTrackList()).toHaveLength(1);

    audioPlayer.removeTrack("test_url.mp3");
    expect(audioPlayer.getTrackList()).toHaveLength(0);
  });

  test("removeTrack should stop the currently loaded track if removed", () => {
    const trackDetails: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track",
      label: "Test Label",
    };

    audioPlayer.loadTrack(trackDetails);
    const mockStop = vi.spyOn(audioPlayer.currentlyLoadedTrack!.howl, "unload");

    audioPlayer.removeTrack("test_url.mp3");
    expect(mockStop).toHaveBeenCalled();
  });

  test("removeTrack should not stop any track if the URL does not match", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "another_url.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.loadTrack(trackDetails1);
    const mockStop = vi.spyOn(audioPlayer.currentlyLoadedTrack!.howl, "stop");

    audioPlayer.removeTrack(trackDetails2.url);
    expect(mockStop).not.toHaveBeenCalled();
  });

  test("nextTrack should play the next track in the playlist", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url1.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "test_url2.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);

    const mockNextTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[1]!.howl,
      "play",
    );

    audioPlayer.nextTrack();
    expect(mockNextTrackPlay).toHaveBeenCalledWith();
    expect(audioPlayer.currentlyLoadedTrack?.url).toBe("test_url2.mp3");
  });

  test("nextTrack should stop the currently loaded track before playing the next one", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url1.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "test_url2.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);
    const mockStop = vi.spyOn(audioPlayer.currentlyLoadedTrack!.howl, "stop");

    audioPlayer.nextTrack();
    expect(mockStop).toHaveBeenCalled();
  });

  test("previousTrack should play the previous track in the playlist", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url1.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "test_url2.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);

    audioPlayer.nextTrack();

    const mockPrevTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[0]!.howl,
      "play",
    );

    audioPlayer.previousTrack();
    expect(mockPrevTrackPlay).toHaveBeenCalledWith();
    expect(audioPlayer.currentlyLoadedTrack?.url).toBe("test_url1.mp3");
  });

  test("previousTrack should stop the currently loaded track before playing the previous one", () => {
    const trackDetails1: TrackDetails = {
      artist: "Test Artist",
      url: "test_url1.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };

    const trackDetails2: TrackDetails = {
      artist: "Test Artist",
      url: "test_url2.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };

    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);
    audioPlayer.nextTrack();

    const mockStop = vi.spyOn(audioPlayer.currentlyLoadedTrack!.howl, "stop");

    audioPlayer.previousTrack();
    expect(mockStop).toHaveBeenCalled();
  });

  test("setOnTrackEndCallback sets the provided callback function", () => {
    // Define the mock callback function
    const mockCallback = vi.fn();

    // Set the callback using the method
    audioPlayer.setOnTrackEndCallback(mockCallback);

    // Call the method and check if the callback was set
    expect(audioPlayer.onTrackEndCallback).toBe(mockCallback);
  });
});
