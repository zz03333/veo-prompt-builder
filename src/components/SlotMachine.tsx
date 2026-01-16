interface SlotMachineProps {
  onSpin: () => void
  onClear: () => void
  isSpinning: boolean
  hasSelections: boolean
}

export function SlotMachine({
  onSpin,
  onClear,
  isSpinning,
  hasSelections,
}: SlotMachineProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8">
      <button
        onClick={onSpin}
        disabled={isSpinning}
        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all
                   flex items-center gap-3 shadow-lg
                   ${
                     isSpinning
                       ? 'bg-purple-800 cursor-wait'
                       : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-105 active:scale-95'
                   }`}
      >
        <span className={`text-2xl ${isSpinning ? 'animate-spin' : ''}`}>
          {isSpinning ? '⚡' : '🎰'}
        </span>
        {isSpinning ? 'Spinning...' : 'Spin for Inspiration'}
      </button>

      {hasSelections && (
        <button
          onClick={onClear}
          disabled={isSpinning}
          className="px-6 py-4 rounded-xl font-medium text-slate-400
                     border border-slate-600 hover:border-slate-500
                     hover:text-slate-300 transition-all"
        >
          Clear All
        </button>
      )}
    </div>
  )
}
