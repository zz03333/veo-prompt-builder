import { useState } from 'react'
import type { CategoryConfig } from '../types'

interface CategorySelectorProps {
  category: CategoryConfig
  value: string
  onChange: (value: string) => void
  isSpinning?: boolean
}

export function CategorySelector({
  category,
  value,
  onChange,
  isSpinning = false,
}: CategorySelectorProps) {
  const [isCustom, setIsCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    if (newValue === '__custom__') {
      setIsCustom(true)
      onChange(customValue)
    } else {
      setIsCustom(false)
      onChange(newValue)
    }
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCustomValue(newValue)
    onChange(newValue)
  }

  const handleBackToPresets = () => {
    setIsCustom(false)
    onChange('')
  }

  // Check if current value is a preset or custom
  const isPresetValue = category.presets.includes(value)
  const showCustomInput = isCustom || (!isPresetValue && value !== '')

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300">
        {category.label}
      </label>

      {showCustomInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={isCustom ? customValue : value}
            onChange={handleCustomChange}
            placeholder={category.placeholder}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600
                       text-white placeholder-slate-500 focus:outline-none focus:border-purple-500
                       transition-colors"
          />
          <button
            onClick={handleBackToPresets}
            className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600
                       text-slate-300 transition-colors text-sm"
            title="Back to presets"
          >
            ×
          </button>
        </div>
      ) : (
        <select
          value={value}
          onChange={handlePresetChange}
          disabled={isSpinning}
          className={`w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600
                     text-white focus:outline-none focus:border-purple-500
                     transition-all cursor-pointer disabled:opacity-50
                     ${isSpinning ? 'animate-pulse' : ''}`}
        >
          <option value="">Select {category.label.toLowerCase()}...</option>
          {category.presets.map((preset) => (
            <option key={preset} value={preset}>
              {preset}
            </option>
          ))}
          <option value="__custom__">+ Custom...</option>
        </select>
      )}
    </div>
  )
}
