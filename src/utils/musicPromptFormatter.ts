import type { Selections, MusicSelections } from '../types'
import { moodToMusicMap, sceneToSoundMap } from '../data/presets'

export function getSuggestedMusicFromVideo(videoSelections: Selections): Partial<MusicSelections> {
  const suggestions: Partial<MusicSelections> = {}

  // Get music suggestions based on mood
  if (videoSelections.mood && moodToMusicMap[videoSelections.mood]) {
    const moodSuggestion = moodToMusicMap[videoSelections.mood]
    suggestions.genre = moodSuggestion.genre
    suggestions.vibe = moodSuggestion.vibe
    suggestions.instruments = moodSuggestion.instruments
  }

  // Default tempo for ambient videos
  suggestions.tempo = 'Slow and relaxed, 60-70 BPM'

  return suggestions
}

export function getSceneSoundElement(scene: string): string | null {
  const sceneLower = scene.toLowerCase()

  for (const [keyword, sound] of Object.entries(sceneToSoundMap)) {
    if (sceneLower.includes(keyword)) {
      return sound
    }
  }

  return null
}

export function formatMusicPrompt(
  musicSelections: MusicSelections,
  videoSelections?: Selections
): string {
  const hasAnySelection = Object.values(musicSelections).some((v) => v.trim() !== '')

  if (!hasAnySelection) {
    return ''
  }

  const lines: string[] = [
    'Create a loopable ambient music track for a relaxation/sleep video.',
    '',
  ]

  if (musicSelections.genre) {
    lines.push(`Genre: ${musicSelections.genre}`)
  }
  if (musicSelections.tempo) {
    lines.push(`Tempo: ${musicSelections.tempo}`)
  }
  if (musicSelections.instruments) {
    lines.push(`Instruments: ${musicSelections.instruments}`)
  }
  if (musicSelections.vibe) {
    lines.push(`Vibe: ${musicSelections.vibe}`)
  }

  // Add scene-based sound element if video scene is selected
  if (videoSelections?.scene) {
    const soundElement = getSceneSoundElement(videoSelections.scene)
    if (soundElement) {
      lines.push(`Ambient layer: ${soundElement}`)
    }
  }

  lines.push('')
  lines.push('Requirements:')
  lines.push('- Seamless loop capability (end flows into beginning)')
  lines.push('- No lyrics, instrumental only')
  lines.push('- Gentle dynamics, no sudden loud parts')
  lines.push('- Suitable for 10-hour sleep/study video')
  lines.push('- Consistent energy level throughout')

  return lines.join('\n')
}
