import {
  activeLinkOrange,
  mediaDesktop,
} from "../../../constants/globalStyleVariables";

import { keyframes, css } from "@emotion/react";

const fadeInOut = keyframes`
  0% {
    transform: translateX(0);
  }
  
  49% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translateX(-300px);
  }
  51% {
    transform: translateX(300px);
    opacity: 0;
  }
  52% {
    opacity:1;
  }
  
  100% {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`;

export const trackInfoAnchorImage = css`
  justify-self: flex-start;
  ${mediaDesktop} {
    justify-self: center;
  }
`;

export const trackInfoAnchor = css`
  justify-self: center;
  animation: ${fadeIn} 0.2s;
  text-decoration: none;
  &:hover {
    color: ${activeLinkOrange};
  }
`;

export const trackInfo = css`
  height: 60px;
  background: black;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  text-align: center;
  ${mediaDesktop} {
    grid-template-columns: 1fr 2fr;
    column-gap: 10px;
  }
`;

export const trackInfoSlim = css`
  text-align: start;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 10px;
`;

export const trackInfoImg = css`
  height: 60px;
  width: 60px;
  animation: ${fadeIn} 0.2s;
`;

export const trackInfoLogo = css`
  background: black;
  height: 60px;
  width: 60px;
`;

export const toggleSlimPlayerCaret = css`
  grid-column: 3;
  justify-self: flex-end;
  align-self: center;
  ${mediaDesktop} {
    display: none;
  }
`;

export const hideElement = css`
  display: none;
`;

export const infoTextContainerNothingPlaying = css`
  display: none;
`;

export const infoTextContainer = css`
  height: 100%;
  width: 100%;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  overflow: hidden;
  flex-wrap: nowrap;
  flex-direction: column;
  grid-column: 2;
  margin: 0 10px;

  ${mediaDesktop} {
    align-items: flex-start;
    min-width: 200px;

    &:hover > div {
      text-overflow: unset;
      overflow: unset;
      animation-name: ${fadeInOut};
      animation-duration: 6s;
      animation-timing-function: linear;
      animation-delay: 0;
      animation-iteration-count: infinite;
    }
  }
`;
