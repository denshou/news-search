import React from "react";
import { keyframes, styled } from "styled-components";

const Loading = () => {
  return (
    <Background>
      <Loader></Loader>
    </Background>
  );
};

export default Loading;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const rotation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;
const Loader = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
