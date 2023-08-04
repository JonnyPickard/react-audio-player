import { getTimePlayed, getTimeRemaining } from "./durationHelpers";

describe("getTimePlayed", () => {
  test("returns time played", () => {
    expect(getTimePlayed(4)).toEqual(4);
  });
});

describe("getTimeRemaining", () => {
  test("returns time remaining", () => {
    expect(getTimeRemaining(10, 5)).toEqual(5);
  });
});
