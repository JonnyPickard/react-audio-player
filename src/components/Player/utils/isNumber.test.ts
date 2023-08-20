import { isNumber } from "./isNumber";

test("isNumber should return true for valid numbers", () => {
  expect(isNumber(42)).toBe(true);
  expect(isNumber(3.14)).toBe(true);
  expect(isNumber(0)).toBe(true);
});

test("isNumber should return false for null and undefined", () => {
  expect(isNumber(null)).toBe(false);
  expect(isNumber(undefined)).toBe(false);
});

test("isNumber should return false for non-number inputs", () => {
  expect(isNumber("hello")).toBe(false);
  expect(isNumber(true)).toBe(false);
  expect(isNumber([])).toBe(false);
});
