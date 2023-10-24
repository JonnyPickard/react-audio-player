import { formatTime } from "./formatTime";

test.each([
  [0, "0:00"],
  [-4, "0:00"],
  [2, "0:02"],
  [200, "3:20"],
  [1981, "33:01"],
  [2000, "33:20"],
  [21000, "5:50:00"],
  [20000, "5:33:20"],
  [18100, "5:01:40"],
  [17999, "4:59:59"],
  [18000, "5:00:00"],
  [400000, "15:06:40"],
])("expect .formatTime(%i) to return '%s'", (seconds, expected) => {
  expect(formatTime(seconds)).toBe(expected);
});
