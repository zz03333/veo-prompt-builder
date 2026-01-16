interface MusicControlsProps {
  onSync: () => void
  onRandomize: () => void
  onClear: () => void
  hasVideoMood: boolean
  hasMusicSelections: boolean
}

export function MusicControls({
  onSync,
  onRandomize,
  onClear,
  hasVideoMood,
  hasMusicSelections,
}: MusicControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-4">
      <button
        onClick={onSync}
        disabled={!hasVideoMood}
        title={hasVideoMood ? 'Sync with video mood' : 'Select a video mood first'}
        className={`px-5 py-2.5 rounded-lg font-medium transition-all
                   flex items-center gap-2
                   ${
                     hasVideoMood
                       ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white'
                       : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                   }`}
      >
        <SyncIcon />
        Sync with Video
      </button>

      <button
        onClick={onRandomize}
        className="px-5 py-2.5 rounded-lg font-medium transition-all
                   bg-gradient-to-r from-orange-600 to-pink-600
                   hover:from-orange-500 hover:to-pink-500 text-white
                   flex items-center gap-2"
      >
        <DiceIcon />
        Random Music
      </button>

      {hasMusicSelections && (
        <button
          onClick={onClear}
          className="px-5 py-2.5 rounded-lg font-medium transition-all
                     border border-slate-600 hover:border-slate-500
                     text-slate-400 hover:text-slate-300"
        >
          Clear
        </button>
      )}
    </div>
  )
}

function SyncIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}

function DiceIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  )
}
