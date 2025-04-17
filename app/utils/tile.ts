// Moves a tile in the grid if the move is valid (row or column with the empty space)
export function moveTile(
    grid: (number | null)[],
    index: number,
    setGrid: (newGrid: (number | null)[]) => void
  ): void {
    const size = Math.sqrt(grid.length); // Calculate grid size (assumes square)
    const row = Math.floor(index / size); // Row of the clicked tile
    const col = index % size; // Column of the clicked tile
  
    const emptyIndex = grid.indexOf(null); // Find the empty tile
    if (emptyIndex === -1) return; // No empty tile found
  
    const emptyRow = Math.floor(emptyIndex / size); // Row of the empty tile
    const emptyCol = emptyIndex % size; // Column of the empty tile
  
    // Only allow moves in the same row or column as the empty tile
    if (row !== emptyRow && col !== emptyCol) return;
  
    const newGrid = grid.slice(); // Copy the grid for immutability
  
    if (row === emptyRow) {
      // Move horizontally (same row)
      const step = emptyCol > col ? -1 : 1;
      for (let c = emptyCol; c !== col; c += step) {
        newGrid[row * size + c] = newGrid[row * size + c + step];
      }
      newGrid[row * size + col] = null; // Set the new empty position
    } else {
      // Move vertically (same column)
      const step = emptyRow > row ? -1 : 1;
      for (let r = emptyRow; r !== row; r += step) {
        newGrid[r * size + col] = newGrid[(r + step) * size + col];
      }
      newGrid[row * size + col] = null; // Set the new empty position
    }
  
    setGrid(newGrid); // Update the grid state
  }
  