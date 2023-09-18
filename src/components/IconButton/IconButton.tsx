import typedocLogo from "assets/icons/typedoc.svg";

import * as styles from "./IconButton.styles";

export interface IconButtonProps {}

export function IconButton(props: IconButtonProps) {
  return (
    <button>
      <img
        css={styles.icon}
        src={typedocLogo}
        alt="Typedoc API documentation"
      />
    </button>
  );
}
