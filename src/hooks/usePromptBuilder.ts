import { useState, useCallback, useMemo } from 'react'
import type { Selections, SelectionKey } from '../types'
import { categories } from '../data/presets'
import { formatPrompt } from '../utils/promptFormatter'

const initialSelections: Selections = {
  scene: '',
  camera: '',
  mood: '',
  colors: '',
  lighting: '',
  movement: '',
  weather: '',
  season: '',
  style: '',
}

export function usePromptBuilder() {
  const [selections, setSelections] = useState<Selections>(initialSelections)

  const updateSelection = useCallback((key: SelectionKey, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clearAll = useCallback(() => {
    setSelections(initialSelections)
  }, [])

  const randomizeAll = useCallback(() => {
    const newSelections: Selections = { ...initialSelections }

    for (const category of categories) {
      const presets = category.presets
      const randomIndex = Math.floor(Math.random() * presets.length)
      newSelections[category.id] = presets[randomIndex]
    }

    setSelections(newSelections)
  }, [])

  const prompt = useMemo(() => formatPrompt(selections), [selections])

  const hasSelections = useMemo(
    () => Object.values(selections).some((v) => v.trim() !== ''),
    [selections]
  )

  return {
    selections,
    updateSelection,
    clearAll,
    randomizeAll,
    prompt,
    hasSelections,
  }
}
