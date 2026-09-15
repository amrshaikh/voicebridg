import React, { useState, useEffect } from 'react'

export function EditorialCallCard() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeBarIndex, setActiveBarIndex] = useState(0)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveBarIndex(prev => (prev + 1) % 24)
    }, 160)
    return () => clearInterval(interval)
  }, [isPlaying])

  const waveformHeights = [
    24, 42, 60, 85, 45, 70, 95, 55, 36, 75, 96, 64,
    40, 86, 62, 30, 72, 94, 52, 40, 80, 56, 30, 64
  ]

  return (
    <div className="hero-portrait-wrapper relative max-w-[490px] justify-self-end w-full group">
      {/* Ambient background aura behind the card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/15 via-cyan-400/10 to-transparent rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Physical Specimen Frame */}
      <div className="portrait-frame bg-[#dbe8e5] p-3.5 pb-0 shadow-xl shadow-teal-950/5 transform rotate-[2deg] rounded-xl transition-all duration-300 group-hover:rotate-0 group-hover:shadow-2xl">
        {/* Paper Specimen Card */}
        <div className="bg-white border border-[#c4dbd6] p-6 text-[#071c2a] min-h-[440px] flex flex-col justify-between relative overflow-hidden rounded-lg shadow-sm">
          {/* Top header bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono text-[10px] tracking-widest text-[#567471] uppercase">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#0d9488] animate-pulse' : 'bg-slate-400'}`} />
              VB // Call Specimen #849
            </span>
            <span className="text-[#0d9488] font-medium bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
              Dual-Agent Loop
            </span>
          </div>

          {/* Centerpiece Acoustic Waveform Visualizer */}
          <div className="my-5 py-4 px-3 bg-[#f2f8f7] border border-[#d9ebe8] rounded-xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#567471] mb-3">
              <span>Acoustic Frequency · 24kHz Neural PCM</span>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-[#0d9488] hover:text-[#0b7a70] cursor-pointer font-sans text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </button>
            </div>

            {/* Equalizer Waveform Lines */}
            <div className="h-16 flex items-center justify-between gap-1 px-1">
              {waveformHeights.map((h, i) => {
                const isPulse = isPlaying && Math.abs(i - activeBarIndex) <= 2
                const height = isPulse ? Math.min(100, h + 25) : h
                return (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPulse
                        ? 'bg-[#0d9488] shadow-[0_0_8px_rgba(13,148,136,0.4)]'
                        : i % 2 === 0
                        ? 'bg-[#071c2a]'
                        : 'bg-[#98b8b3]'
                    }`}
                  />
                )
              })}
            </div>
          </div>

          {/* Dialogue Transcript Excerpt */}
          <div className="space-y-3 my-2 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] uppercase text-[#648480] tracking-wider shrink-0 pt-0.5">
                Caller
              </span>
              <p className="text-[#2b4442] font-normal leading-relaxed">
                "Does this renewal include roadside assistance? Last year towing cost me extra."
              </p>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
              <span className="font-mono text-[10px] uppercase text-[#0d9488] font-semibold tracking-wider shrink-0 pt-0.5">
                VoiceBridg
              </span>
              <p className="text-[#071c2a] font-medium leading-relaxed">
                "Yes Rohan! The 2026 plan bundles 24/7 unlimited towing across India with zero extra charges. I can lock your premium at ₹14,200 now."
              </p>
            </div>
          </div>

          {/* Bottom Analyst Flag */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[10px] text-[#648480]">
            <span>Analyst Agent: Objection solved</span>
            <span className="text-[#0d9488] font-semibold bg-teal-50 px-2 py-0.5 rounded">
              Verified Resolution
            </span>
          </div>
        </div>

        {/* Frame caption */}
        <div className="flex justify-between py-3 px-1 font-mono text-[10px] uppercase tracking-wider text-[#496663]">
          <span>VoiceBridg system</span>
          <span>Always learning</span>
        </div>
      </div>
    </div>
  )
}
