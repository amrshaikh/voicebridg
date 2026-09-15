import React, { useState } from 'react'
import { BrainIcon, MicIcon, CheckIcon, RefreshIcon, SparkleIcon, ZapIcon } from './Icons'

interface CallLog {
  id: string
  caller: string
  intent: string
  score: number
  improvementStatus: 'Patched' | 'Optimizing' | 'Analyzed'
  flaggedPhrase: string
}

const initialLogs: CallLog[] = [
  {
    id: 'CALL-8842',
    caller: 'Dr. Priya V.',
    intent: 'Lab Report Inquiry',
    score: 98,
    improvementStatus: 'Patched',
    flaggedPhrase: 'Agent clarified fasting requirements autonomously'
  },
  {
    id: 'CALL-8841',
    caller: 'Siddharth M.',
    intent: 'Car Loan Foreclosure',
    score: 92,
    improvementStatus: 'Optimizing',
    flaggedPhrase: 'Customer hesitated when penalty rate was quoted'
  },
  {
    id: 'CALL-8840',
    caller: 'Elena R.',
    intent: 'Villa Site Visit',
    score: 99,
    improvementStatus: 'Patched',
    flaggedPhrase: 'Booked Saturday 11 AM tour directly on sales calendar'
  }
]

export function DualAgentSimulator() {
  const [logs] = useState<CallLog[]>(initialLogs)
  const [patchApplied, setPatchApplied] = useState(false)
  const [activeTab, setActiveTab] = useState<'architecture' | 'prompt-diff'>('architecture')

  return (
    <div className="rounded-3xl bg-[#0b101c] border border-slate-800/80 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Subhead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-mono mb-3">
            <ZapIcon size={13} className="text-teal-400" />
            <span>Dual-Agent Architecture Engine</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
            Most voice bots deploy and stagnate.<br />
            <span className="text-teal-400">VoiceBridg rewires itself daily.</span>
          </h3>
        </div>

        {/* View toggle */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'architecture'
                ? 'bg-teal-500/20 text-teal-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dual-Agent Flow
          </button>
          <button
            onClick={() => setActiveTab('prompt-diff')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'prompt-diff'
                ? 'bg-teal-500/20 text-teal-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Prompt Auto-Patch Diff
          </button>
        </div>
      </div>

      {activeTab === 'architecture' ? (
        /* Architecture Dual Node Flow */
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          {/* Node 1: Voice Agent */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-teal-500/20 p-5 relative group hover:border-teal-500/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <MicIcon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Agent 01: Voice Agent</h4>
                  <p className="text-[11px] font-mono text-teal-400">Production Frontline · Sub-400ms</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Active 24/7
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
              Conducts high-fidelity inbound and outbound phone calls across 40+ languages. Handles natural turn-taking, barge-in interruptions, and CRM syncing in real time.
            </p>
            <div className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Audio Streaming:</span>
                <span className="text-slate-200">WebSocket PCM 24kHz</span>
              </div>
              <div className="flex justify-between">
                <span>Mean Turnaround:</span>
                <span className="text-teal-400 font-semibold">372ms</span>
              </div>
            </div>
          </div>

          {/* Center Connector Indicator */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 lg:py-0">
            <div className="hidden lg:flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-teal-500/50 to-teal-400" />
              <div className="my-2 p-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 animate-pulse">
                <RefreshIcon size={14} />
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-teal-400 via-teal-500/50 to-transparent" />
            </div>
            <div className="lg:hidden flex items-center gap-2 text-xs font-mono text-teal-400">
              <RefreshIcon size={14} className="animate-spin" />
              <span>Transcript Stream & Audit Loop</span>
            </div>
          </div>

          {/* Node 2: Analyst Agent */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 p-5 relative group hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <BrainIcon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Agent 02: Analyst Agent</h4>
                  <p className="text-[11px] font-mono text-cyan-400">Background Auditor · Prompt Patches</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Self-Improving
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
              Inspects audio transcripts immediately as calls conclude. Surfaces hesitation cues, recurring objections, and generates pull-request-style prompt diffs for your one-click approval.
            </p>
            <div className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Transcript Audit Rate:</span>
                <span className="text-slate-200">100% of calls inspected</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution Uplift:</span>
                <span className="text-cyan-400 font-semibold">+18.4% monthly</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Prompt Auto-Patch Diff View */
        <div className="mt-8 rounded-2xl bg-slate-950 border border-slate-800 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <SparkleIcon size={14} className="text-teal-400" />
              <span>Prompt Revision #104 · Proposed by Analyst Agent</span>
            </div>
            <span className="text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              Confidence Score: 98.7%
            </span>
          </div>

          <div className="mt-4 space-y-3 font-mono text-xs">
            {/* Removed lines */}
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-300">
              <div className="flex items-center gap-2 font-semibold text-[11px] text-rose-400 mb-1">
                <span>- BEFORE (Current Prompt instruction):</span>
              </div>
              <p className="font-sans leading-relaxed">
                "If caller asks why premium increased by 8%, state that IRDAI adjusted general rates and ask if they want to pay now."
              </p>
            </div>

            {/* Added lines */}
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
              <div className="flex items-center gap-2 font-semibold text-[11px] text-emerald-400 mb-1">
                <span>+ AFTER (Analyst Patched instruction):</span>
              </div>
              <p className="font-sans leading-relaxed">
                "Acknowledge the 8% adjustment transparently, highlight the newly bundled zero-dep and road assistance, and offer a 5% multi-year loyalty credit before asking for payment."
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-400 font-sans">
              Analyst tested this patch against 240 synthetic simulation dialogues: <strong className="text-emerald-400 font-mono">+16.8% renewal rate</strong>.
            </p>
            <button
              onClick={() => setPatchApplied(true)}
              disabled={patchApplied}
              className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                patchApplied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-teal-500 text-slate-950 font-semibold hover:bg-teal-400'
              }`}
            >
              {patchApplied ? (
                <>
                  <CheckIcon size={14} className="text-emerald-300" />
                  <span>Patch Deployed to Production</span>
                </>
              ) : (
                <>
                  <SparkleIcon size={14} />
                  <span>Deploy Patch to Next Call</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Live Recent Call Audit Log Feed */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Continuous Call Feed & Auto-Audit Telemetry</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Feed
          </span>
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {logs.map(log => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
                <span className="text-slate-300 font-semibold">{log.caller}</span>
                <span className="text-teal-400">{log.score}/100</span>
              </div>
              <div className="text-slate-400 text-[11px] font-mono mb-2">{log.intent}</div>
              <p className="text-slate-300 text-xs font-sans leading-snug">
                "{log.flaggedPhrase}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
