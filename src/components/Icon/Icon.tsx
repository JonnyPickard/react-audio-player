import typedocLogo from "assets/icons/brands/typedoc.svg";

// import { MouseEventHandler, ReactNode } from "react";
import * as styles from "./Icon.styles";

enum IconName {
  "AiFillPauseCircle" = "ai-fill-pause-circle",
  "AiFillPlayCircle" = "ai-fill-play-circle",
  "AiFillStepForward" = "ai-fill-step-forward",
  "AiFillStepBackward" = "ai-fill-step-backward",
}

export interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  return (
    <img
      css={styles.icon}
      src={"src/assets/icons/brands/typedoc.svg"}
      alt="Typedoc API documentation"
    />
  );
}
