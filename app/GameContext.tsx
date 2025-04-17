"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import { generateSolvableGrid, isWin } from "@/app/utils/board";

interface GameContextType {
  boardSize: number;
  setBoardSize: (size: number) => void;
  grid: (number | null)[] | null;
  setGrid: React.Dispatch<React.SetStateAction<(number | null)[] | null>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  hasWon: boolean;
  setHasWon: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  hasStarted: boolean;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  handleMove: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const createOrderedGrid = (size: number) => [
  ...Array.from({ length: size - 1 }, (_, i) => i + 1),
  null,
];

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [boardSize, setBoardSize] = useState(4);
  const [grid, setGrid] = useState<(number | null)[] | null>(null);
  const [moves, setMoves] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const [time, setTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const orderedGrid = createOrderedGrid(boardSize ** 2);
    setGrid(generateSolvableGrid(orderedGrid));
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setHasWon(false);
    setHasStarted(false);
  }, [boardSize]);

  useEffect(() => {
    if (isPlaying && hasStarted) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, hasStarted]);

  const handleMove = () => {
    if (!hasStarted) setHasStarted(true);
    setMoves((prev) => prev + 1);
    if (grid && isWin(grid)) {
      setIsPlaying(false);
      setHasWon(true);
    }
  };

  const resetGame = () => {
    const orderedGrid = createOrderedGrid(boardSize ** 2);
    setGrid(generateSolvableGrid(orderedGrid));
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setHasWon(false);
    setHasStarted(false);
  };

  const value = useMemo(
    () => ({
      boardSize,
      setBoardSize,
      grid,
      setGrid,
      moves,
      setMoves,
      isPlaying,
      setIsPlaying,
      hasWon,
      setHasWon,
      time,
      setTime,
      hasStarted,
      setHasStarted,
      handleMove,
      resetGame,
    }),
    [
      boardSize,
      grid,
      moves,
      isPlaying,
      hasWon,
      time,
      hasStarted,
      setGrid,
      setMoves,
      setIsPlaying,
      setHasWon,
      setTime,
      setHasStarted,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
