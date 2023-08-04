import React from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
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
  | "HiOutlineVolumeUp"
  | "RiDoubleQuotesL"
  | "RiDoubleQuotesR";

export const ICON_NAMES: Record<string, IconType> = {
  AiFillPauseCircle: "AiFillPauseCircle",
  AiFillPlayCircle: "AiFillPlayCircle",
  AiFillStepForward: "AiFillStepForward",
  AiFillStepBackward: "AiFillStepBackward",
  AiOutlineShoppingCart: "AiOutlineShoppingCart",
  AiFillCaretRight: "AiFillCaretRight",
  HiOutlineVolumeOff: "HiOutlineVolumeOff",
  HiOutlineVolumeUp: "HiOutlineVolumeUp",
  RiDoubleQuotesL: "RiDoubleQuotesL",
  RiDoubleQuotesR: "RiDoubleQuotesR",
};

interface Icon {
  iconName: string;
}

export const Icon = ({ iconName }: Icon) => {
  switch (iconName) {
    case ICON_NAMES.AiFillPauseCircle:
      return <AiFillPauseCircle />;
    case ICON_NAMES.AiFillPlayCircle:
      return <AiFillPlayCircle />;
    case ICON_NAMES.AiFillStepForward:
      return <AiFillStepForward />;
    case ICON_NAMES.AiFillStepBackward:
      return <AiFillStepBackward />;
    case ICON_NAMES.AiFillCaretRight:
      return <AiFillCaretRight />;
    case ICON_NAMES.HiOutlineVolumeOff:
      return <HiOutlineVolumeOff />;
    case ICON_NAMES.HiOutlineVolumeUp:
      return <HiOutlineVolumeUp />;
    case ICON_NAMES.RiDoubleQuotesL:
      return <RiDoubleQuotesL />;
    case ICON_NAMES.RiDoubleQuotesR:
      return <RiDoubleQuotesR />;
  }
};
