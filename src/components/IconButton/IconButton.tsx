import typedocLogo from "assets/icons/brands/typedoc.svg";
import { MouseEventHandler, ReactNode } from "react";

import * as styles from "./IconButton.styles";

// TODO: after Icon is done
export interface IconButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  /* The icon to display. */
  children: ReactNode;
}

export function IconButton({ onClick }: IconButtonProps) {
  return (
    <button onClick={onClick}>
      <img
        css={styles.icon}
        src={typedocLogo}
        alt="Typedoc API documentation"
      />
    </button>
  );
}
