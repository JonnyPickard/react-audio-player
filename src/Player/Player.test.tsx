import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import { Player, PLAYER_NOW_PLAYING_COPY_TEXT } from "./Player";

import { mocked } from "ts-jest/utils";

import { Howl } from "howler";
import { testTrack1, testTrack2 } from "./fixtures/test-tracks";

const HowlMock = mocked(Howl);

// jest.useFakeTimers();

jest.mock("howler");

/* 
  Most important funcs that need testing

  var playTrack = window.AudioPlayer.playTrack;
  var loadTracks = window.AudioPlayer.loadTracks;

  NOTE:

  NEED TO PROPERLY MOCK OUT HOWLER CALLS & TIMERS TO GET THIS WORKING PROPERLY
*/
test("Renders Player", async () => {
  render(<Player />);
  expect(
    screen.getByRole("heading", { name: PLAYER_NOW_PLAYING_COPY_TEXT })
  ).toBeInTheDocument();
});

test("Loads Tracks", async () => {
  jest
    .spyOn(HowlMock.prototype, "state")
    .mockImplementationOnce(() => "loaded");
  jest.spyOn(HowlMock.prototype, "duration").mockImplementationOnce(() => 100);
  jest.spyOn(HowlMock.prototype, "seek").mockImplementationOnce(() => 20);
  jest.spyOn(HowlMock.prototype, "playing").mockImplementationOnce(() => true);
  const playSpy = jest.spyOn(HowlMock.prototype, "play");

  const result = render(<Player />);

  window.AudioPlayer.loadTracks([testTrack1, testTrack2]);

  expect(playSpy).toHaveBeenCalled();

  await waitFor(() =>
    expect(
      result.container.querySelector("#player-currently-playing-title")
    ).toHaveTextContent(testTrack1.title)
  );

  /* Skips to next track*/
  userEvent.click(screen.getByTestId("AiFillStepForward"));

  await waitFor(() =>
    expect(
      result.container.querySelector("#player-currently-playing-title")
    ).toHaveTextContent(testTrack2.title)
  );
});
