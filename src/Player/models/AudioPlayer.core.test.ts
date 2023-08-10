import { Howl, Howler } from "howler";
import { Mock, vi } from "vitest";

import { AudioPlayer, TrackDetails } from "./AudioPlayer";

vi.mock("howler");

describe("AudioPlayer", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: TrackDetails;
  let trackDetails1: TrackDetails;
  let trackDetails2: TrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer({});
    trackDetails = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track",
      label: "Test Label",
    };
    trackDetails1 = {
      artist: "Test Artist",
      url: "test_url.mp3",
      title: "Test Track 1",
      label: "Test Label",
    };
    trackDetails2 = {
      artist: "Test Artist",
      url: "test_url2.mp3",
      title: "Test Track 2",
      label: "Test Label",
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("createTrack should return a valid track", () => {
    const track = audioPlayer.createTrack(trackDetails);

    expect(track).toMatchObject({
      ...trackDetails,
      productUrl: "",
      artworkUrl: "",
      howl: expect.any(Howl),
    });
  });

  test("muteTrack should call Howler.mute with the provided value", async () => {
    audioPlayer.toggleMute(true);
    expect(Howler.mute).toHaveBeenCalledWith(true);

    audioPlayer.toggleMute(false);
    expect(Howler.mute).toHaveBeenCalledWith(false);
  });

  test("loadTrack should create a new track if the URL does not exist", () => {
    audioPlayer.loadTrack(trackDetails);

    const trackList = audioPlayer.getTrackList();
    expect(trackList).toHaveLength(1);
    expect(trackList[0]).toMatchObject(trackDetails);
  });

  test("loadTrack should not add duplicate existing tracks if the URL already exists", () => {
    audioPlayer.loadTrack(trackDetails);
    audioPlayer.loadTrack(trackDetails1);

    expect(audioPlayer.getTrackList()).toHaveLength(1);
    expect(audioPlayer.getTrackList()[0]).toMatchObject(trackDetails);
  });

  test("loadTrack should not add multiple tracks if the URLs are unique", () => {
    audioPlayer.loadTrack(trackDetails1);
    audioPlayer.loadTrack(trackDetails2);

    expect(audioPlayer.getTrackList()).toHaveLength(2);
    expect(audioPlayer.getTrackList()[0]).toMatchObject(trackDetails1);
    expect(audioPlayer.getTrackList()[1]).toMatchObject(trackDetails2);
  });

  test("playTrack should return false when no track is playing", () => {
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(false);
  });

  test("playTrack should return true when a track is playing", () => {
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.playTrack(track);
    expect(track.howl.play).toHaveBeenCalled();
    (track.howl.playing as Mock).mockReturnValue(true);
    const isCurrentlyPlaying = audioPlayer.isPlaying();
    expect(isCurrentlyPlaying).toBe(true);
  });

  test("removeTrack should remove a track from the playlist", () => {
    audioPlayer.loadTrack(trackDetails);
    expect(audioPlayer.getTrackList()).toHaveLength(1);

    audioPlayer.removeTrack(trackDetails.url);
    expect(audioPlayer.getTrackList()).toHaveLength(0);
  });

  test("removeTrack should stop the currently loaded track if removed", () => {
    audioPlayer.loadTrack(trackDetails);
    const mockStop = vi.spyOn(audioPlayer.loadedTrack!.howl, "unload");

    audioPlayer.removeTrack(trackDetails.url);
    expect(mockStop).toHaveBeenCalled();
  });

  test("removeTrack should not stop any track if the URL does not match", () => {
    audioPlayer.loadTrack(trackDetails1);
    const mockStop = vi.spyOn(audioPlayer.loadedTrack!.howl, "stop");

    audioPlayer.removeTrack(trackDetails2.url);
    expect(mockStop).not.toHaveBeenCalled();
  });

  test("nextTrack should play the next track in the playlist", () => {
    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);

    const mockNextTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[1]!.howl,
      "play",
    );

    audioPlayer.nextTrack();
    expect(mockNextTrackPlay).toHaveBeenCalled();
    expect(audioPlayer.loadedTrack?.url).toBe(trackDetails2.url);
  });

  test("nextTrack should stop the currently loaded track before playing the next one", () => {
    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);
    const mockStop = vi.spyOn(audioPlayer.loadedTrack!.howl, "stop");

    audioPlayer.nextTrack();
    expect(mockStop).toHaveBeenCalled();
  });

  test("previousTrack should play the previous track in the playlist", () => {
    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);

    audioPlayer.nextTrack();

    const mockPrevTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[0]!.howl,
      "play",
    );

    audioPlayer.previousTrack();
    expect(mockPrevTrackPlay).toHaveBeenCalled();
    expect(audioPlayer.loadedTrack?.url).toBe(trackDetails1.url);
  });

  test("previousTrack should play the same track in the playlist if it's the first track", () => {
    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);

    const mockPrevTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[0]!.howl,
      "play",
    );

    audioPlayer.previousTrack();
    expect(mockPrevTrackPlay).toHaveBeenCalled();
    expect(audioPlayer.loadedTrack?.url).toBe(trackDetails1.url);
  });

  test("previousTrack should stop the currently loaded track before playing the previous one", () => {
    audioPlayer.addMultipleTracks([trackDetails1, trackDetails2]);
    audioPlayer.nextTrack();

    const mockStop = vi.spyOn(audioPlayer.loadedTrack!.howl, "stop");

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

  // test("onTrackEndCallBack defaults to a void function", () => {
  //   expectTypeOf(audioPlayer.onTrackEndCallback).returns.toBeVoid();
  // });

  test("playCurrentlyLoadedTrack should play the currently loaded track", () => {
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.loadedTrack = track;
    const playMock = vi.spyOn(Howl.prototype, "play");

    audioPlayer.playCurrentlyLoadedTrack();

    expect(playMock).toHaveBeenCalled();
    playMock.mockRestore();
  });

  test("playCurrentlyLoadedTrack should not play if no track is loaded", () => {
    const playMock = vi.spyOn(Howl.prototype, "play");

    audioPlayer.playCurrentlyLoadedTrack();

    expect(playMock).not.toHaveBeenCalled();
    playMock.mockRestore();
  });

  test("pauseTrack should pause the currently loaded track", () => {
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.loadedTrack = track;
    const pauseMock = vi.spyOn(Howl.prototype, "pause");

    audioPlayer.pauseTrack();

    expect(pauseMock).toHaveBeenCalled();
    pauseMock.mockRestore();
  });

  test("pauseTrack should not pause if no track is loaded", () => {
    const pauseMock = vi.spyOn(Howl.prototype, "pause");

    audioPlayer.pauseTrack();

    expect(pauseMock).not.toHaveBeenCalled();
    pauseMock.mockRestore();
  });

  test("seek should change the current playback position", () => {
    vi.spyOn(Howl.prototype, "state").mockImplementationOnce(() => "loaded");
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.loadedTrack = track;

    const seekPosition = 30; // Seek to 30 seconds
    const mockSeek = vi.spyOn(Howl.prototype, "seek");

    audioPlayer.seek(seekPosition);

    expect(mockSeek).toHaveBeenCalledWith(seekPosition);
    mockSeek.mockRestore();
  });

  test("seek should not change the playback position if no track is loaded", () => {
    const mockSeek = vi.spyOn(Howl.prototype, "seek");

    audioPlayer.seek(30);

    expect(mockSeek).not.toHaveBeenCalled();
    mockSeek.mockRestore();
  });
});
