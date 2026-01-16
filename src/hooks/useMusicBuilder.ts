import { useState, useCallback, useMemo } from 'react'
import type { MusicSelections, MusicSelectionKey, Selections } from '../types'
import { musicCategories } from '../data/presets'
import {
  formatMusicPrompt,
  getSuggestedMusicFromVideo,
} from '../utils/musicPromptFormatter'

const initialMusicSelections: MusicSelections = {
  genre: '',
  tempo: '',
  instruments: '',
  vibe: '',
}

export function useMusicBuilder(videoSelections: Selections) {
  const [musicSelections, setMusicSelections] =
    useState<MusicSelections>(initialMusicSelections)

  const updateMusicSelection = useCallback(
    (key: MusicSelectionKey, value: string) => {
      setMusicSelections((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const clearMusic = useCallback(() => {
    setMusicSelections(initialMusicSelections)
  }, [])

  const randomizeMusic = useCallback(() => {
    const newSelections: MusicSelections = { ...initialMusicSelections }

    for (const category of musicCategories) {
      const presets = category.presets
      const randomIndex = Math.floor(Math.random() * presets.length)
      newSelections[category.id] = presets[randomIndex]
    }

    setMusicSelections(newSelections)
  }, [])

  const syncWithVideo = useCallback(() => {
    const suggestions = getSuggestedMusicFromVideo(videoSelections)
    setMusicSelections((prev) => ({
      ...prev,
      ...suggestions,
    }))
  }, [videoSelections])

  const musicPrompt = useMemo(
    () => formatMusicPrompt(musicSelections, videoSelections),
    [musicSelections, videoSelections]
  )

  const hasMusicSelections = useMemo(
    () => Object.values(musicSelections).some((v) => v.trim() !== ''),
    [musicSelections]
  )

  return {
    musicSelections,
    updateMusicSelection,
    clearMusic,
    randomizeMusic,
    syncWithVideo,
    musicPrompt,
    hasMusicSelections,
  }
}
