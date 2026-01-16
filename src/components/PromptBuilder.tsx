import { CategorySelector } from './CategorySelector'
import { categories } from '../data/presets'
import type { Selections, SelectionKey } from '../types'

interface PromptBuilderProps {
  selections: Selections
  onUpdateSelection: (key: SelectionKey, value: string) => void
  isSpinning?: boolean
}

export function PromptBuilder({
  selections,
  onUpdateSelection,
  isSpinning = false,
}: PromptBuilderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategorySelector
          key={category.id}
          category={category}
          value={selections[category.id]}
          onChange={(value) => onUpdateSelection(category.id, value)}
          isSpinning={isSpinning}
        />
      ))}
    </div>
  )
}
