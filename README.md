# 🎮 Tic Tac Toe

A modern, responsive **Tic Tac Toe game** built with **React, TypeScript, Tailwind CSS, and Vite**.

The application supports both **Player vs Player** and **Player vs Computer** gameplay. The computer opponent includes three difficulty levels, with Hard mode using the **Minimax algorithm** to make optimal moves.

## ✨ Features

- 👥 Player vs Player mode
- 🤖 Player vs Computer mode
- 🎯 Three AI difficulty levels: Easy, Medium, and Hard
- 🧠 Minimax-based AI for Hard mode
- 📊 Score tracking for X, O, and draws
- 🏆 Winning-cell highlighting
- 🔄 Play Again functionality
- 🗑️ Reset Scores functionality
- 🎬 Smooth animations using Framer Motion
- 📱 Responsive user interface
- ⚡ Fast development and production builds with Vite

## 🤖 AI Difficulty Levels

### Easy

The computer mostly selects random moves but occasionally makes an optimal move.

### Medium

The computer combines random moves with Minimax-based optimal moves, providing a more balanced challenge.

### Hard

The computer uses the **Minimax algorithm** to determine the optimal move.

With perfect play, the Hard AI cannot be defeated. The best possible result against it is a draw.

## 🧠 Minimax Algorithm

Minimax is a decision-making algorithm commonly used in two-player turn-based games.

In this project:

- **X** represents the human player.
- **O** represents the computer.
- The computer attempts to maximize its score.
- The human player is treated as the minimizing player.
- Winning positions receive positive scores.
- Losing positions receive negative scores.
- Draws receive a score of zero.
- Search depth is considered so the AI prefers faster wins and delays unavoidable losses.

The algorithm recursively explores possible future board states before selecting the best available move.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface and component architecture |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive UI styling |
| Framer Motion | UI and game animations |
| Lucide React | Interface icons |
| Vite | Development server and build tool |
| Minimax | Hard-mode AI decision making |

## 📁 Project Structure

```text
tic-tac-toe/
├── public/
├── src/
│   ├── assets/
│   ├── lib/
│   │   └── game.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Important Files

**`src/App.tsx`**

Contains the main React interface, including:

- Mode selection
- Difficulty selection
- Game board
- Scoreboard
- Game controls
- Computer-turn handling
- Animations

**`src/lib/game.ts`**

Contains the core game logic, including:

- Winner detection
- Draw detection
- Available-move calculation
- Random AI moves
- Minimax algorithm
- Difficulty-based AI behavior

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/vanshantil/tic-tac-toe.git
```

### 2. Enter the project directory

```bash
cd tic-tac-toe
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local address displayed by Vite in your browser.

## 📦 Production Build

Create an optimized production build with:

```bash
npm run build
```

The generated production files are placed inside the `dist` directory.

## 🎮 How to Play

### Player vs Player

Select **Player vs Player** from the main menu.

Player X and Player O then alternate turns on the same device.

### Player vs Computer

Select:

**Player vs Computer → Difficulty → Easy / Medium / Hard**

You play as **X**, while the computer plays as **O**.

## 🔮 Possible Future Improvements

- Online multiplayer
- Player-name customization
- Dark mode
- Sound effects
- Match history
- AI statistics
- Best-of-three / best-of-five modes
- Persistent scores using local storage
- Authentication
- Global leaderboard

## 👨‍💻 Author

**Vansh Antil**

Computer Science Engineering — Artificial Intelligence & Data Science

## 📄 License

This project is intended for educational and portfolio purposes.