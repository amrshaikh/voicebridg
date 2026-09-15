import React, { useState } from 'react'
import { EditorialCallCard } from './components/EditorialCallCard'

const painPoints = [
  {
    num: '01',
    title: 'Human agents cost ₹25,000+/month each',
    desc: 'They miss calls during peak surges, suffer bad days, and require weeks of retraining whenever policies or scripts change.'
  },
  {
    num: '02',
    title: 'Generic voice bots deploy and forget',
    desc: 'Traditional platforms hand over a static bot and leave. Unanswered questions stay unanswered forever unless a developer updates code.'
  },
  {
    num: '03',
    title: 'Zero visibility into what is failing',
    desc: 'You have no insight into where callers get frustrated, which objections cause hang-ups, or what is driving customer churn.'
  }
]

const features = [
  {
    num: '01',
    title: 'Your agent rewrites itself from your calls',
    category: 'Core USP',
    desc: 'The Analyst AI reviews every transcript, spots unresolved questions, and drafts exact prompt improvements for your approval.',
    stat: '40–60% fewer transfers after 30 days'
  },
  {
    num: '02',
    title: 'Ask your call data anything in plain English',
    category: 'Business Intelligence',
    desc: 'Query thousands of conversations instantly: "Why did customers cancel in Mumbai this week?" and get structured root-cause analysis.',
    stat: 'Instant SQL-free analysis'
  },
  {
    num: '03',
    title: 'Lifelike voice in Hindi, Tamil, Arabic & more',
    category: 'Voice Quality',
    desc: 'Sub-400ms turnaround with regional dialects, colloquial nuances, and natural conversational pauses.',
    stat: '40+ languages & regional dialects'
  },
  {
    num: '04',
    title: 'Know when a caller is about to churn',
    category: 'Sentiment Radar',
    desc: 'Real-time tone and acoustic analysis alerts your retention team immediately when frustration or churn intent spikes.',
    stat: 'Real-time churn prevention'
  },
  {
    num: '05',
    title: 'Human agents walk into transfers already briefed',
    category: 'Smart Escalation',
    desc: 'When human intervention is needed, the rep receives a 3-bullet summary, caller sentiment, and the best objection response.',
    stat: 'Zero repetitive caller explanations'
  },
  {
    num: '06',
    title: 'Test two agent voices simultaneously on live traffic',
    category: 'A/B Testing',
    desc: 'Run Prompt A against Prompt B across live inbound traffic to measure conversion rates with statistical confidence.',
    stat: 'Empirical prompt optimization'
  },
  {
    num: '07',
    title: 'Built for BFSI, insurance & regulated sectors',
    category: 'Compliance',
    desc: 'TRAI-compliant, DNC registry validation, complete audit trails, and automated PII masking for India and UAE.',
    stat: 'SOC-2 & TRAI compliant'
  },
  {
    num: '08',
    title: 'Live in hours, not weeks',
    category: 'Speed to Value',
    desc: 'Connect your existing SIP trunk, Twilio, or Exotel phone numbers without ripping out legacy CRM infrastructure.',
    stat: 'Plug-and-play deployment'
  }
]

const industries = {
  Insurance: {
    title: 'Policy renewal outbound calls & claims',
    desc: 'Reach policyholders proactively before coverage lapses, explain bundled coverage, and send instant checkout links.',
    stat: '2.4× renewal rate vs SMS campaigns',
    subcases: ['Policy renewals', 'Claims status & FAQ', 'Lead qualification', 'Bilingual Arabic+English IVR (UAE)']
  },
  'Banking & NBFC': {
    title: 'EMI reminders & soft collections',
    desc: 'Handle high-volume payment reminders with respectful, compliant conversations and structured promise-to-pay logging.',
    stat: '80% routine call automation',
    subcases: ['EMI payment reminders', 'Loan pre-qualification', 'Card status & FAQs', 'Collections outbound']
  },
  'Real Estate': {
    title: 'Lead qualification & site visit booking',
    desc: 'Qualify budget, preferred configuration, and move-in timeline before booking site visits directly on sales calendars.',
    stat: '4× more qualified sales tours',
    subcases: ['Property inquiry pre-qualification', '24/7 site visit scheduling', 'Tenant & buyer FAQs', 'Lead nurture']
  },
  Healthcare: {
    title: 'Appointment scheduling & patient prep',
    desc: 'Confirm appointments, answer pre-procedure fasting queries, and conduct post-discharge follow-ups 24/7.',
    stat: '24/7 patient access & zero hold times',
    subcases: ['Appointment scheduling', 'Lab result queries', 'Insurance pre-authorization', 'Multilingual triage']
  },
  EdTech: {
    title: 'Student enrollment & fee reminders',
    desc: 'Reach prospective learners within seconds of inquiry, answer syllabus questions, and schedule academic counseling.',
    stat: '3.2× higher demo show-up rate',
    subcases: ['Student enrollment calls', 'Course inquiry FAQs', 'Fee installment reminders', 'Demo session booking']
  }
}

type Industry = keyof typeof industries

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

export default function App() {
  const [industry, setIndustry] = useState<Industry>('Insurance')
  const [calls, setCalls] = useState(5000)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    useCase: ''
  })

  const humanCost = calls * 25
  const aiCost = calls * 7
  const savings = humanCost - aiCost

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!demoForm.name || !demoForm.email) return
    setDemoSubmitted(true)
  }

  return (
    <main>
      {/* STICKY EDITORIAL NAVIGATION */}
      <nav className="nav shell">
        <a className="wordmark" href="#" aria-label="VoiceBridg home">
          <span className="wordmark-mark">V</span>
          <span>Voice<span className="accent">Bridg</span></span>
        </a>
        <div className="nav-links">
          <a href="#problem">Why VoiceBridg</a>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#usecases">Use cases</a>
          <a href="#plans">Plans</a>
          <a href="#calculator">Calculator</a>
          <a href="https://app.voicebridg.com/login" target="_blank" rel="noreferrer" className="login-link">
            Login
          </a>
        </div>
        <div className="nav-actions">
          <a className="nav-cta" href="#demo">
            Request Demo <Arrow />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> AI voice agents that learn every call
          </p>
          <h1>
            Your AI agent gets<br />
            <em>smarter after every call.</em>
          </h1>
          <p className="hero-intro">
            While other voice bots just repeat static scripts, VoiceBridg automatically analyses every conversation, identifies where the agent struggled, and drafts improved responses for your approval.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#demo">
              Request a demo <Arrow />
            </a>
            <a className="text-link" href="#how">
              See how it learns <span>↓</span>
            </a>
          </div>
        </div>

        {/* Hero Visual: Editorial Call Specimen Card with Scribble */}
        <EditorialCallCard />
      </section>

      {/* HERO STATS BANNER */}
      <div className="hero-stats-banner shell">
        <div>
          <strong>₹150+ → ₹18</strong>
          <span>Cost per human call vs Voice AI</span>
        </div>
        <div>
          <strong>80%</strong>
          <span>Repetitive calls automated</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Always on, never tired</span>
        </div>
      </div>

      {/* KINETIC TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          EMI REMINDERS <span>✦</span> LEAD QUALIFICATION <span>✦</span> CUSTOMER SUPPORT <span>✦</span> APPOINTMENT BOOKING <span>✦</span> COLLECTIONS <span>✦</span> POLICY RENEWALS <span>✦</span> CURIOUS BY DEFAULT <span>✦</span> HUMAN AT HEART <span>✦</span> EMI REMINDERS <span>✦</span> LEAD QUALIFICATION <span>✦</span> CUSTOMER SUPPORT <span>✦</span>
        </div>
      </div>

      {/* SECTION 1: PROBLEM (Why Businesses Switch) */}
      <section className="problem-section shell" id="problem">
        <div className="section-kicker">Why businesses switch to VoiceBridg</div>
        <div className="section-heading">
          <h2>
            Most voice bots<br />
            <em>deploy and forget.</em>
          </h2>
          <p>
            Traditional bots stay frozen in time while your customers and objections evolve.
          </p>
        </div>

        <div className="pain-points-grid">
          {painPoints.map(p => (
            <div className="pain-card" key={p.num}>
              <span className="card-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: 8-FEATURE BREAKDOWN (Not a voice bot. A learning system.) */}
      <section className="dark-section" id="features">
        <div className="shell">
          <div className="section-kicker">Not a voice bot. A learning system.</div>
          <div className="section-heading">
            <h2>
              Intelligence built into<br />
              <em>every conversation.</em>
            </h2>
            <p>
              VoiceBridg does not just execute phone calls — it continuously audits outcomes, tests prompt hypotheses, and surfaces revenue leaks.
            </p>
          </div>

          <div className="feature-grid-8">
            {features.map(f => (
              <article className="feature-item" key={f.num}>
                <div>
                  <div className="feature-item-header">
                    <span className="feature-number">{f.num}</span>
                    <span className="feature-category">{f.category}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
                <div className="feature-stat">
                  <span>{f.stat}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WORKFLOW (The Dual-Agent Architecture) */}
      <section className="workflow shell" id="how">
        <div className="section-kicker">The dual-agent architecture</div>
        <div className="section-heading">
          <h2>
            Two AIs working together<br />
            <em>so you don&apos;t have to.</em>
          </h2>
          <p>
            The Voice Agent talks to your customers. The Analyst Agent studies what happened and helps the next call go better.
          </p>
        </div>

        <div className="agent-line">
          <div className="agent">
            <span>01</span>
            <h3>Voice Agent</h3>
            <p>
              Handles inbound and outbound phone calls across 40+ languages. Answers questions, manages objections, and books appointments 24/7.
            </p>
          </div>
          <div className="agent-connector">learns from every call</div>
          <div className="agent">
            <span>02</span>
            <h3>Analyst Agent</h3>
            <p>
              Inspects audio transcripts immediately, spots unanswered questions, scores call quality (0–100), and drafts prompt patches.
            </p>
          </div>
        </div>

        <div className="steps">
          {[
            'Caller phones in',
            'Call ends, analysis begins',
            'Suggestion arrives in inbox',
            'You approve and improve'
          ].map((step, index) => (
            <div className="step" key={step}>
              <span>0{index + 1}</span>
              <h4>{step}</h4>
              <p>
                {[
                  'Your existing number connects to a voice agent customized for your exact industry use case.',
                  'The Analyst Agent flags hesitations, drop-offs, and weak agent replies.',
                  'You receive a side-by-side prompt diff with supporting audio evidence.',
                  'One click pushes the optimized instruction live for all future conversations.'
                ][index]}
              </p>
            </div>
          ))}
        </div>

        {/* Human-in-the-loop guarantee */}
        <div className="guarantee-box">
          <strong>Human-in-the-Loop Guarantee:</strong>
          <span> The Analyst Agent never modifies live production prompts without explicit human administrator approval.</span>
        </div>
      </section>

      {/* SECTION 4: PROOF / OUTCOMES BANNER */}
      <section className="outcomes">
        <div className="shell outcome-inner">
          <div>
            <div className="section-kicker">Proven business outcomes</div>
            <h2>
              What your team<br />
              <em>actually gets.</em>
            </h2>
          </div>
          <div className="outcomes-stats">
            <div>
              <strong>90%</strong>
              <span>lower cost per call</span>
            </div>
            <div>
              <strong>3×</strong>
              <span>more calls without headcount</span>
            </div>
            <div>
              <strong>30 days</strong>
              <span>to measurable improvement</span>
            </div>
            <div>
              <strong>0</strong>
              <span>missed calls during surges</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: USE CASES (Including EdTech) */}
      <section className="usecases shell" id="usecases">
        <div className="section-kicker">Built for industries where every call counts</div>
        <div className="section-heading">
          <h2>
            One agent.<br />
            <em>Many moments.</em>
          </h2>
          <p>
            Start with the conversations that consume the most hours. VoiceBridg gives your team room to focus on high-value human relationships.
          </p>
        </div>

        <div className="industry-tabs">
          {(Object.keys(industries) as Industry[]).map((name) => (
            <button
              className={industry === name ? 'active' : ''}
              onClick={() => setIndustry(name)}
              key={name}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="industry-result">
          <div className="result-art">
            <small>LIVE USE CASE SPECIMEN</small>
            <span>VB</span>
            <small>{industry.toUpperCase()} DEPLOYMENT</small>
          </div>
          <div>
            <p className="eyebrow">Selected use case</p>
            <h3>{industries[industry].title}</h3>
            <p>{industries[industry].desc}</p>
            <strong>{industries[industry].stat}</strong>

            <div className="subcases-list">
              {industries[industry].subcases.map(sc => (
                <span key={sc}>✓ {sc}</span>
              ))}
            </div>

            <a className="dark-link" href="#demo">
              Talk about your use case <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: PLANS */}
      <section className="plans" id="plans">
        <div className="shell">
          <div className="section-kicker">Simple pricing</div>
          <div className="section-heading">
            <h2>
              Pay for the calls.<br />
              <em>Not the seats.</em>
            </h2>
            <p>No long contracts. No per-seat fees. Just a platform built around your volume.</p>
          </div>

          <div className="plan-grid">
            <article className="plan">
              <div>
                <span>Basic Plan</span>
                <h3>
                  ₹12,000 <small>/ month + usage</small>
                </h3>
                <p>Get your first AI agent live fast on your existing number.</p>
                <ul>
                  <li>Phone number integration (SIP, Twilio, Exotel)</li>
                  <li>6-section manual prompt editor</li>
                  <li>Version history & 1-click rollback</li>
                  <li>Basic call logs & audio recording</li>
                  <li>Email & ticketing support</li>
                </ul>
              </div>
              <a className="button button-outline" href="#demo">
                Get started <Arrow />
              </a>
            </article>

            <article className="plan featured">
              <div>
                <span>Most popular · Pro Plan</span>
                <h3>
                  ₹25,000 <small>/ month + usage</small>
                </h3>
                <p>AI that learns, audits itself, and delivers continuous gains.</p>
                <ul>
                  <li>Everything in Basic</li>
                  <li>Dual-agent self-improvement loop</li>
                  <li>Objection & conversation gap detection</li>
                  <li>Call quality scoring (0–100) on all calls</li>
                  <li>1-click prompt diff approval</li>
                  <li>Plain English analytics chatbot</li>
                  <li>Dedicated Slack channel & priority SLA</li>
                </ul>
              </div>
              <a className="button button-dark" href="#demo">
                Request Pro demo <Arrow />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 7: CALCULATOR */}
      <section className="calculator shell" id="calculator">
        <div className="calculator-copy">
          <div className="section-kicker">VoiceBridg cost intelligence</div>
          <h2>
            See what your<br />
            <em>calls could save.</em>
          </h2>
          <p>
            Move the slider to compare the monthly cost of human-only support with an AI + human model.
          </p>
          <label htmlFor="calls">
            Monthly calls <strong>{calls.toLocaleString('en-IN')}</strong>
          </label>
          <input
            id="calls"
            type="range"
            min="1000"
            max="20000"
            step="1000"
            value={calls}
            onChange={(event) => setCalls(Number(event.target.value))}
          />
        </div>

        <div className="calculator-result">
          <div>
            <span>Human-only support (₹25/call)</span>
            <strong>₹{humanCost.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span>VoiceBridg + human (₹7/call)</span>
            <strong>₹{aiCost.toLocaleString('en-IN')}</strong>
          </div>
          <div className="saving">
            <span>Estimated monthly saving</span>
            <strong>₹{savings.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT & LEAD FORM (#demo) */}
      <section className="contact shell" id="demo">
        <div className="contact-card">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Get started today
          </p>
          <h2>
            Talk to us before<br />
            <em>you sign anything.</em>
          </h2>
          <p>
            We&apos;ll show you the platform live, configure a demo agent for your use case, and tell you honestly whether VoiceBridg is right for you.
          </p>

          {demoSubmitted ? (
            <div className="demo-success-box">
              <h3>✓ Demo Request Received</h3>
              <p>Thank you, {demoForm.name}. Our voice solutions architect will call you shortly at {demoForm.phone || demoForm.email}.</p>
              <button onClick={() => setDemoSubmitted(false)} className="button button-dark">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} className="demo-form">
              <div className="form-row">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={demoForm.name}
                  onChange={e => setDemoForm({ ...demoForm, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  placeholder="Work Email"
                  value={demoForm.email}
                  onChange={e => setDemoForm({ ...demoForm, email: e.target.value })}
                />
              </div>
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone Number (+91-XXXXX-XXXXX)"
                  value={demoForm.phone}
                  onChange={e => setDemoForm({ ...demoForm, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Describe your use case (e.g. Policy Renewals)"
                  value={demoForm.useCase}
                  onChange={e => setDemoForm({ ...demoForm, useCase: e.target.value })}
                />
              </div>
              <button type="submit" className="button button-dark demo-submit-btn">
                Request My Demo <Arrow />
              </button>
            </form>
          )}

          <div className="direct-contact-note">
            <span>Direct contact: </span>
            <a href="mailto:hello@voicebridg.com">hello@voicebridg.com</a>
            <span> · </span>
            <a href="tel:+917207982810">+91-7207982810</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer shell">
        <a className="wordmark" href="#">
          <span className="wordmark-mark">V</span>
          <span>Voice<span className="accent">Bridg</span></span>
        </a>
        <span>Voice AI that gets better every call · © 2026 Interactively Solutions Pvt Ltd. All Rights Reserved.</span>
        <a href="mailto:hello@voicebridg.com">
          hello@voicebridg.com <Arrow />
        </a>
      </footer>
    </main>
  )
}
