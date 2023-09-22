import { css } from "@emotion/react";
import { theme } from "theme";

export const app = css`
  font-family: Arial, Helvetica, sans-serif;
`;

export const iconLink = css`
  background: ${theme.colors.grayscale.shadedWhite};
  display: flex;
  align-items: center;
`;

export const icon = css`
  height: 24px;
  width: 24px;
  margin-right: 10px;
`;
