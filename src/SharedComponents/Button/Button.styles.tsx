import styled from "@emotion/styled";

import {
  notActiveGrey,
  activeLinkOrange,
  disabledGrey,
  displayWhite,
  iconSizeSm,
  iconSizeMd,
  iconSizeLg,
  mediaDesktop,
} from "../../constants/globalStyleVariables";

import { GREYSCALE } from "../../constants/colors";

type Size = "sm" | "md" | "lg";

const getIconSize = (size: Size) => {
  if (size === "sm") {
    return iconSizeSm;
  } else if (size === "md") {
    return iconSizeMd;
  } else if (size === "lg") {
    return iconSizeLg;
  }
};

type Props = {
  size: Size;
  disabled?: boolean;
  shouldFill?: boolean;
};

export const IconContainer = styled.div<Props>`
  > svg {
    height: ${({ size }) => getIconSize(size)}px;
    width: ${({ size }) => getIconSize(size)}px;

    display: flex;
    justify-content: center;
    align-items: center;

    stroke-width: 1%;

    fill: ${({ disabled = false }) =>
      disabled ? disabledGrey : notActiveGrey};
    stroke: ${({ disabled = false }) =>
      disabled ? disabledGrey : notActiveGrey};

    &:active {
      fill: ${({ disabled = false }) =>
        disabled ? notActiveGrey : displayWhite};
      stroke: ${({ disabled = false }) =>
        disabled ? notActiveGrey : displayWhite};
    }

    ${mediaDesktop} {
      height: ${({ size }) => getIconSize(size)}px;
      width: ${({ size }) => getIconSize(size)}px;

      transition: transform 0.2s ease-in-out;

      &:hover {
        fill: ${({ disabled = false }) =>
          disabled ? disabledGrey : displayWhite};
        stroke: ${({ disabled = false }) =>
          disabled ? disabledGrey : displayWhite};
        transform: scale(1.02);
      }
    }
  }
`;

/* NOTE: Done quickly - Repeats code & can probably be refined */
export const IconContainerNoFill = styled.div<Props>`
  > svg {
    height: ${({ size }) => getIconSize(size)}px;
    width: ${({ size }) => getIconSize(size)}px;

    display: flex;
    justify-content: center;
    align-items: center;

    stroke-width: 1%;
    box-shadow: 0px 1px 7px -1px rgba(0, 0, 0, 0.1);

    stroke: ${({ disabled = false }) =>
      disabled ? disabledGrey : notActiveGrey};

    &:active {
      stroke: ${({ disabled = false }) =>
        disabled ? notActiveGrey : displayWhite};
    }

    ${mediaDesktop} {
      height: ${({ size }) => getIconSize(size)}px;
      width: ${({ size }) => getIconSize(size)}px;

      transition: transform 0.2s ease-in-out;

      &:hover {
        stroke: ${({ disabled = false }) =>
          disabled ? disabledGrey : displayWhite};
        transform: scale(1.02);
      }
    }
  }
`;

export const StyledButton = styled.button`
  outline: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px 10px;

  &:focus {
    border: 1px solid ${activeLinkOrange};
  }
`;

export const IconContainerCustomFill = styled.div<
  Props & { fillColor?: string }
>`
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    height: ${({ size }) => getIconSize(size)}px;
    width: ${({ size }) => getIconSize(size)}px;

    stroke-width: 1%;

    fill: ${({ fillColor }) => fillColor || notActiveGrey};
    stroke: white;
  }
`;

export const StyledButtonWhiteBorder = styled.button`
  outline: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border-radius: 5px;
  border: 1px solid ${GREYSCALE.SPANISH_GREY};
  padding: 10px;
  background: rgb(40, 40, 40);

  &:focus,
  &:hover {
    border: 1px solid ${activeLinkOrange};
  }

  &:hover {
    transform: scale(1.02);
  }
`;
