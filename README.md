# Sliding Puzzle Game - AP Computer Science Principles Create Task 2025

## Project Overview

This sliding puzzle game was developed as a Create Task submission for the AP Computer Science Principles 2025 exam. The game implements a classic sliding puzzle (also known as an n-puzzle or 15-puzzle) where players rearrange scrambled numbered tiles into sequential order by sliding them into an empty space.

## Features

- **Adjustable Difficulty**: Choose from multiple board sizes (3×3 up to 8×8)
- **Move Counter**: Tracks the number of moves made during gameplay
- **Timer**: Records the time taken to solve the puzzle
- **Moves Per Second (MPS)**: Calculates efficiency by dividing moves by time
- **Solvability Algorithm**: Ensures every puzzle generated is solvable
- **Win Detection**: Automatically detects when the puzzle is solved
- **Celebration Screen**: Displays statistics and congratulates the player upon completion

## Demo Video

The repository includes `example.mp4`, a demonstration video that showcases the sliding puzzle game in action. This video demonstrates:

- The user interface and game board layout
- How to interact with the puzzle by sliding tiles
- The move counter and timer functionality
- The win detection and celebration screen

<video width="100%" controls>
  <source src="example.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

This video serves as a visual representation of the computational artifact created for the AP CSP Create Task, illustrating both the functionality and user experience of the application.

## Technologies Used

- **Next.js**: React framework for building the web application
- **TypeScript**: For type-safe code and better development experience
- **React Context API**: For global state management across components
- **Tailwind CSS**: For responsive and modern UI styling

## How to Run

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## AP CSP Create Task Requirements

### Program Purpose and Function
This program functions as an interactive sliding puzzle game that challenges users to arrange scrambled tiles in sequential order. When the program runs, it displays a randomized but solvable puzzle grid. The user interacts by clicking tiles adjacent to the empty space to slide them. The program tracks moves and time until the user successfully arranges all tiles in order.

### Algorithm Implementation
The program implements several key algorithms:

1. **Solvability Algorithm**: Uses inversion counting and merge sort to ensure that every randomly generated puzzle is solvable.
2. **Tile Movement Logic**: Determines valid moves by checking if a clicked tile is in the same row or column as the empty space.
3. **Win Detection**: Checks if all tiles are in sequential order with the empty space at the end.

### Abstraction
The program uses abstraction through:

1. **Component Architecture**: Breaking down the UI into reusable components (Board, Tile, Header, Celebration)
2. **Context API**: Abstracting game state management into a central GameContext
3. **Utility Functions**: Creating reusable functions for common operations like board generation and time formatting

### Data Management
The program manages data through:

1. **Grid State**: Representing the puzzle as a one-dimensional array with null representing the empty space
2. **Game Statistics**: Tracking moves, time, and game state
3. **Board Size Configuration**: Allowing users to customize difficulty by changing the grid dimensions

## Educational Value

This project demonstrates fundamental computer science concepts including:

- **Algorithm Design**: Implementing efficient algorithms for puzzle generation and solving
- **Data Structures**: Using arrays to represent and manipulate the game board
- **State Management**: Managing application state across multiple components
- **User Interface Design**: Creating an intuitive and responsive game interface
- **Problem Decomposition**: Breaking down complex functionality into manageable components
---

Developed for the AP Computer Science Principles Create Task 2025
