import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SnakeGame from "./SnakeGame";

// TODO add more tests to ensure the game works as expected
test("renders the snake game", () => {
  render(<SnakeGame />);
  const headingElement = screen.getByText(/snake game/i);
  expect(headingElement).toBeInTheDocument();
});
