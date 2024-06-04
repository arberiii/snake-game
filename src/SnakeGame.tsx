import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import Board from "./Components/Board";
import Cell from "./Components/Cell";

type Position = { x: number; y: number };

const boardSize = 20;
const directions: Record<string, Position> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([
    { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) },
  ]);
  const [direction, setDirection] = useState(directions.ArrowRight);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (directions[e.key]) {
      setDirection(directions[e.key]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const moveSnake = () => {
      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      const newSnake = [newHead, ...snake];
      setSnake(newSnake);
    };

    const intervalId = setInterval(moveSnake, 200);

    return () => clearInterval(intervalId);
  }, [snake, direction]);

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

const PageContainer = styled.div`
  text-align: center;
`;

export default SnakeGame;
