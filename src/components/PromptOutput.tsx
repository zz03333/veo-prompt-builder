import { useState } from 'react'
import { formatWorkflowTips } from '../utils/promptFormatter'

interface PromptOutputProps {
  prompt: string
  hasSelections: boolean
}

export function PromptOutput({ prompt, hasSelections }: PromptOutputProps) {
  const [copied, setCopied] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const handleCopy = async () => {
    if (!prompt) return

    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Generated Prompt for Veo 3.1
        </h2>

        {hasSelections ? (
          <>
            <pre className="whitespace-pre-wrap text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg font-mono leading-relaxed max-h-80 overflow-y-auto">
              {prompt}
            </pre>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <button
                onClick={handleCopy}
                disabled={!prompt}
                className={`px-6 py-3 rounded-lg font-medium transition-all
                           flex items-center gap-2
                           ${
                             copied
                               ? 'bg-green-600 text-white'
                               : 'bg-purple-600 hover:bg-purple-500 text-white'
                           }`}
              >
                {copied ? (
                  <>
                    <CheckIcon />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon />
                    Copy Prompt
                  </>
                )}
              </button>

              <button
                onClick={() => setShowTips(!showTips)}
                className="px-6 py-3 rounded-lg font-medium transition-all
                           border border-slate-600 hover:border-slate-500
                           text-slate-300 hover:text-white flex items-center gap-2"
              >
                <LightbulbIcon />
                {showTips ? 'Hide' : 'Show'} Workflow Tips
              </button>
            </div>
          </>
        ) : (
          <p className="text-slate-500 text-center py-8">
            Select options above or spin for inspiration to generate a prompt...
          </p>
        )}
      </div>

      {showTips && (
        <div className="p-6 rounded-xl bg-amber-900/20 border border-amber-700/50">
          <h3 className="text-md font-semibold text-amber-300 mb-3 flex items-center gap-2">
            <LightbulbIcon />
            How to Create Your 10-Hour Video
          </h3>
          <pre className="whitespace-pre-wrap text-sm text-amber-100/80 font-mono leading-relaxed">
            {formatWorkflowTips()}
          </pre>
        </div>
      )}
    </div>
  )
}

function CopyIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

function LightbulbIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  )
}
