// import { Howler } from "howler";

// import { Player } from "./player";

// jest.mock("howler");

// const testAudioUrl =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
// const testArtist = "testArtist";
// const testTrackTitle = "testTrackTitle";
// const testLabel = "testLabel";

// const testAudioUrl2 =
//   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
// const testArtist2 = "testArtist2";
// const testTrackTitle2 = "testTrackTitle2";
// const testLabel2 = "testLabel2";

// const testTrackDetails = {
//   url: testAudioUrl,
//   artist: testArtist,
//   title: testTrackTitle,
//   label: testLabel,
// };

// const testTrack2Details = {
//   url: testAudioUrl2,
//   artist: testArtist2,
//   title: testTrackTitle2,
//   label: testLabel2,
// };

// const testPlayer = new Player();

// const testTrack = testPlayer.createTrack(testTrackDetails);
// const testTrack2 = testPlayer.createTrack(testTrack2Details);

// describe("Player", () => {
//   beforeEach(() => {
//     jest.restoreAllMocks();
//   });

//   /* TODO: Add guard logic against adding a repeat track */
//   // Add track should probably always play said track?
//   // Or maybe load should?
//   // Or maybe loadAndPlay function?
//   describe("Add track", () => {
//     const player = new Player();
//     player.addTrack(testTrackDetails, true);

//     test("should add a track given src url", () => {
//       /* Assert track is created and added to tracks array */
//       expect(
//         player.tracks.filter((track) => track.title === testTrackTitle),
//       ).toHaveLength(1);
//     });

//     test("track should play if no other tracks are already playing", () => {
//       expect(player.currentlyLoadedTrack).toBeDefined();

//       expect(player?.currentlyLoadedTrack?.howl.play).toHaveBeenCalled();
//     });
//   });

//   describe("Load track", () => {
//     const player = new Player();
//     player.loadTrack(testTrackDetails);

//     test("should add a track given src url", () => {
//       /* Assert track is created and added to tracks array */
//       expect(
//         player.tracks.filter((track) => track.title === testTrackTitle),
//       ).toHaveLength(1);
//     });

//     test("track should play if no other tracks are already playing", () => {
//       expect(player.currentlyLoadedTrack).toBeDefined();
//     });
//   });

//   describe("Play track", () => {
//     const player = new Player();

//     test("should add new track to currently playing and call howl.play()", () => {
//       player.playTrack(testTrack);

//       expect(player.currentlyLoadedTrack).toEqual(testTrack);
//       expect(player?.currentlyLoadedTrack?.howl.play).toHaveBeenCalled();
//     });
//   });

//   describe("Find track by url", () => {
//     test("should find a loaded track by given track url", () => {
//       const player = new Player();

//       player.tracks.push(testTrack);

//       const track = player.findTrackByUrl(testAudioUrl);

//       expect(track).toEqual(testTrack);
//     });
//   });

//   describe("Stop track", () => {
//     test("should stop the currently loaded playing track", () => {
//       const player = new Player();

//       /* Adds and plays */
//       player.addTrack(testTrackDetails);

//       // @ts-ignore
//       player.currentlyLoadedTrack?.howl?.playing.mockReturnValue(true);

//       player.stopLoadedTrack();

//       expect(player?.currentlyLoadedTrack?.howl.stop).toHaveBeenCalled();
//     });
//   });

//   describe("Pause track", () => {
//     test("should pause the currently loaded playing track", () => {
//       const player = new Player();

//       /* Adds and plays */
//       player.addTrack(testTrackDetails);

//       // @ts-ignore
//       player.currentlyLoadedTrack?.howl?.playing.mockReturnValue(true);

//       player.pauseTrack();

//       expect(player?.currentlyLoadedTrack?.howl.pause).toHaveBeenCalled();
//     });
//   });

//   describe("Remove track", () => {
//     test("should stop & remove the track given src url", () => {
//       /* Src url because i'm not sure i'll have track id in the dom */
//       const player = new Player();

//       /* Adds and plays */
//       player.addTrack(testTrackDetails);

//       const track = player.currentlyLoadedTrack;

//       player.removeTrack(testAudioUrl);

//       expect(player.currentlyLoadedTrack).toBeUndefined();
//       expect(track?.howl.stop).toHaveBeenCalled();
//       expect(player.findTrackByUrl(testAudioUrl)).toBeUndefined();
//       expect(player.tracks).toHaveLength(0);
//     });
//   });

//   describe("Add multiple tracks", () => {
//     const player = new Player();

//     test("should add a tracklist", () => {
//       expect(player.currentlyLoadedTrack).toBeUndefined();

//       player.addMultipleTracks([testTrackDetails, testTrack2Details]);

//       expect(player.tracks).toHaveLength(2);
//     });

//     test("if nothings currently playing should autoplay the last song", () => {
//       expect(player?.currentlyLoadedTrack?.url).toEqual(testAudioUrl2);
//       expect(player?.currentlyLoadedTrack?.howl.play).toHaveBeenCalled();
//     });
//   });

//   describe("Remove all tracks", () => {
//     const player = new Player();

//     /* Setup a playlist */
//     player.tracks = [testTrack, testTrack2];
//     player.currentlyLoadedTrack = testTrack;

//     /* call remove tracks  */
//     player.removeAllTracks();

//     test("should remove all tracks from the tracks array", () => {
//       expect(player.tracks).toEqual([]);
//     });
//     test("should remove the currently loaded track call Howler.unload to destroy all howl instances", () => {
//       expect(player.currentlyLoadedTrack).toBeUndefined();
//       expect(Howler.unload).toHaveBeenCalled();
//     });
//   });

//   describe("Next track", () => {
//     const player = new Player();

//     /* Setup a playlist */
//     player.addTrack(testTrackDetails);
//     player.addTrack(testTrack2Details);

//     /* @ts-ignore */
//     player.currentlyLoadedTrack?.howl?.playing.mockReturnValue(true);

//     const loadedTrack1 = player.currentlyLoadedTrack;

//     player.nextTrack();

//     test("should stop any playing tracks", () => {
//       expect(loadedTrack1?.howl.stop).toHaveBeenCalled();
//     });
//     test("should load and play new track", () => {
//       expect(player?.currentlyLoadedTrack?.title).toEqual(testTrack2.title);
//       expect(player?.currentlyLoadedTrack?.howl.play).toBeCalled();
//     });
//   });

//   describe("Previous track", () => {
//     const player = new Player();

//     /* Setup a playlist */
//     player.addTrack(testTrackDetails);
//     player.addTrack(testTrack2Details);

//     /* @ts-ignore */
//     player.currentlyLoadedTrack?.howl?.playing.mockReturnValue(true);

//     const loadedTrack1 = player.currentlyLoadedTrack;

//     /* Load and play second track - not best practice but cut for time */
//     player.nextTrack();
//     player.previousTrack();

//     test("should stop any playing tracks", () => {
//       expect(loadedTrack1?.howl.stop).toHaveBeenCalled();
//     });
//     test("should load and play previous track", () => {
//       expect(player?.currentlyLoadedTrack?.title).toEqual(testTrack.title);
//       expect(player?.currentlyLoadedTrack?.howl.play).toBeCalled();
//     });
//   });

//   /*
//     TODO: Tedious trying to send events to test with the mocks
//     Will get the player ui built and see its working first
//   */
//   // describe("Autoplay next track", () => {
//   //   const autoplaySpy = jest.spyOn(Player.prototype, "autoplayNext");
//   //   const player = new Player();

//   //   /* Setup a playlist */
//   //   player.addTrack(testTrackDetails);

//   //   test("When one track ends the next track in the playlist should auto play", () => {
//   //     console.log(player?.currentlyLoadedTrack?.howl.on);
//   //     player?.currentlyLoadedTrack?.howl.on;
//   //     console.log(autoplaySpy.mock);
//   //   });
//   // });

//   describe("Get player volume", () => {
//     test("Should return current player volume", () => {
//       const player = new Player();
//       player.addTrack(testTrackDetails);
//       // console.log(Howler.volume);
//       // console.log(player.getVolume());
//     });
//   });

//   // TODO: Workout how to mock events
//   // describe("Get loaded track duration", () => {
//   //   beforeAll(() => {});

//   //   test("should return the loaded tracks duration", async () => {
//   //     const player = new Player();

//   //     player.addTrack(testTrackDetails);

//   //     console.log(player.currentlyLoadedTrack);

//   //     const duration = await player.getDuration();

//   //     console.log(duration);
//   //   });
//   // });

//   // describe("Seek track timestamp", () => {

//   // });
// });
