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

// Music types for Suno
export type MusicCategoryId = 'genre' | 'tempo' | 'instruments' | 'vibe'

export interface MusicCategoryConfig {
  id: MusicCategoryId
  label: string
  presets: string[]
  placeholder: string
}

export interface MusicSelections {
  genre: string
  tempo: string
  instruments: string
  vibe: string
}

export type MusicSelectionKey = keyof MusicSelections
