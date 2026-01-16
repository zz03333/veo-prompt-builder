export type CategoryId =
  | 'scene'
  | 'camera'
  | 'mood'
  | 'colors'
  | 'lighting'
  | 'movement'
  | 'weather'
  | 'season'
  | 'style'

export interface CategoryConfig {
  id: CategoryId
  label: string
  presets: string[]
  placeholder: string
}

export interface Selections {
  scene: string
  camera: string
  mood: string
  colors: string
  lighting: string
  movement: string
  weather: string
  season: string
  style: string
}

export type SelectionKey = keyof Selections
