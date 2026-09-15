import React, { useState, useEffect } from 'react'
import { PlayIcon, PauseIcon, GlobeIcon, WaveformIcon, SparkleIcon } from './Icons'

interface VoiceSample {
  id: string
  language: string
  nativeName: string
  accent: string
  persona: string
  latency: string
  sampleScript: string
  translation: string
}

const voiceSamples: VoiceSample[] = [
  {
    id: 'en-in',
    language: 'English (Indian)',
    nativeName: 'Conversational Indian English',
    accent: 'Neutral Metro / Corporate',
    persona: 'Aarav · Senior Financial Advisor',
    latency: '345ms',
    sampleScript: 'Good morning Mr. Kapoor, I noticed your term insurance policy premium is due this Friday. Would you like me to generate an instant UPI link or walk you through the tax-saving deduction under 80C?',
    translation: 'Native cadence with natural Indian conversational nuances and financial terminology.'
  },
  {
    id: 'hi',
    language: 'Hindi / Hinglish',
    nativeName: 'हिन्दी / हिंग्लिश',
    accent: 'Delhi NCR Natural Colloquial',
    persona: 'Kavya · Customer Success Specialist',
    latency: '360ms',
    sampleScript: 'नमस्ते विक्रम जी! आपकी कार सर्विस कल सुबह 10 बजे शेड्यूल्ड है। क्या आप पिक-अप और ड्रॉप सर्विस भी ऐड करना चाहेंगे? बस हाँ या ना बोल दीजिए।',
    translation: '"Hello Vikram ji! Your car service is scheduled for tomorrow at 10 AM. Would you like to add pick-and-drop service? Just say yes or no."'
  },
  {
    id: 'ta',
    language: 'Tamil',
    nativeName: 'தமிழ்',
    accent: 'Chennai Fluent Conversational',
    persona: 'Murugan · Retail Logistics Assistant',
    latency: '385ms',
    sampleScript: 'வணக்கம் ஆனந்த் சார், உங்களோட ஆர்டர் இன்று மதியம் 2 மணிக்கு டெலிவரி ஆக உள்ளது. நீங்கள் வீட்டில் இருப்பீர்களா அல்லது பக்கத்து வீட்டில் கொடுக்கலாமா?',
    translation: '"Hello Anand sir, your package is scheduled for delivery today at 2 PM. Will you be home or should we leave it with your neighbor?"'
  },
  {
    id: 'ar',
    language: 'Arabic (Gulf / Khaleeji)',
    nativeName: 'العربية (خليجي)',
    accent: 'Dubai / Riyadh Polite Business',
    persona: 'Tariq · Private Client Concierge',
    latency: '390ms',
    sampleScript: 'مرحباً سيد عبد الله، نؤكد حجز موعد فحص العقار لفيلا دبي هيلز يوم السبت الساعة 4 عصراً. هل تود أن نرسل لك رابط الموقع عبر الواتساب؟',
    translation: '"Hello Mr. Abdullah, confirming your site visit for the Dubai Hills villa this Saturday at 4 PM. Would you like us to send the location pin via WhatsApp?"'
  }
]

export function VoiceAudition() {
  const [activeVoice, setActiveVoice] = useState<VoiceSample>(voiceSamples[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulation of audio playback timer
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 3.5
        })
      }, 150)
    } else {
      setProgress(0)
    }
    return () => clearInterval(timer)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="rounded-3xl bg-[#0d1424] border border-slate-800 p-6 md:p-8 relative overflow-hidden shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-2">
            <GlobeIcon size={13} className="text-cyan-400" />
            <span>Multi-Lingual Acoustic Engine</span>
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-white">
            Natural voices in the dialects your customers speak.
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Zero robotic monotone. Native pauses, backchanneling ("hmm", "haan ji"), and cultural inflections.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 self-start md:self-auto">
          <WaveformIcon size={14} className="text-teal-400" />
          <span>Turn-taking: <strong className="text-teal-300 font-semibold">{activeVoice.latency}</strong></span>
        </div>
      </div>

      {/* Language Selector Pills */}
      <div className="flex flex-wrap gap-2 my-6">
        {voiceSamples.map(sample => {
          const isActive = sample.id === activeVoice.id
          return (
            <button
              key={sample.id}
              onClick={() => {
                setActiveVoice(sample)
                setIsPlaying(false)
                setProgress(0)
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold shadow-lg shadow-teal-950/30'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{sample.language}</span>
              <span className="text-[10px] opacity-70">({sample.nativeName})</span>
            </button>
          )
        })}
      </div>

      {/* Voice Player Console */}
      <div className="p-5 md:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/70">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause audio demo' : 'Play audio demo'}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 flex items-center justify-center transition-transform active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            </button>
            <div>
              <h4 className="text-sm font-semibold text-white">{activeVoice.persona}</h4>
              <p className="text-xs font-mono text-slate-400">{activeVoice.accent}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-teal-400 animate-ping' : 'bg-slate-600'}`} />
              {isPlaying ? 'Audition Streaming...' : 'Ready to Audition'}
            </span>
          </div>
        </div>

        {/* Playback progress bar */}
        <div className="relative w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Script dialogue preview */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="flex items-center justify-between text-[11px] font-mono text-teal-400 mb-2">
            <span>Voice Sample Transcript</span>
            <span className="text-slate-400 font-normal">24kHz HiFi Synthesis</span>
          </div>
          <p className="text-sm text-slate-100 font-sans leading-relaxed font-normal">
            "{activeVoice.sampleScript}"
          </p>
          <p className="mt-2 text-xs text-slate-400 font-mono italic">
            Note: {activeVoice.translation}
          </p>
        </div>

        {/* Supported Languages Footer */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <SparkleIcon size={13} className="text-teal-400" />
            <span>40+ Regional Indian & Global Dialects supported</span>
          </div>
          <span className="text-slate-400">Zero fine-tuning fees for enterprise vocabularies</span>
        </div>
      </div>
    </div>
  )
}
