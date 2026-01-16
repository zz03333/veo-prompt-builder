import { useState } from 'react'
import { PromptBuilder } from './components/PromptBuilder'
import { SlotMachine } from './components/SlotMachine'
import { PromptOutput } from './components/PromptOutput'
import { MusicBuilder } from './components/MusicBuilder'
import { MusicControls } from './components/MusicControls'
import { MusicPromptOutput } from './components/MusicPromptOutput'
import { usePromptBuilder } from './hooks/usePromptBuilder'
import { useMusicBuilder } from './hooks/useMusicBuilder'
import './index.css'

function App() {
  const {
    selections,
    updateSelection,
    clearAll,
    randomizeAll,
    prompt,
    hasSelections,
  } = usePromptBuilder()

  const {
    musicSelections,
    updateMusicSelection,
    clearMusic,
    randomizeMusic,
    syncWithVideo,
    musicPrompt,
    hasMusicSelections,
  } = useMusicBuilder(selections)

  const [isSpinning, setIsSpinning] = useState(false)

  const handleSpin = () => {
    setIsSpinning(true)

    // Simulate slot machine effect with multiple rapid changes
    let iterations = 0
    const maxIterations = 10
    const interval = setInterval(() => {
      randomizeAll()
      iterations++

      if (iterations >= maxIterations) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Video Prompt Improver
          </h1>
          <p className="text-slate-400 mt-2">
            Create loopable video + music prompts for Veo 3.1 & Suno
          </p>
        </header>

        {/* Video Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <VideoIcon />
            Video Prompt (Veo 3.1)
          </h2>

          <PromptBuilder
            selections={selections}
            onUpdateSelection={updateSelection}
            isSpinning={isSpinning}
          />

          <SlotMachine
            onSpin={handleSpin}
            onClear={clearAll}
            isSpinning={isSpinning}
            hasSelections={hasSelections}
          />

          <PromptOutput prompt={prompt} hasSelections={hasSelections} />
        </section>

        {/* Music Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-orange-300 mb-4 flex items-center gap-2">
            <MusicIcon />
            Music Prompt (Suno)
          </h2>

          <MusicBuilder
            selections={musicSelections}
            onUpdateSelection={updateMusicSelection}
          />

          <MusicControls
            onSync={syncWithVideo}
            onRandomize={randomizeMusic}
            onClear={clearMusic}
            hasVideoMood={!!selections.mood}
            hasMusicSelections={hasMusicSelections}
          />

          <MusicPromptOutput
            prompt={musicPrompt}
            hasSelections={hasMusicSelections}
          />
        </section>
      </div>
    </div>
  )
}

function VideoIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function MusicIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  )
}

export default App
