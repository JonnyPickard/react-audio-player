import styled from "@emotion/styled";
import {
  notActiveGrey,
  displayWhite,
  displayFontSize,
  secondaryFontSize,
  lineHeight,
  mediaDesktop,
} from "../../../constants/globalStyleVariables";

interface LabelProps {
  isSlimPlayer?: boolean;
}

export const AritstLabel = styled.div<LabelProps>`
  width: 100%;
  line-height: ${lineHeight} !important;
  font-size: ${secondaryFontSize} !important;
  color: ${notActiveGrey};
  white-space: nowrap;
  word-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: ${({ isSlimPlayer }) => (isSlimPlayer ? "start" : "center")};

  ${mediaDesktop} {
    text-align: left;
  }
`;

export const TitleLabel = styled.div<LabelProps>`
  width: 100%;
  line-height: ${lineHeight} !important;
  font-size: ${displayFontSize} !important;
  color: ${displayWhite};
  white-space: nowrap;
  word-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  text-align: ${({ isSlimPlayer }) => (isSlimPlayer ? "start" : "center")};

  ${mediaDesktop} {
    text-align: left;
  }
`;

export const TimeDisplayLabel = styled.div`
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 16px;
  color: ${displayWhite};
`;

export const TimeDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  padding: 2px;
`;
