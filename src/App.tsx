import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import {
  RefreshCcw,
  Trash2,
  X,
  Circle,
  Users,
  Monitor,
  ChevronLeft,
  Cpu,
} from 'lucide-react';

import {
  calculateWinner,
  isDraw,
  getAIMove,
} from './lib/game';

import type {
  BoardState,
  Difficulty,
  GameMode,
} from './lib/game';

// ============================================================
// TYPES
// ============================================================

interface Scores {
  x: number;
  o: number;
  draws: number;
}

type Screen = 'mode' | 'difficulty' | 'game';

// ============================================================
// MODE SELECTION SCREEN
// ============================================================

function ModeScreen({
  onSelect,
}: {
  onSelect: (mode: GameMode) => void;
}) {
  return (
    <motion.div
      key="mode"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm flex flex-col items-center gap-10"
    >
      {/* Heading */}

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground/90">
          Tic Tac Toe
        </h1>

        <p className="text-muted-foreground text-sm">
          Choose how you want to play
        </p>
      </div>

      {/* Game modes */}

      <div className="flex flex-col gap-4 w-full">

        {/* Player vs Player */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect('pvp')}
          className="
            flex items-center gap-5 w-full
            bg-card
            border-2 border-card-border
            rounded-2xl
            px-6 py-5
            text-left
            shadow-sm
            hover:border-primary/40
            hover:shadow-md
            transition-all duration-200
            group
          "
        >
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              rounded-xl
              bg-primary/10
              text-primary
              shrink-0
              group-hover:bg-primary/15
              transition-colors
            "
          >
            <Users className="w-6 h-6" />
          </div>

          <div>
            <div className="font-semibold text-foreground text-lg leading-tight">
              Player vs Player
            </div>

            <div className="text-muted-foreground text-sm mt-0.5">
              Two players on the same device
            </div>
          </div>
        </motion.button>

        {/* Player vs Computer */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect('cpu')}
          className="
            flex items-center gap-5 w-full
            bg-card
            border-2 border-card-border
            rounded-2xl
            px-6 py-5
            text-left
            shadow-sm
            hover:border-secondary/40
            hover:shadow-md
            transition-all duration-200
            group
          "
        >
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              rounded-xl
              bg-secondary/10
              text-secondary
              shrink-0
              group-hover:bg-secondary/15
              transition-colors
            "
          >
            <Monitor className="w-6 h-6" />
          </div>

          <div>
            <div className="font-semibold text-foreground text-lg leading-tight">
              Player vs Computer
            </div>

            <div className="text-muted-foreground text-sm mt-0.5">
              Play against an AI opponent
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================
// DIFFICULTY SETTINGS
// ============================================================

const DIFFICULTIES: {
  value: Difficulty;
  label: string;
  desc: string;
  color: string;
}[] = [
  {
    value: 'easy',
    label: 'Easy',
    desc: 'Makes mistakes — great for beginners',
    color:
      'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    value: 'medium',
    label: 'Medium',
    desc: 'A balanced challenge',
    color:
      'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    value: 'hard',
    label: 'Hard',
    desc: 'Plays perfectly — can you draw?',
    color:
      'text-rose-600 bg-rose-50 border-rose-200',
  },
];

// ============================================================
// DIFFICULTY SCREEN
// ============================================================

function DifficultyScreen({
  onSelect,
  onBack,
}: {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="difficulty"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm flex flex-col items-center gap-10"
    >
      {/* Header */}

      <div className="flex flex-col items-center gap-2 w-full">

        <button
          onClick={onBack}
          className="
            flex items-center gap-1
            text-muted-foreground
            hover:text-foreground
            text-sm
            self-start
            mb-2
            transition-colors
          "
        >
          <ChevronLeft className="w-4 h-4" />

          Back
        </button>

        <h1 className="text-4xl font-bold tracking-tight text-foreground/90">
          Difficulty
        </h1>

        <p className="text-muted-foreground text-sm">
          You play as X — Computer plays as O
        </p>
      </div>

      {/* Difficulty buttons */}

      <div className="flex flex-col gap-4 w-full">

        {DIFFICULTIES.map(
          ({
            value,
            label,
            desc,
            color,
          }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(value)}
              className="
                flex items-center gap-5
                w-full
                bg-card
                border-2 border-card-border
                rounded-2xl
                px-6 py-5
                text-left
                shadow-sm
                hover:shadow-md
                hover:border-border
                transition-all duration-200
                group
              "
            >
              <div
                className={`
                  flex items-center justify-center
                  w-12 h-12
                  rounded-xl
                  border-2
                  shrink-0
                  ${color}
                `}
              >
                <Cpu className="w-5 h-5" />
              </div>

              <div>
                <div className="font-semibold text-foreground text-lg leading-tight">
                  {label}
                </div>

                <div className="text-muted-foreground text-sm mt-0.5">
                  {desc}
                </div>
              </div>
            </motion.button>
          )
        )}

      </div>
    </motion.div>
  );
}

// ============================================================
// GAME BOARD
// ============================================================

function GameBoard({
  mode,
  difficulty,
  onBack,
}: {
  mode: GameMode;
  difficulty: Difficulty | null;
  onBack: () => void;
}) {

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------

  const [board, setBoard] =
    useState<BoardState>(Array(9).fill(null));

  const [xIsNext, setXIsNext] =
    useState(true);

  const [scores, setScores] =
    useState<Scores>({
      x: 0,
      o: 0,
      draws: 0,
    });

  const [isThinking, setIsThinking] =
    useState(false);

  // ----------------------------------------------------------
  // Winner / draw detection
  // ----------------------------------------------------------

  const { winner, line } =
    calculateWinner(board);

  const draw =
    !winner && isDraw(board);

  const isGameOver =
    Boolean(winner) || draw;

  // ----------------------------------------------------------
  // CPU turn
  // ----------------------------------------------------------

  const isCpuTurn =
    mode === 'cpu' &&
    !xIsNext &&
    !isGameOver;

  // ----------------------------------------------------------
  // Commit move
  // ----------------------------------------------------------

  const commitMove = useCallback(
    (
      index: number,
      currentBoard: BoardState,
      currentXIsNext: boolean
    ) => {

      const newBoard =
        [...currentBoard] as BoardState;

      newBoard[index] =
        currentXIsNext ? 'X' : 'O';

      setBoard(newBoard);

      const { winner: newWinner } =
        calculateWinner(newBoard);

      const newDraw =
        !newWinner && isDraw(newBoard);

      // X wins

      if (newWinner === 'X') {
        setScores((previous) => ({
          ...previous,
          x: previous.x + 1,
        }));

        return;
      }

      // O wins

      if (newWinner === 'O') {
        setScores((previous) => ({
          ...previous,
          o: previous.o + 1,
        }));

        return;
      }

      // Draw

      if (newDraw) {
        setScores((previous) => ({
          ...previous,
          draws: previous.draws + 1,
        }));

        return;
      }

      // Continue game

      setXIsNext(!currentXIsNext);
    },
    []
  );

  // ----------------------------------------------------------
  // Human click
  // ----------------------------------------------------------

  const handleClick = (
    index: number
  ) => {

    if (board[index]) return;

    if (isGameOver) return;

    if (isThinking) return;

    if (isCpuTurn) return;

    commitMove(
      index,
      board,
      xIsNext
    );
  };

  // ----------------------------------------------------------
  // Computer AI
  // ----------------------------------------------------------

  useEffect(() => {

    if (
      !isCpuTurn ||
      !difficulty
    ) {
      return;
    }

    setIsThinking(true);

    let cancelled = false;

    // Small random delay makes the computer
    // feel more natural.

    const delay =
      400 + Math.random() * 350;

    const timer =
      window.setTimeout(() => {

        if (cancelled) {
          return;
        }

        const aiIndex =
          getAIMove(
            board,
            difficulty
          );

        if (aiIndex !== -1) {
          commitMove(
            aiIndex,
            board,
            false
          );
        }

        setIsThinking(false);

      }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };

  }, [
    isCpuTurn,
    board,
    difficulty,
    commitMove,
  ]);

  // ----------------------------------------------------------
  // Reset current game
  // ----------------------------------------------------------

  const resetGame = () => {

    setBoard(
      Array(9).fill(null)
    );

    setXIsNext(true);

    setIsThinking(false);
  };

  // ----------------------------------------------------------
  // Reset scores
  // ----------------------------------------------------------

  const resetScores = () => {

    setScores({
      x: 0,
      o: 0,
      draws: 0,
    });

    resetGame();
  };

  // ----------------------------------------------------------
  // Player labels
  // ----------------------------------------------------------

  const currentPlayer =
    xIsNext ? 'X' : 'O';

  const xLabel =
    'Player X';

  const oLabel =
    mode === 'cpu'
      ? 'Computer'
      : 'Player O';

  // ----------------------------------------------------------
  // Status message
  // ----------------------------------------------------------

  let statusText: ReactNode;

  if (isGameOver) {

    if (winner === 'X') {

      statusText =
        `${xLabel} Wins!`;

    } else if (winner === 'O') {

      statusText =
        `${oLabel} Wins!`;

    } else {

      statusText =
        "It's a Draw!";
    }

  } else if (isThinking) {

    statusText =
      'Computer is thinking…';

  } else {

    const label =
      xIsNext
        ? xLabel
        : oLabel;

    statusText = (
      <span className="flex items-center gap-1.5">

        {label}&rsquo;s turn

        <span
          className={
            xIsNext
              ? 'text-primary'
              : 'text-secondary'
          }
        >
          {xIsNext ? (
            <X className="w-4 h-4 stroke-[3] inline" />
          ) : (
            <Circle className="w-4 h-4 stroke-[3] inline" />
          )}
        </span>

      </span>
    );
  }

  // ----------------------------------------------------------
  // Difficulty label
  // ----------------------------------------------------------

  const difficultyLabel =
    difficulty
      ? DIFFICULTIES.find(
          (item) =>
            item.value === difficulty
        )?.label
      : null;

  // ==========================================================
  // GAME UI
  // ==========================================================

  return (
    <motion.div
      key="game"
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -24,
      }}
      transition={{
        duration: 0.3,
      }}
      className="w-full max-w-md flex flex-col gap-7"
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col items-center gap-1">

        <button
          onClick={onBack}
          className="
            flex items-center gap-1
            text-muted-foreground
            hover:text-foreground
            text-sm
            self-start
            mb-1
            transition-colors
          "
        >
          <ChevronLeft className="w-4 h-4" />

          Change Mode
        </button>

        <div className="flex items-center gap-2">

          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
            Tic Tac Toe
          </h1>

          {/* CPU difficulty badge */}

          {mode === 'cpu' &&
            difficultyLabel && (

              <span
                className="
                  text-xs
                  font-medium
                  px-2 py-0.5
                  rounded-full
                  bg-muted
                  text-muted-foreground
                  border border-border
                "
              >
                {difficultyLabel}
              </span>
            )}

          {/* PvP badge */}

          {mode === 'pvp' && (

            <span
              className="
                text-xs
                font-medium
                px-2 py-0.5
                rounded-full
                bg-muted
                text-muted-foreground
                border border-border
              "
            >
              PvP
            </span>
          )}

        </div>
      </div>

      {/* ======================================================
          SCOREBOARD
      ====================================================== */}

      <div
        className="
          flex
          w-full
          justify-between
          items-center
          bg-card
          rounded-2xl
          p-4
          shadow-sm
          border border-card-border
        "
      >

        {/* X score */}

        <div className="flex flex-col items-center flex-1">

          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {xLabel}
          </span>

          <span className="text-2xl font-bold text-primary">
            {scores.x}
          </span>

        </div>

        {/* Draw score */}

        <div className="flex flex-col items-center px-4 border-x border-border/50">

          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Draws
          </span>

          <span className="text-xl font-semibold text-foreground/70">
            {scores.draws}
          </span>

        </div>

        {/* O score */}

        <div className="flex flex-col items-center flex-1">

          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {oLabel}
          </span>

          <span className="text-2xl font-bold text-secondary">
            {scores.o}
          </span>

        </div>

      </div>

      {/* ======================================================
          GAME STATUS
      ====================================================== */}

      <div className="h-12 relative flex justify-center items-center">

        <AnimatePresence mode="wait">

          <motion.div
            key={
              isGameOver
                ? 'over'
                : isThinking
                  ? 'thinking'
                  : currentPlayer
            }
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.2,
            }}
            className={`
              flex
              items-center
              gap-2
              text-base
              font-medium
              px-5 py-2
              rounded-full
              shadow-sm
              border

              ${
                isGameOver
                  ? winner === 'X'
                    ? 'bg-primary/10 text-primary border-primary/20 text-lg font-bold'
                    : winner === 'O'
                      ? 'bg-secondary/10 text-secondary border-secondary/20 text-lg font-bold'
                      : 'bg-muted text-foreground border-border text-lg font-bold'
                  : 'bg-card text-foreground border-border'
              }
            `}
          >
            {statusText}

          </motion.div>

        </AnimatePresence>

      </div>

      {/* ======================================================
          TIC TAC TOE BOARD
      ====================================================== */}

      <div className="grid grid-cols-3 gap-3 mx-auto w-full max-w-[320px] aspect-square">

        {board.map(
          (cell, index) => {

            const isWinningCell =
              line?.includes(index);

            const isClickable =
              !cell &&
              !isGameOver &&
              !isThinking &&
              !isCpuTurn;

            return (

              <button
                key={index}
                onClick={() =>
                  handleClick(index)
                }
                disabled={!isClickable}
                aria-label={`Cell ${index + 1}`}
                className={`
                  relative
                  flex
                  items-center
                  justify-center

                  bg-card

                  rounded-xl

                  border-2

                  shadow-sm

                  transition-all
                  duration-200
                  ease-out

                  ${
                    isClickable
                      ? 'hover:bg-accent cursor-pointer hover:border-border/80 border-card-border'
                      : 'cursor-default border-card-border'
                  }

                  ${
                    isWinningCell &&
                    winner === 'X'
                      ? '!border-primary bg-primary/5 shadow-primary/20'
                      : ''
                  }

                  ${
                    isWinningCell &&
                    winner === 'O'
                      ? '!border-secondary bg-secondary/5 shadow-secondary/20'
                      : ''
                  }
                `}
              >

                {/* Winning-cell animation */}

                {isWinningCell && (

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [
                        0,
                        0.45,
                        0,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className={`
                      absolute
                      inset-0
                      rounded-xl

                      ${
                        winner === 'X'
                          ? 'bg-primary/20'
                          : 'bg-secondary/20'
                      }
                    `}
                  />

                )}

                {/* X / O animation */}

                <AnimatePresence>

                  {cell && (

                    <motion.div
                      initial={{
                        scale: 0,
                        opacity: 0,
                        rotate: -15,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 22,
                      }}
                      className={`
                        relative
                        z-10

                        ${
                          cell === 'X'
                            ? 'text-primary'
                            : 'text-secondary'
                        }
                      `}
                    >

                      {cell === 'X' ? (

                        <X className="w-16 h-16 stroke-[2.5]" />

                      ) : (

                        <Circle className="w-14 h-14 stroke-[3]" />

                      )}

                    </motion.div>

                  )}

                </AnimatePresence>

                {/* CPU thinking animation */}

                {isThinking &&
                  !cell && (

                    <motion.div
                      animate={{
                        opacity: [
                          0.04,
                          0.12,
                          0.04,
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="
                        absolute
                        inset-0
                        rounded-xl
                        bg-secondary
                      "
                    />

                  )}

              </button>

            );
          }
        )}

      </div>

      {/* ======================================================
          GAME CONTROLS
      ====================================================== */}

      <div className="flex justify-center gap-4 flex-wrap">

        {/* Play again */}

        <button
          onClick={resetGame}
          className="
            flex
            items-center
            gap-2
            px-6 py-3
            bg-foreground
            text-background
            font-medium
            rounded-full
            hover:bg-foreground/90
            transition-colors
            active:scale-95
          "
        >
          <RefreshCcw className="w-4 h-4" />

          Play Again
        </button>

        {/* Reset score */}

        <button
          onClick={resetScores}
          className="
            flex
            items-center
            gap-2
            px-6 py-3
            bg-muted
            text-muted-foreground
            font-medium
            rounded-full
            hover:bg-accent
            hover:text-foreground
            transition-colors
            active:scale-95
          "
        >
          <Trash2 className="w-4 h-4" />

          Reset Scores
        </button>

      </div>

    </motion.div>
  );
}

// ============================================================
// ROOT APP
// ============================================================

export default function App() {

  const [screen, setScreen] =
    useState<Screen>('mode');

  const [mode, setMode] =
    useState<GameMode>('pvp');

  const [difficulty, setDifficulty] =
    useState<Difficulty | null>(null);

  // ----------------------------------------------------------
  // Select game mode
  // ----------------------------------------------------------

  const handleModeSelect = (
    selectedMode: GameMode
  ) => {

    setMode(selectedMode);

    if (selectedMode === 'pvp') {

      setDifficulty(null);

      setScreen('game');

    } else {

      setScreen('difficulty');
    }
  };

  // ----------------------------------------------------------
  // Select AI difficulty
  // ----------------------------------------------------------

  const handleDifficultySelect = (
    selectedDifficulty: Difficulty
  ) => {

    setDifficulty(
      selectedDifficulty
    );

    setScreen('game');
  };

  // ----------------------------------------------------------
  // Back to mode selection
  // ----------------------------------------------------------

  const handleBack = () => {
    setScreen('mode');
  };

  // ==========================================================
  // APP UI
  // ==========================================================

  return (

    <div
      className="
        min-h-[100dvh]
        w-full
        flex
        flex-col
        items-center
        justify-center
        p-6
        bg-background
      "
    >

      <AnimatePresence mode="wait">

        {/* Mode selection */}

        {screen === 'mode' && (

          <ModeScreen
            key="mode"
            onSelect={handleModeSelect}
          />

        )}

        {/* Difficulty selection */}

        {screen === 'difficulty' && (

          <DifficultyScreen
            key="difficulty"
            onSelect={
              handleDifficultySelect
            }
            onBack={handleBack}
          />

        )}

        {/* Game */}

        {screen === 'game' && (

          <GameBoard
            key={`game-${mode}-${difficulty ?? 'none'}`}
            mode={mode}
            difficulty={difficulty}
            onBack={() =>
              setScreen('mode')
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}