import * as React from "react";
import type { CSSProp } from "@emotion/react";

import {
  StyledButton,
  StyledButtonWhiteBorder,
  IconContainer,
  IconContainerCustomFill,
  IconContainerNoFill,
} from "./Button.styles";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillStepForward,
  AiFillStepBackward,
  AiOutlineShoppingCart,
  AiFillCaretRight,
} from "react-icons/ai";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";

export type IconType =
  | "AiFillPauseCircle"
  | "AiFillPlayCircle"
  | "AiFillStepForward"
  | "AiFillStepBackward"
  | "AiFillCaretRight"
  | "AiOutlineShoppingCart"
  | "HiOutlineVolumeOff"
  | "HiOutlineVolumeUp";

export const ICON_NAMES: Record<string, IconType> = {
  AiFillPauseCircle: "AiFillPauseCircle",
  AiFillPlayCircle: "AiFillPlayCircle",
  AiFillStepForward: "AiFillStepForward",
  AiFillStepBackward: "AiFillStepBackward",
  AiOutlineShoppingCart: "AiOutlineShoppingCart",
  AiFillCaretRight: "AiFillCaretRight",
  HiOutlineVolumeOff: "HiOutlineVolumeOff",
  HiOutlineVolumeUp: "HiOutlineVolumeUp",
};

export interface Props {
  icon: IconType;
  disabled?: boolean;
  onClick: () => void;
  styles?: CSSProp;
}

const getAriaLabel = (iconName: string) => {
  switch (iconName) {
    case ICON_NAMES.AiFillPauseCircle:
      return "Pause";
    case ICON_NAMES.AiFillPlayCircle:
      return "Play";
    case ICON_NAMES.AiFillStepForward:
      return "Next track";
    case ICON_NAMES.AiFillStepBackward:
      return "Previous track";
    case ICON_NAMES.AiFillCaretRight:
      return "Toggle expanded view";
    case ICON_NAMES.HiOutlineVolumeOff:
      return "Mute";
    case ICON_NAMES.HiOutlineVolumeUp:
      return "Unmute";
    case ICON_NAMES.AiOutlineShoppingCart:
      return "Add to cart";
  }
};

export function Button({ icon, onClick, disabled = false, styles }: Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case ICON_NAMES.AiFillPauseCircle:
        return (
          <IconContainer size="lg" disabled={disabled}>
            <AiFillPauseCircle />
          </IconContainer>
        );
      case ICON_NAMES.AiFillPlayCircle:
        return (
          <IconContainer size="lg" disabled={disabled}>
            <AiFillPlayCircle />
          </IconContainer>
        );
      case ICON_NAMES.AiFillStepForward:
        return (
          <IconContainer size="md" disabled={disabled}>
            <AiFillStepForward />
          </IconContainer>
        );
      case ICON_NAMES.AiFillStepBackward:
        return (
          <IconContainer size="md" disabled={disabled}>
            <AiFillStepBackward />
          </IconContainer>
        );
      case ICON_NAMES.AiFillCaretRight:
        return (
          <IconContainer css={styles} size="md" disabled={disabled}>
            <AiFillCaretRight />
          </IconContainer>
        );
      case ICON_NAMES.HiOutlineVolumeOff:
        return (
          <IconContainerNoFill size="sm" disabled={disabled}>
            <HiOutlineVolumeOff />
          </IconContainerNoFill>
        );
      case ICON_NAMES.HiOutlineVolumeUp:
        return (
          <IconContainerNoFill size="sm" disabled={disabled}>
            <HiOutlineVolumeUp />
          </IconContainerNoFill>
        );
    }
  };

  return (
    <StyledButton
      title={getAriaLabel(icon)}
      aria-label={getAriaLabel(icon)}
      data-testid={icon}
      tabIndex={-1}
      disabled={disabled}
      onClick={onClick}
    >
      {getIcon(icon)}
    </StyledButton>
  );
}

export function ButtonCustom({
  icon,
  onClick,
  disabled = false,
  fillColor,
}: Props & { fillColor?: string }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case ICON_NAMES.AiFillPlayCircle:
        return (
          <IconContainerCustomFill
            fillColor={fillColor}
            size="md"
            disabled={disabled}
          >
            <AiFillPlayCircle />
          </IconContainerCustomFill>
        );
      case ICON_NAMES.AiOutlineShoppingCart:
        return (
          <IconContainerCustomFill
            fillColor={fillColor}
            size="md"
            disabled={disabled}
          >
            <AiOutlineShoppingCart />
          </IconContainerCustomFill>
        );
    }
  };

  return (
    <StyledButtonWhiteBorder
      title={getAriaLabel(icon)}
      aria-label={getAriaLabel(icon)}
      data-testid={icon}
      tabIndex={-1}
      disabled={disabled}
      onClick={onClick}
    >
      {getIcon(icon)}
    </StyledButtonWhiteBorder>
  );
}
