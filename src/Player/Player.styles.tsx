import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import {
  playerBG,
  mediaDesktop,
  mediaMobile,
  activeLinkOrange,
} from "../constants/globalStyleVariables";

export const caret = css`
  padding: 10px;
  transform: rotate(0);
`;

export const spinnerContainer = css`
  min-width: 60px;
  min-height: 60px;
`;

export const rotateCaret = css`
  padding: 10px;
  transform: rotate(-90deg);
`;

export const secondaryControls = css`
  display: none;
  ${mediaDesktop} {
    display: flex;
    flex-direction: column;
  }
`;

export const secondaryControlsSlim = css`
  display: flex;
  align-items: flex-end;
`;

export const toggleSlimPlayerCaret = css`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
`;

export const VisuallyHiddenH2 = styled.h2`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

const animateSeeker = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0px)
  }
  100% {
    transform: translateX(100%);
  }
`;

export const PlayerContainerWrapper = styled.div<{ isSeeking: boolean }>`
  position: relative;
  width: 100%;

  &:before {
    opacity: ${({ isSeeking }) => (isSeeking ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    transform: translateX(0px);
    animation: ${animateSeeker} 4s linear infinite;
    position: absolute;
    content: "";
    top: -3px;
    left: -2px;
    right: -2px;
    height: 3px;
    width: 100%;

    background: ${activeLinkOrange};
  }
`;

export const playerContainerGrid = css`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-column-gap: 20px;
`;

export const playerContainerGridSlim = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
`;

export const PlayerContainer = styled.div`
  transition: height 0.2s ease-in-out, padding 0.2s ease-in-out;
  height: 100%;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  /* Needs more room on mobile because of swipes e.g. iphone swipe up */
  padding-bottom: 40px;
  @supports (-webkit-touch-callout: none) {
    /* CSS specific to iOS devices - add even more to allow easy seeking */
    padding-bottom: 60px;
  }

  justify-content: center;
  align-items: center;

  background: ${playerBG};
  box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.1);
  outline: 2px solid black;

  ${mediaDesktop} {
    ${playerContainerGrid}
    height: 116px;
    padding: 0 20px 20px;
    grid-template-rows: 1fr;
  }
`;

export const playerContainerSlim = css`
  height: 84px;
  /* Add extra on to bottom on mobile */
  padding: 0 0 20px;
  ${mediaDesktop} {
    padding: 0;
  }
  ${playerContainerGridSlim};
`;

export const ControlsContainer = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const VolumeContainer = styled.div`
  width: 100%;

  ${mediaMobile} {
    display: none;
  }
`;

const TrackInfo = css<{
  hasEverLoadedATrack: boolean;
}>`
  transition: height 0.4s ease-in-out;
  flex-wrap: nowrap;
  width: 100%;

  > div:first-of-type {
    grid-column: 2;
  }

  ${mediaDesktop} {
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const TrackInfoContainerDiv = styled.div<{
  hasEverLoadedATrack: boolean;
}>`
  min-height: 60px;
  min-width: 60px;
  ${TrackInfo}
`;

export const TrackInfoContainerAnchor = styled.a<{
  hasEverLoadedATrack: boolean;
}>`
  ${TrackInfo}
  text-decoration: none;

  &:hover {
    > div > div {
      color: ${activeLinkOrange};
    }
  }
`;
