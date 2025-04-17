// Type alias for the grid, which is an array of numbers or null (empty tile)
type Grid = (number | null)[];

// Fisher-Yates shuffle to randomize an array
export const shuffle = <T>(arr: T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
};

// Count the number of inversions in the array (used to determine solvability)
function countInversions(arr: number[]): number {
  const tmp = new Array(arr.length);
  return mergeSort(arr, tmp, 0, arr.length - 1);
}

// Helper function for merge sort that counts inversions
function mergeSort(arr: number[], tmp: number[], l: number, r: number): number {
  if (l >= r) return 0;
  const m = (l + r) >> 1;
  let inv = mergeSort(arr, tmp, l, m) + mergeSort(arr, tmp, m + 1, r);
  let i = l,
    j = m + 1,
    k = l;
  while (i <= m && j <= r) {
    if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
    else {
      tmp[k++] = arr[j++];
      inv += m - i + 1;
    }
  }
  while (i <= m) tmp[k++] = arr[i++];
  while (j <= r) tmp[k++] = arr[j++];
  for (i = l; i <= r; i++) arr[i] = tmp[i];
  return inv;
}

// Determines if a given grid is solvable based on inversion count and blank position
export function isSolvable(grid: Grid): boolean {
  const size = Math.sqrt(grid.length);
  if ((size | 0) !== size) throw "Grid must be square";

  // Flatten grid and remove null (empty tile)
  const flat: number[] = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] !== null) flat.push(grid[i] as number);
  }

  const inv = countInversions(flat);
  const blank = grid.indexOf(null);
  const rowFromBottom = size - ((blank / size) | 0);

  // Solvability rules differ for odd/even grid sizes
  return size & 1
    ? (inv & 1) === 0
    : rowFromBottom & 1
    ? (inv & 1) === 0
    : (inv & 1) === 1;
}

// Generates a random, solvable grid from an ordered grid
export const generateSolvableGrid = (ordered: Grid): Grid => {
  const g = shuffle(ordered);

  // If not solvable, swap two non-null tiles to make it solvable
  if (!isSolvable(g)) {
    let a = 0,
      b = 1;
    while (g[a] === null || g[b] === null || a === b) {
      a = (Math.random() * g.length) | 0;
      b = (Math.random() * g.length) | 0;
    }
    [g[a], g[b]] = [g[b], g[a]];
  }

  return g;
};

// Checks if the grid is in a winning state (tiles in order, last is null)
export function isWin(grid: (number | null)[]): boolean {
  if (!grid) return false;
  
  const size = grid.length;
  if (grid[size - 1] !== null) return false;
  for (let i = 0; i < size - 1; i++) {
    if (grid[i] !== i + 1) return false;
  }
  
  return true;
}