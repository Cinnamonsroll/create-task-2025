import { theme } from "@/app/utils/theme";
import Tile from "@/app/components/game/tile";
import { useGame } from "@/app/GameContext";

export default function Board() {
  const { boardSize, grid, setGrid, handleMove } = useGame();
  const gridSize = boardSize;

  if (!grid) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          backgroundColor: theme.colors.board,
        }}
        className="grid p-3 rounded-lg gap-3"
      >
        {grid.map((n, i) => (
          <Tile
            key={i}
            value={n}
            grid={grid}
            setGrid={setGrid}
            index={i}
            handleMove={handleMove}
          />
        ))}
      </div>
    </div>
  );
}
