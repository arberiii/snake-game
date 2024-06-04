import styled from "styled-components";
import React from "react";
import Board from "./Components/Board";
import Cell from "./Components/Cell";

const PageContainer = styled.div`
  text-align: center;
`;

const boardSize = 20;

const SnakeGame: React.FC = () => {
  return (
    <PageContainer>
      <h1>Snake Game</h1>
      <p>Use the arrow keys to move the snake</p>
      <p>Don't hit the walls or yourself!</p>
      <p>Refresh the page to restart the game</p>
      <Board boardSize={boardSize}>
        {Array.from({ length: boardSize }).map((_, y) =>
          Array.from({ length: boardSize }).map((_, x) => {
            return <Cell key={`${x}-${y}`} />;
          }),
        )}
      </Board>
    </PageContainer>
  );
};

export default SnakeGame;
