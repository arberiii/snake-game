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

const generateRandomFoodPosition = (snake: Position[]): Position => {
  let newFoodPosition: Position;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (
    // Keep generating new food positions until one is found that is not on the snake
    snake.some(
      (segment) =>
        segment.x === newFoodPosition.x && segment.y === newFoodPosition.y,
    )
  );
  return newFoodPosition;
};

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([
    { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) },
  ]);
  const [direction, setDirection] = useState(directions.ArrowRight);
  const [food, setFood] = useState(generateRandomFoodPosition(snake));
  const [gameOver, setGameOver] = useState(false);

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
      if (gameOver) return;

      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      if (
        newHead.x < 0 ||
        newHead.x >= boardSize ||
        newHead.y < 0 ||
        newHead.y >= boardSize ||
        snake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        )
      ) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateRandomFoodPosition(newSnake));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const intervalId = setInterval(moveSnake, 200);

    return () => clearInterval(intervalId);
  }, [snake, direction, gameOver, food]);

  return (
    <PageContainer>
      <h1>Snake Game</h1>
      {gameOver ? <h2>Game Over</h2> : null}
      {gameOver ? <h2>Score: {snake.length - 1}</h2> : null}
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
            } else if (food.x === x && food.y === y) {
              type = "food";
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
