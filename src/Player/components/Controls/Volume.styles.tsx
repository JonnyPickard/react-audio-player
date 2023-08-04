import styled from "@emotion/styled";

import { mediaXS } from "../../../constants/globalStyleVariables";

export const VolumeControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;

  /* Hide volume slider on mobile as they have volume buttons anyway */
  ${mediaXS} {
    > div:last-of-type {
      display: none;
    }
  }
`;
