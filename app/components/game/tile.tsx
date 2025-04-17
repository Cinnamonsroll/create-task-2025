import { useGame } from "@/app/GameContext";
import { isWin } from "@/app/utils/board";
import { theme } from "@/app/utils/theme";
import { moveTile } from "@/app/utils/tile";
import { Dispatch, SetStateAction } from "react";

interface TileProps {
  value: number | null;
  grid: (number | null)[];
  setGrid: Dispatch<SetStateAction<(number | null)[] | null>>;
  index: number;
  handleMove: () => void;
}

export default function Tile({
  value,
  grid,
  setGrid,
  index,
  handleMove,
}: TileProps) {
  return value === null ? (
    <EmptyTile />
  ) : (
    <InnerTile
      number={value}
      grid={grid}
      setGrid={setGrid}
      index={index}
      handleMove={handleMove}
    />
  );
}

function InnerTile({
  number,
  grid,
  setGrid,
  index,
  handleMove,
}: {
  number: number;
  grid: (number | null)[];
  setGrid: Dispatch<SetStateAction<(number | null)[] | null>>;
  index: number;
  handleMove: () => void;
}) {
  const gridSize = Math.sqrt(grid.length);
  const backgroundColor = theme.getColor(index, number, gridSize);
  const game = useGame();
  const handleTileClick = () => {
    moveTile(grid, index, (newGrid) => {
      setGrid(newGrid);
      if (typeof window !== "undefined") {
        if (isWin(newGrid)) {
          game.setIsPlaying(false);
          game.setHasWon(true);
        }
      }
      handleMove();
    });
  };

  return (
    <div
      onClick={handleTileClick}
      style={{
        backgroundColor,
        color: theme.colors.tileText,
      }}
      className="flex items-center justify-center p-3 rounded-lg hover:cursor-pointer select-none"
    >
      <p className="text-3xl font-bold">{number}</p>
    </div>
  );
}

function EmptyTile() {
  return (
    <div
      style={{
        backgroundColor: theme.colors.emptyTile,
        aspectRatio: "1 / 1",
        width: "100%",
      }}
      className="flex items-center justify-center rounded-lg"
    />
  );
}
