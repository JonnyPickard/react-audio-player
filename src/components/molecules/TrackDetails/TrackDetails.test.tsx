import { testTrack1 } from "mocks/fixtures/test-tracks";
import { render, screen } from "test/test-utils";

import { TrackDetails } from "./TrackDetails";

test("should render track details", () => {
  render(<TrackDetails {...testTrack1} />);

  expect(
    screen.getByRole("link", { name: testTrack1.title }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: (name) => name.includes(testTrack1.artists[0].name),
    }),
  ).toBeInTheDocument();
});

test("when multiple artist names should append commas to said names, except for the last", () => {
  render(<TrackDetails {...testTrack1} />);

  const firstArtistNameWithComma = testTrack1.artists[0].name + ",";
  const secondArtistNameWithoutComma = testTrack1.artists[1].name;

  expect(
    screen.getByRole("link", {
      name: firstArtistNameWithComma,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(secondArtistNameWithoutComma).innerHTML).not.includes(
    ",",
  );
});

test("when multiple artist names should append commas to said names, except for the last", () => {
  render(<TrackDetails {...testTrack1} />);

  const firstArtistNameWithComma = testTrack1.artists[0].name + ",";
  const secondArtistNameWithoutComma = testTrack1.artists[1].name;

  expect(
    screen.getByRole("link", {
      name: firstArtistNameWithComma,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(secondArtistNameWithoutComma).innerHTML).not.includes(
    ",",
  );
});

test("should not render an artist link when no artist url", () => {
  render(<TrackDetails {...testTrack1} />);

  const secondArtistNameWithoutUrl = testTrack1.artists[1].name;

  expect(
    screen.queryByRole("link", { name: secondArtistNameWithoutUrl }),
  ).not.toBeInTheDocument();
});
