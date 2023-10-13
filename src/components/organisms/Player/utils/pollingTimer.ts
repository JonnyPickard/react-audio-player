export const pollingTimer = (
  funcToCall: () => void,
  // 400 is default fastest allowed by browsers
  intervalDelay: number = 400
) => {
  return setInterval(funcToCall, intervalDelay);
};
