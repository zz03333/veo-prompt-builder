import type { Selections } from '../types'

export function formatPrompt(selections: Selections): string {
  const hasAnySelection = Object.values(selections).some((v) => v.trim() !== '')

  if (!hasAnySelection) {
    return ''
  }

  const lines: string[] = [
    'Generate a short 8-second video clip that loops perfectly (first frame matches last frame).',
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
    lines.push(`Movement: ${selections.movement}`)
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
  lines.push('CRITICAL for looping:')
  lines.push('- Camera must return to exact starting position by end of clip')
  lines.push('- Any movement must complete a full cycle (wave in, wave out)')
  lines.push('- Lighting and colors must be identical at start and end')
  lines.push('- No sudden changes - all motion is slow, continuous, cyclical')
  lines.push('- Perfect for seamless loop when repeated')

  return lines.join('\n')
}

export function formatWorkflowTips(): string {
  return `WORKFLOW FOR 10-HOUR VIDEO:

1. Generate 3-5 clips with this same prompt
2. In video editor, trim each clip to find best loop point
3. Cross-dissolve between clips (0.5s) for variety
4. Or: use single best clip on infinite loop
5. Export at 1080p/4K for YouTube

TIP: Generate variations by slightly changing Scene or Weather
while keeping other settings identical for consistent style.`
}
