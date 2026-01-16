import { useState } from 'react'

interface MusicPromptOutputProps {
  prompt: string
  hasSelections: boolean
}

export function MusicPromptOutput({
  prompt,
  hasSelections,
}: MusicPromptOutputProps) {
  const [copied, setCopied] = useState(false)

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
    <div className="p-6 rounded-xl bg-slate-800/50 border border-orange-700/30">
      <h2 className="text-lg font-semibold text-orange-300 mb-4 flex items-center gap-2">
        <MusicIcon />
        Generated Suno Prompt
      </h2>

      {hasSelections ? (
        <>
          <pre className="whitespace-pre-wrap text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg font-mono leading-relaxed max-h-60 overflow-y-auto">
            {prompt}
          </pre>

          <button
            onClick={handleCopy}
            disabled={!prompt}
            className={`mt-4 px-6 py-3 rounded-lg font-medium transition-all
                       flex items-center gap-2 mx-auto
                       ${
                         copied
                           ? 'bg-green-600 text-white'
                           : 'bg-orange-600 hover:bg-orange-500 text-white'
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
                Copy Suno Prompt
              </>
            )}
          </button>
        </>
      ) : (
        <p className="text-slate-500 text-center py-6">
          Select music options above or click "Sync with Video" to auto-fill
          based on your video mood...
        </p>
      )}
    </div>
  )
}

function MusicIcon() {
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
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
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
