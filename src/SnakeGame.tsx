import styled from "styled-components";
import React, { useState } from "react";
import Board from "./Components/Board";
import Cell from "./Components/Cell";

const PageContainer = styled.div`
  text-align: center;
`;

const boardSize = 20;

type Position = { x: number; y: number };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([
    { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) },
  ]);

  return (
    <PageContainer>
      <h1>Snake Game</h1>
      <p>Use the arrow keys to move the snake</p>
      <p>Don't hit the walls or yourself!</p>
      <p>Refresh the page to restart the game</p>
      <Board boardSize={boardSize}>
        {Array.from({ length: boardSize }).map((_, y) =>
          Array.from({ length: boardSize }).map((_, x) => {
            let type = "";
            if (snake[0].x === x && snake[0].y === y) {
              type = "head";
            } else if (
              snake.some((segment) => segment.x === x && segment.y === y)
            ) {
              type = "snake";
            }
            return <Cell key={`${x}-${y}`} type={type} />;
          }),
        )}
      </Board>
    </PageContainer>
  );
};

export default SnakeGame;
