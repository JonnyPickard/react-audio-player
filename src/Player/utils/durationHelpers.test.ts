import { getTimePlayed, getTimeRemaining } from "./durationHelpers";

test("getTimePlayed should return time played", () => {
  expect(getTimePlayed(4)).toEqual(4);
});

test("getTimeRemaining should return the time remaining", () => {
  expect(getTimeRemaining(10, 5)).toEqual(5);
});
