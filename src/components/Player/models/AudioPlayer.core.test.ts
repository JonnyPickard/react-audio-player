import { Howl, Howler } from "howler";
import { Mock, vi } from "vitest";

import { AudioPlayer, NewTrackDetails } from "./AudioPlayer";

vi.mock("howler");

describe("AudioPlayer", () => {
  let audioPlayer: AudioPlayer;
  let trackDetails: NewTrackDetails;
  let trackDetails1: NewTrackDetails;
  let trackDetails2: NewTrackDetails;

  beforeEach(() => {
    audioPlayer = new AudioPlayer();
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
    audioPlayer.mute(true);
    expect(Howler.mute).toHaveBeenCalledWith(true);

    audioPlayer.mute(false);
    expect(Howler.mute).toHaveBeenCalledWith(false);
  });

  test("loadTrack should create a new AudioTrack, add it trackList & set it as the selectedTrack", () => {
    const track = audioPlayer.addTrackToTrackList(trackDetails, true);
    const trackList = audioPlayer.getTrackList();

    expect(trackList).toHaveLength(1);
    expect(trackList[0]).toMatchObject(trackDetails);
    expect(audioPlayer.selectedTrack).toEqual(track);
  });

  test("playTrack should return false when no track is playing", () => {
    const isPlaying = audioPlayer.isPlaying();
    expect(isPlaying).toBe(false);
  });

  test("playTrack should return true when a track is playing", () => {
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.playTrack(track);
    expect(track.howl.play).toHaveBeenCalled();
    (track.howl.playing as Mock).mockReturnValue(true);
    const isPlaying = audioPlayer.isPlaying();
    expect(isPlaying).toBe(true);
  });

  test("removeTrackByUrl should remove a track from the trackList", () => {
    audioPlayer.addTrackToTrackList(trackDetails, true);
    expect(audioPlayer.getTrackList()).toHaveLength(1);

    audioPlayer.removeTrackByUrl(trackDetails.url);
    expect(audioPlayer.getTrackList()).toHaveLength(0);
  });

  test("removeTrackByUrl should stop the currently selectedTrack if removed", () => {
    audioPlayer.addTrackToTrackList(trackDetails, true);
    const mockStop = vi.spyOn(audioPlayer.selectedTrack!.howl, "unload");

    audioPlayer.removeTrackByUrl(trackDetails.url);
    expect(mockStop).toHaveBeenCalled();
  });

  test("removeTrackByUrl should not stop any track if the URL does not match", () => {
    audioPlayer.addTrackToTrackList(trackDetails, true);
    const mockStop = vi.spyOn(audioPlayer.selectedTrack!.howl, "stop");

    audioPlayer.removeTrackByUrl(trackDetails2.url);
    expect(mockStop).not.toHaveBeenCalled();
  });

  test("nextTrack should play the next track in the trackList", () => {
    audioPlayer.addMultipleTracksToTrackList(
      [trackDetails1, trackDetails2],
      true,
    );

    const mockNextTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[1]!.howl,
      "play",
    );

    audioPlayer.playNextTrack();
    expect(mockNextTrackPlay).toHaveBeenCalled();
    expect(audioPlayer.selectedTrack?.url).toBe(trackDetails2.url);
  });

  test("nextTrack should stop the currently selectedTrack before playing the next one", () => {
    audioPlayer.addMultipleTracksToTrackList(
      [trackDetails1, trackDetails2],
      true,
    );
    const mockStop = vi.spyOn(audioPlayer.selectedTrack!.howl, "stop");

    audioPlayer.playNextTrack();
    expect(mockStop).toHaveBeenCalled();
  });

  test("previousTrack should play the previous track in the trackList", () => {
    audioPlayer.addMultipleTracksToTrackList(
      [trackDetails1, trackDetails2],
      true,
    );

    audioPlayer.playNextTrack();

    const mockPrevTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[0]!.howl,
      "play",
    );

    audioPlayer.playPreviousTrack();
    expect(mockPrevTrackPlay).toHaveBeenCalled();
    expect(audioPlayer.selectedTrack?.url).toBe(trackDetails1.url);
  });

  test("previousTrack should play the same track in the trackList if it's the first track", () => {
    audioPlayer.addMultipleTracksToTrackList(
      [trackDetails1, trackDetails2],
      true,
    );

    const mockPrevTrackPlay = vi.spyOn(
      audioPlayer.getTrackList()[0]!.howl,
      "play",
    );

    audioPlayer.playPreviousTrack();
    expect(mockPrevTrackPlay).toHaveBeenCalled();
    expect(audioPlayer.selectedTrack?.url).toBe(trackDetails1.url);
  });

  test("previousTrack should stop the currently selectedTrack before playing the previous one", () => {
    audioPlayer.addMultipleTracksToTrackList(
      [trackDetails1, trackDetails2],
      true,
    );
    audioPlayer.playNextTrack();

    const mockStop = vi.spyOn(audioPlayer.selectedTrack!.howl, "stop");

    audioPlayer.playPreviousTrack();
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

  test("playSelectedTrack should play the currently selectedTrack", () => {
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.selectedTrack = track;
    const playMock = vi.spyOn(Howl.prototype, "play");

    audioPlayer.playSelectedTrack();

    expect(playMock).toHaveBeenCalled();
    playMock.mockRestore();
  });

  test("playSelectedTrack should not play if no track is selected", () => {
    const playMock = vi.spyOn(Howl.prototype, "play");

    audioPlayer.playSelectedTrack();

    expect(playMock).not.toHaveBeenCalled();
    playMock.mockRestore();
  });

  test("pauseTrack should pause the currently selectedTrack", () => {
    const track = audioPlayer.createTrack(trackDetails);
    audioPlayer.selectedTrack = track;
    const pauseMock = vi.spyOn(Howl.prototype, "pause");

    audioPlayer.pauseTrack();

    expect(pauseMock).toHaveBeenCalled();
    pauseMock.mockRestore();
  });

  test("pauseTrack should not pause if no track is selected", () => {
    const pauseMock = vi.spyOn(Howl.prototype, "pause");

    audioPlayer.pauseTrack();

    expect(pauseMock).not.toHaveBeenCalled();
    pauseMock.mockRestore();
  });
});
