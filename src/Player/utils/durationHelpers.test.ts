import { calcTimePlayed, calcTimeRemaining } from "./durationHelpers";

test("calcTimePlayed should return time played", () => {
  expect(calcTimePlayed(4)).toEqual(4);
});

test("calcTimeRemaining should return the time remaining", () => {
  expect(calcTimeRemaining(10, 5)).toEqual(5);
});
