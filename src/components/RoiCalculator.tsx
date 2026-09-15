import React, { useState } from 'react'
import { TrendingUpIcon, ArrowUpRightIcon, ClockIcon, UserCheckIcon, ShieldCheckIcon } from './Icons'

export function RoiCalculator() {
  const [calls, setCalls] = useState<number>(8000)
  const [avgMinutes, setAvgMinutes] = useState<number>(3)

  // Realistic unit metrics (India & Global competitive pricing benchmarks)
  const humanCostPerCall = 28 // ₹28 per call for human telecallers (salary, dialer, QA, infra)
  const humanTotalCost = calls * humanCostPerCall
  const voiceBridgCostPerCall = 7.5 // ₹7.50 flat per call
  const voiceBridgTotalCost = calls * voiceBridgCostPerCall + 12000 // including base platform
  const monthlySavings = Math.max(0, humanTotalCost - voiceBridgTotalCost)
  const savingsPercent = Math.round((monthlySavings / humanTotalCost) * 100)

  // Labor hours saved
  const totalCallHours = Math.round((calls * avgMinutes) / 60)
  const equivalentAgents = (calls / 1800).toFixed(1) // avg 60-70 calls/day per human agent

  return (
    <div className="rounded-3xl bg-[#0a0f1d] border border-slate-800/90 p-6 md:p-10 relative overflow-hidden shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-mono mb-2">
              <TrendingUpIcon size={13} />
              <span>Unit Economic Intelligence</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
              Quantify the economic shift from headcount to software.
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              No seat licenses. No training lag. Zero turnover cost. Move the sliders to model your workload.
            </p>
          </div>

          {/* Slider 1: Monthly Call Volume */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <span className="text-slate-300">Monthly Call Volume</span>
              <span className="text-teal-400 font-semibold text-sm">
                {calls.toLocaleString('en-IN')} calls/mo
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>1,000</span>
              <span>25,000</span>
              <span>50,000+</span>
            </div>
          </div>

          {/* Slider 2: Average Call Handle Time */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <span className="text-slate-300">Average Conversation Duration</span>
              <span className="text-cyan-400 font-semibold text-sm">
                {avgMinutes} minutes
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={avgMinutes}
              onChange={(e) => setAvgMinutes(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>1 min</span>
              <span>5 min</span>
              <span>10 min</span>
            </div>
          </div>

          {/* Additional operational stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <ClockIcon size={14} className="text-teal-400" />
                <span>Call Time Absorbed:</span>
              </div>
              <strong className="text-slate-200 text-base">{totalCallHours.toLocaleString('en-IN')} hrs</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <UserCheckIcon size={14} className="text-cyan-400" />
                <span>FTE Reps Replaced:</span>
              </div>
              <strong className="text-slate-200 text-base">~{equivalentAgents} reps</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Comparison Card & ROI Gauge */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-950 border border-teal-500/30 p-6 relative shadow-2xl">
          <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-teal-500 text-slate-950 text-xs font-mono font-bold tracking-wide uppercase shadow-lg shadow-teal-500/20">
            {savingsPercent}% Cost Reduction
          </div>

          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-5">
            Monthly Run-Rate Comparison
          </h4>

          {/* Traditional In-House Cost */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 font-mono block">Traditional BPO / Manual Callers</span>
              <span className="text-xs text-slate-500">₹{humanCostPerCall}/call + seat licenses & training</span>
            </div>
            <div className="text-right">
              <strong className="text-lg md:text-xl font-mono text-slate-300">
                ₹{humanTotalCost.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-slate-500 font-mono block">/month</span>
            </div>
          </div>

          {/* VoiceBridg Cost */}
          <div className="flex items-center justify-between py-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs text-teal-300 font-mono font-semibold block">VoiceBridg Autonomous Platform</span>
              <span className="text-xs text-slate-400">₹{voiceBridgCostPerCall}/call flat · zero seat fees</span>
            </div>
            <div className="text-right">
              <strong className="text-lg md:text-xl font-mono text-teal-400">
                ₹{voiceBridgTotalCost.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-teal-500/70 font-mono block">/month all-inclusive</span>
            </div>
          </div>

          {/* Net Monthly Savings Highlight */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-teal-950/60 to-emerald-950/40 border border-teal-500/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-teal-300 tracking-wider block">
                  Net Monthly Capital Saved
                </span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-white mt-1 block">
                  ₹{monthlySavings.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">Annualized Savings</span>
                <span className="text-sm font-mono font-semibold text-emerald-400">
                  ₹{(monthlySavings * 12).toLocaleString('en-IN')} / yr
                </span>
              </div>
            </div>
          </div>

          {/* Guarantee Pill & CTA */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheckIcon size={14} className="text-teal-400" />
              <span>Full SLA & 99.9% voice uptime guarantee</span>
            </div>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors"
            >
              <span>Lock This Pricing</span>
              <ArrowUpRightIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
