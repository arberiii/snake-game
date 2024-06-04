import styled, { css } from "styled-components";

const Cell = styled.div<{ type: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ type }) =>
    type === "head" ? "darkgreen" : type === "snake" ? "green" : "white"};
  border: 1px solid #444;
`;

export default Cell;
