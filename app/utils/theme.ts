export const theme = {
  colors: {
    board: "#1e1e1e",
    emptyTile: "#2b2b2b",
    background: "#121212",
    tileText: "#f5f5f5",
    emptyTileText: "#808080",
    tileColors: [
      "#333333",
      "#444444",
      "#555555",
      "#666666",
      "#777777",
      "#888888",
      "#999999",
      "#aaaaaa",
      "#bbbbbb",
      "#cccccc",
      "#dddddd",
      "#444444",
      "#555555",
      "#666666",
      "#777777",
      "#888888",
    ],
  },
  getColor: function (index: number, value: number, gridSize = 4): string {
    const colorIndex = ((value - 1) / gridSize | 0) % this.colors.tileColors.length;
    return this.colors.tileColors[colorIndex];
  },
};
