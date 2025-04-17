'use client';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { theme } from '@/app/utils/theme';
import { useGame } from '@/app/GameContext';
import { formatTime } from '@/app/utils';

interface CelebrationProps {
  isVisible: boolean;
  moves: number;
  onClose: () => void;
}

export default function Celebration({
  isVisible,
  moves,
  onClose,
}: CelebrationProps) {
  const {
    time
  } = useGame();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMPS = () => {
    const [min, sec] = formatTime(time).split(':').map(Number);
    const totalSeconds = min * 60 + sec;
    return totalSeconds > 0 ? (moves / totalSeconds).toFixed(2) : '0.00';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
      />
      <div
        className="bg-opacity-90 p-6 rounded-2xl shadow-lg text-center z-10 max-w-sm w-full"
        style={{ backgroundColor: theme.colors.emptyTile }}
      >
        <h2
          className="text-3xl font-bold mb-3"
          style={{ color: theme.colors.tileText }}
        >
          🎉 Congratulations!
        </h2>
        <p
          className="text-lg mb-4"
          style={{ color: theme.colors.tileText }}
        >
          You solved the puzzle!
        </p>
        <div className="flex justify-center gap-8 my-4">
          <div>
            <p className="text-sm" style={{ color: theme.colors.tileText }}>
              Moves
            </p>
            <p className="text-2xl font-mono font-bold" style={{ color: theme.colors.tileText }}>
              {moves}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: theme.colors.tileText }}>
              Time
            </p>
            <p className="text-2xl font-mono font-bold" style={{ color: theme.colors.tileText }}>
              {formatTime(time)}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: theme.colors.tileText }}>
              MPS
            </p>
            <p className="text-2xl font-mono font-bold" style={{ color: theme.colors.tileText }}>
              {getMPS()}
            </p>
          </div>
        </div>
        <button
        aria-label="Play Again"
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-md transition-colors"
          style={{
            backgroundColor: theme.colors.board,
            color: theme.colors.tileText,
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
