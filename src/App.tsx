import { useState } from 'react'
import { PromptBuilder } from './components/PromptBuilder'
import { SlotMachine } from './components/SlotMachine'
import { PromptOutput } from './components/PromptOutput'
import { usePromptBuilder } from './hooks/usePromptBuilder'
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
            Create loopable video clip prompts for Veo 3.1
          </p>
        </header>

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
      </div>
    </div>
  )
}

export default App
