/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNumber(x: any): x is number {
  return typeof x === "number" && !isNaN(x) && isFinite(x);
}
