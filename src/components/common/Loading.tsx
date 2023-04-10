import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <Spinner>
      <DotLoader color="#1361C4" loading />
    </Spinner>
  );
};

export default Loading;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  z-index: 99999;
`;
