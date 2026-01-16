import { CategorySelector } from './CategorySelector'
import { musicCategories } from '../data/presets'
import type { MusicSelections, MusicSelectionKey, MusicCategoryConfig, CategoryConfig } from '../types'

interface MusicBuilderProps {
  selections: MusicSelections
  onUpdateSelection: (key: MusicSelectionKey, value: string) => void
}

// Adapter to make MusicCategoryConfig work with CategorySelector
function adaptMusicCategory(mc: MusicCategoryConfig): CategoryConfig {
  return {
    id: mc.id as unknown as CategoryConfig['id'],
    label: mc.label,
    presets: mc.presets,
    placeholder: mc.placeholder,
  }
}

export function MusicBuilder({
  selections,
  onUpdateSelection,
}: MusicBuilderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {musicCategories.map((category) => (
        <CategorySelector
          key={category.id}
          category={adaptMusicCategory(category)}
          value={selections[category.id]}
          onChange={(value) => onUpdateSelection(category.id, value)}
        />
      ))}
    </div>
  )
}
