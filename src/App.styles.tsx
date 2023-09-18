import { Theme, css } from "@emotion/react";

export const app = css`
  font-family: Arial, Helvetica, sans-serif;
`;

export const iconLink = (theme: Theme) => css`
  background: ${theme.colors.grayscale.black};
  display: flex;
  align-items: center;
`;

export const icon = css`
  height: 24px;
  width: 24px;
  margin-right: 10px;
`;
