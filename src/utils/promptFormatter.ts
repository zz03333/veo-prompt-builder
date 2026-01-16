import type { Selections } from '../types'

export function formatPrompt(selections: Selections): string {
  const hasAnySelection = Object.values(selections).some((v) => v.trim() !== '')

  if (!hasAnySelection) {
    return ''
  }

  const lines: string[] = [
    'Create a seamless looping video for a 10-hour ambient YouTube video.',
    '',
  ]

  if (selections.scene) {
    lines.push(`Scene: ${selections.scene}`)
  }
  if (selections.camera) {
    lines.push(`Camera: ${selections.camera}`)
  }
  if (selections.mood) {
    lines.push(`Mood: ${selections.mood}`)
  }
  if (selections.colors) {
    lines.push(`Colors: ${selections.colors}`)
  }
  if (selections.lighting) {
    lines.push(`Lighting: ${selections.lighting}`)
  }
  if (selections.movement) {
    lines.push(
      `Movement: ${selections.movement} - keep movement minimal and smooth for seamless looping`
    )
  }
  if (selections.weather) {
    lines.push(`Weather: ${selections.weather}`)
  }
  if (selections.season) {
    lines.push(`Season: ${selections.season}`)
  }
  if (selections.style) {
    lines.push(`Style: ${selections.style}`)
  }

  lines.push('')
  lines.push(
    'Important: The video must loop seamlessly with no jarring transitions.'
  )
  lines.push(
    'Movement should be slow and hypnotic, suitable for relaxation and sleep.'
  )

  return lines.join('\n')
}
