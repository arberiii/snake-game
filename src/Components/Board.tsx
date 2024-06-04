import styled from "styled-components";

const Board = styled.div<{ boardSize: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.boardSize}, 20px);
  grid-template-rows: repeat(${(props) => props.boardSize}, 20px);
  gap: 1px;
  background-color: #444;
  padding: 5px;
  border: 2px solid #333;
  margin: 0 auto;
  width: fit-content;
`;

export default Board;
