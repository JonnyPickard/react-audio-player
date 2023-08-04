import styled from "@emotion/styled";

import { lineHeight } from "../../../../constants/globalStyleVariables";

export const StyledTrackItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  > div {
    flex-wrap: nowrap;
    display: flex;
  }

  > div:nth-of-type(2) {
    /* flex: 1; */
  }
  > div:last-of-type {
    /* flex: 2; */
  }
`;

export const Spacer = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
`;
