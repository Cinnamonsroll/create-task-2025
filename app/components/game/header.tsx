"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, RefreshCcw, Clock, ChevronsRight } from "lucide-react";
import { theme } from "@/app/utils/theme";
import { useGame } from "@/app/GameContext";
import { formatTime } from "@/app/utils";

const sizes = [3, 4, 5, 6, 7, 8];

export default function Header() {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const {
    boardSize,
    setBoardSize,
    moves,
    resetGame,
    setIsPlaying,
    time,
    setTime,
  } = useGame();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSizeSelect = (size: number) => {
    setBoardSize(size);
    setTime(0);
    resetGame();
    setIsPlaying(true);
    setOpen(false);
  };

  return (
    <div
      className="w-full max-w-md px-3 py-2 rounded-xl mb-4 flex items-center justify-between gap-2"
      style={{ backgroundColor: theme.colors.board }}
    >
      {/* Custom Select */}
      <div className="relative" ref={selectRef}>
        <button
          aria-label="Board Size Selector"
          aria-expanded={open ? "true" : "false"}
          aria-haspopup="menu"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-md transition"
          style={{
            backgroundColor: theme.colors.emptyTile,
            color: theme.colors.tileText,
          }}
        >
          {boardSize}×{boardSize}
          <ChevronDown size={16} />
        </button>
        {open && (
          <div
            className="absolute mt-1 w-full rounded-md shadow-md z-10 overflow-hidden"
            style={{ backgroundColor: theme.colors.emptyTile }}
          >
            {sizes.map((size) => (
              <button
                aria-label={`${size}×${size} Board Size`}
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`w-full px-3 py-1 text-left text-sm transition ${
                  size === boardSize ? "bg-opacity-20" : ""
                }`}
                style={{
                  color: theme.colors.tileText,
                  backgroundColor:
                    size === boardSize ? theme.colors.board : "transparent",
                }}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Moves */}
      <div
        className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-mono"
        style={{
          backgroundColor: theme.colors.emptyTile,
          color: theme.colors.tileText,
        }}
      >
        <ChevronsRight size={16} />
        {moves}
      </div>

      {/* Time */}
      <div
        className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-mono"
        style={{
          backgroundColor: theme.colors.emptyTile,
          color: theme.colors.tileText,
        }}
      >
        <Clock size={16} />
        {formatTime(time)}
      </div>

      {/* Reset Icon */}
      <button
        onClick={() => {
          setTime(0);
          resetGame();
          setIsPlaying(true);
        }}
        aria-label="Reset Button"
        className="p-2 rounded-md transition"
        style={{
          backgroundColor: theme.colors.emptyTile,
          color: theme.colors.tileText,
        }}
      >
        <RefreshCcw size={16} />
      </button>
    </div>
  );
}
