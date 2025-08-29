import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/tic tac toe/i);
  expect(titleElement).toBeInTheDocument();
});

test('shows next player status', () => {
  render(<App />);
  const statusElement = screen.getByText(/next player: x/i);
  expect(statusElement).toBeInTheDocument();
});

test('clicking restart button resets the game', () => {
  render(<App />);
  const restartButton = screen.getByText(/restart game/i);
  expect(restartButton).toBeInTheDocument();
  
  // Click a square and verify X appears
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');
  
  // Click restart and verify square is empty
  fireEvent.click(restartButton);
  expect(squares[0]).toHaveTextContent('');
});
