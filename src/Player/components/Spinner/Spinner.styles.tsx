import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  0% {opacity:0;}
  100% {opacity:1;}
`;

export const Spinner = styled.div`
  display: flex;
  min-width: 60px;
  min-height: 60px;
  align-items: center;
  justify-content: flex-start;

  animation: ${fadeIn} 2s;

  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;
