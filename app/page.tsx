"use client"
import { theme } from "@/app/utils/theme";
import Board from "@/app/components/game/board";
import Header from "@/app/components/game/header";
import Celebration from "@/app/components/game/celebration";
import { GameProvider, useGame } from "@/app/GameContext";

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

function GameContent() {
  const {
    moves,
    setIsPlaying,
    hasWon,
    setHasWon,
    setTime,
    setHasStarted,
    resetGame,
  } = useGame();

  

  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="flex flex-col items-center">
        <Header />
        <Board />
        <Celebration
          isVisible={hasWon}
          moves={moves}
          onClose={() => {
            setHasWon(false);
            resetGame();
            setTime(0);
            setIsPlaying(true);
            setHasStarted(false);
          }}
        />
      </div>
    </div>
  );
}
