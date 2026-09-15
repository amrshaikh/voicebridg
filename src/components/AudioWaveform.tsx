import React, { useState, useEffect } from 'react'
import { PlayIcon, PauseIcon, MicIcon, BrainIcon, SparkleIcon, ShieldCheckIcon } from './Icons'

interface DialogueTurn {
  speaker: 'Caller' | 'VoiceBridg'
  text: string
  time: string
  latency?: string
  analystNote?: string
}

const callScenarios: Record<string, {
  title: string
  intent: string
  industry: string
  turns: DialogueTurn[]
}> = {
  insurance: {
    title: 'HDFC Ergo Auto Renewal',
    intent: 'Policy Extension + NCB Protection',
    industry: 'Insurance',
    turns: [
      {
        speaker: 'VoiceBridg',
        text: 'Hello Rohan, this is Maya calling from HDFC Ergo regarding your Honda City policy expiring in 4 days. Would you like me to renew it with zero-dep cover?',
        time: '00:03',
        latency: '340ms',
        analystNote: 'Proactive outreach: 82% conversion on Day -4'
      },
      {
        speaker: 'Caller',
        text: 'Does that renewal include roadside assistance? Last year I had to pay extra for towing.',
        time: '00:08',
        analystNote: 'Objection flagged: Towing coverage clarity requested'
      },
      {
        speaker: 'VoiceBridg',
        text: 'Yes Rohan! The 2026 comprehensive tier now bundles 24/7 unlimited towing anywhere in India at no additional charge. I can lock the premium at ₹14,200 right now.',
        time: '00:14',
        latency: '380ms',
        analystNote: 'Instant objection resolution; prompt patch applied'
      },
      {
        speaker: 'Caller',
        text: 'Perfect. Send me the payment link on WhatsApp.',
        time: '00:19',
        analystNote: 'Intent achieved: SMS + WhatsApp link triggered'
      },
    ]
  },
  banking: {
    title: 'Priority Banking EMI Restructure',
    intent: 'Grace Period & Flexible Payment',
    industry: 'Banking & NBFC',
    turns: [
      {
        speaker: 'VoiceBridg',
        text: 'Good afternoon Ananya, this is VoiceBridg on behalf of Axis Credit. I am reaching out regarding your pending invoice of ₹32,000 due tomorrow.',
        time: '00:03',
        latency: '360ms',
        analystNote: 'Empathetic tone applied per customer tier'
      },
      {
        speaker: 'Caller',
        text: 'I am traveling right now and my corporate card is blocked. Can I pay on Monday without late fees?',
        time: '00:09',
        analystNote: 'Detected temporary cashflow friction, no refusal'
      },
      {
        speaker: 'VoiceBridg',
        text: 'Understood. Since you have a 100% on-time track record, I have authorized a 4-day grace period till Monday 5 PM with zero penalty. Shall I lock that for you?',
        time: '00:15',
        latency: '410ms',
        analystNote: 'Autonomous concession authorized via risk policy'
      },
      {
        speaker: 'Caller',
        text: 'That is wonderful, thank you so much!',
        time: '00:20',
        analystNote: 'NPS: 10/10 · Escalation avoided'
      }
    ]
  }
}

export function AudioWaveform() {
  const [activeScenario, setActiveScenario] = useState<'insurance' | 'banking'>('insurance')
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTurnIndex, setCurrentTurnIndex] = useState(1)
  const [waveHeights, setWaveHeights] = useState<number[]>([
    28, 45, 60, 85, 40, 70, 95, 55, 35, 75, 90, 65, 40, 85, 60, 30, 70, 95, 50, 40, 80, 55, 30, 65
  ])

  // Periodic waveform oscillation when playing
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setWaveHeights(prev =>
        prev.map(() => Math.floor(Math.random() * 75) + 20)
      )
    }, 180)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Cycle through dialogue turns periodically
  useEffect(() => {
    if (!isPlaying) return
    const turnInterval = setInterval(() => {
      setCurrentTurnIndex(prev => {
        const total = callScenarios[activeScenario].turns.length
        return (prev + 1) % total
      })
    }, 4200)
    return () => clearInterval(turnInterval)
  }, [isPlaying, activeScenario])

  const scenario = callScenarios[activeScenario]
  const currentTurn = scenario.turns[currentTurnIndex]

  return (
    <div className="relative rounded-2xl md:rounded-3xl bg-[#0c121e]/90 border border-slate-700/40 shadow-2xl shadow-teal-950/20 backdrop-blur-xl p-5 md:p-6 overflow-hidden">
      {/* Subtle top inner refraction border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <MicIcon size={16} />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-slate-200">{scenario.title}</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded bg-slate-800 text-teal-400 border border-teal-500/20">
                Live Turn
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Voice Agent v2.4 · Latency <span className="text-teal-400 font-semibold">{currentTurn.latency || '360ms'}</span>
            </p>
          </div>
        </div>

        {/* Play / Pause toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause conversation simulation' : 'Play conversation simulation'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/60 text-xs text-slate-300 transition-colors"
        >
          {isPlaying ? <PauseIcon size={12} className="text-teal-400" /> : <PlayIcon size={12} className="text-teal-400" />}
          <span className="font-mono text-[11px]">{isPlaying ? 'Streaming' : 'Paused'}</span>
        </button>
      </div>

      {/* Scenario selector tabs */}
      <div className="flex gap-2 my-3">
        {(['insurance', 'banking'] as const).map(key => (
          <button
            key={key}
            onClick={() => {
              setActiveScenario(key)
              setCurrentTurnIndex(0)
            }}
            className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all ${
              activeScenario === key
                ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-medium'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {key === 'insurance' ? 'Auto Insurance Case' : 'Banking Collections'}
          </button>
        ))}
      </div>

      {/* Audio Waveform Real-Time Canvas */}
      <div className="relative my-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${currentTurn.speaker === 'VoiceBridg' ? 'bg-teal-400 animate-pulse' : 'bg-amber-400'}`} />
            {currentTurn.speaker === 'VoiceBridg' ? 'AI Speech Synthesis (Neural PCM 24kHz)' : 'Customer Acoustic Input'}
          </span>
          <span className="text-slate-500">{currentTurn.time}</span>
        </div>

        {/* Dynamic Waveform Bars */}
        <div className="h-14 flex items-center justify-between gap-1 px-1">
          {waveHeights.map((h, i) => {
            const isCenter = i >= 8 && i <= 15
            const barColor = currentTurn.speaker === 'VoiceBridg'
              ? isCenter ? 'bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.4)]' : 'bg-teal-600/70'
              : isCenter ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]' : 'bg-amber-600/60'
            return (
              <div
                key={i}
                style={{ height: `${isPlaying ? h : 20}%` }}
                className={`w-1.5 rounded-full transition-all duration-150 ${barColor}`}
              />
            )
          })}
        </div>

        {/* Active speaker speech bubble */}
        <div className="mt-3 pt-3 border-t border-slate-800/70">
          <div className="flex items-start gap-2.5">
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold tracking-wider ${
              currentTurn.speaker === 'VoiceBridg'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {currentTurn.speaker}
            </span>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
              "{currentTurn.text}"
            </p>
          </div>
        </div>
      </div>

      {/* Analyst Agent Feedback telemetry pill */}
      <div className="p-3 rounded-xl bg-gradient-to-br from-teal-950/40 via-slate-900/60 to-slate-950/60 border border-teal-500/20">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
          <div className="flex items-center gap-1.5 text-teal-400">
            <BrainIcon size={14} />
            <span className="font-semibold uppercase tracking-wider">Analyst Agent · Live Observation</span>
          </div>
          <span className="text-[10px] text-teal-500/80 bg-teal-500/10 px-1.5 py-0.5 rounded">
            Self-Learning Active
          </span>
        </div>
        <p className="text-xs text-slate-300 font-mono flex items-center gap-2">
          <SparkleIcon size={12} className="text-teal-400 shrink-0" />
          <span>{currentTurn.analystNote}</span>
        </p>
      </div>

      {/* Telemetry bottom indicators */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/60 text-center font-mono text-[10px] text-slate-400">
        <div>
          <span className="block text-slate-500 text-[9px] uppercase">Turn Latency</span>
          <strong className="text-slate-200 font-semibold">{currentTurn.latency || '375ms'}</strong>
        </div>
        <div>
          <span className="block text-slate-500 text-[9px] uppercase">Intent Match</span>
          <strong className="text-teal-400 font-semibold">99.4%</strong>
        </div>
        <div>
          <span className="block text-slate-500 text-[9px] uppercase">Interruption Mode</span>
          <strong className="text-emerald-400 font-semibold">Duplex 0ms</strong>
        </div>
      </div>
    </div>
  )
}
