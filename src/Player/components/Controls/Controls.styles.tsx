import styled from "@emotion/styled";

import { mediaDesktop } from "../../../constants/globalStyleVariables";

export const ControlsContainer = styled.div`
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  /* min-width: 200px; */
  width: 100%;

  ${mediaDesktop} {
    justify-content: center;
  }
`;
