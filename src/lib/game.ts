export type Player = 'X' | 'O';
export type Cell = Player | null;
export type BoardState = Cell[];

export type WinningLine = [number, number, number] | null;

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'pvp' | 'cpu';

export const WINNING_COMBINATIONS: [number, number, number][] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(
  board: BoardState
): {
  winner: Player | null;
  line: WinningLine;
} {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (
      board[a] !== null &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return {
        winner: board[a],
        line: [a, b, c],
      };
    }
  }

  return {
    winner: null,
    line: null,
  };
}

export function isDraw(board: BoardState): boolean {
  const { winner } = calculateWinner(board);

  return (
    winner === null &&
    board.every((cell) => cell !== null)
  );
}

function getAvailableMoves(
  board: BoardState
): number[] {
  return board.reduce<number[]>(
    (moves, cell, index) => {
      if (cell === null) {
        moves.push(index);
      }

      return moves;
    },
    []
  );
}

function minimax(
  board: BoardState,
  isMaximizing: boolean,
  depth = 0
): number {
  const { winner } = calculateWinner(board);

  // AI wins
  if (winner === 'O') {
    return 10 - depth;
  }

  // Human wins
  if (winner === 'X') {
    return depth - 10;
  }

  // Draw
  if (isDraw(board)) {
    return 0;
  }

  const moves = getAvailableMoves(board);

  // Computer O tries to maximize score
  if (isMaximizing) {
    let bestScore = -Infinity;

    for (const move of moves) {
      const newBoard = [...board] as BoardState;

      newBoard[move] = 'O';

      const score = minimax(
        newBoard,
        false,
        depth + 1
      );

      bestScore = Math.max(
        bestScore,
        score
      );
    }

    return bestScore;
  }

  // Human X tries to minimize score
  let bestScore = Infinity;

  for (const move of moves) {
    const newBoard = [...board] as BoardState;

    newBoard[move] = 'X';

    const score = minimax(
      newBoard,
      true,
      depth + 1
    );

    bestScore = Math.min(
      bestScore,
      score
    );
  }

  return bestScore;
}

function getBestMove(
  board: BoardState
): number {
  const moves = getAvailableMoves(board);

  if (moves.length === 0) {
    return -1;
  }

  let bestScore = -Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    const newBoard = [...board] as BoardState;

    // AI is O
    newBoard[move] = 'O';

    const score = minimax(
      newBoard,
      false
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

function getRandomMove(
  board: BoardState
): number {
  const moves = getAvailableMoves(board);

  if (moves.length === 0) {
    return -1;
  }

  const randomIndex = Math.floor(
    Math.random() * moves.length
  );

  return moves[randomIndex];
}

export function getAIMove(
  board: BoardState,
  difficulty: Difficulty
): number {
  const moves = getAvailableMoves(board);

  if (moves.length === 0) {
    return -1;
  }

  switch (difficulty) {
    case 'easy':
      // 15% optimal
      // 85% random
      return Math.random() < 0.15
        ? getBestMove(board)
        : getRandomMove(board);

    case 'medium':
      // 60% optimal
      // 40% random
      return Math.random() < 0.6
        ? getBestMove(board)
        : getRandomMove(board);

    case 'hard':
      // Always optimal
      return getBestMove(board);

    default:
      return getRandomMove(board);
  }
}