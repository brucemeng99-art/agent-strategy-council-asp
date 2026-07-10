import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const defaultPrompt = `A mid-sized hardware brand is considering launching a new AI-enabled product line in North America within 90 days. Should the company proceed? Evaluate market opportunity, product positioning, budget risk, source evidence, organizational memory, and execution tasks.`;

const council = [
  {
    id: 'chair',
    icon: '👨‍💼',
    name: 'Council Chair Agent',
    title: 'CEO synthesis and decision control',
    frame: 'Keeps the meeting moving, weighs trade-offs, and turns debate into a decision.',
  },
  {
    id: 'strategy',
    icon: '🧭',
    name: 'Strategy Agent',
    title: 'Market and positioning',
    frame: 'Decides where to play, why now, and what must be true for the move to work.',
  },
  {
    id: 'product',
    icon: '🛠️',
    name: 'Product Agent',
    title: 'Offer and roadmap',
    frame: 'Translates the idea into product scope, launch wedge, and minimum lovable offer.',
  },
  {
    id: 'finance',
    icon: '💵',
    name: 'Finance Agent',
    title: 'Unit economics',
    frame: 'Pressure-tests cost, pricing, payback, and validation budget.',
  },
  {
    id: 'risk',
    icon: '🛡️',
    name: 'Risk Agent',
    title: 'Compliance and downside',
    frame: 'Finds hidden risks, approval gates, data exposure, customer trust, and failure modes.',
  },
  {
    id: 'memory',
    icon: '🗂️',
    name: 'Org Memory Agent',
    title: 'Obsidian-style knowledge memory',
    frame: 'Checks prior decisions, reusable SOPs, strategic principles, and organizational continuity.',
  },
  {
    id: 'sources',
    icon: '📚',
    name: 'Source Review Agent',
    title: 'NotebookLM-style source grounding',
    frame: 'Reviews uploaded notes, transcripts, references, and evidence before the chair finalizes.',
  },
];

const executionCorps = [
  { icon: '🧠', name: 'Codex', role: 'Code, data, backend, GitHub operations' },
  { icon: '🐉', name: 'Claude Code', role: 'Frontend, documents, risk review, long-form plans' },
  { icon: '💎', name: 'Gemini', role: 'Research, multimodal review, fallback reasoning' },
  { icon: '🌙', name: 'Kimi / long-context model', role: 'Long context reading and Chinese materials review' },
  { icon: '🟢', name: 'OpenClaw / front-office agent', role: 'External group coordination and front desk tasks' },
  { icon: '🕵️', name: 'Holmes / local worker', role: 'Local file bridge, logs, and workstation-side execution' },
  { icon: '🔌', name: 'MCP / RPA tools', role: 'Tool calls, SaaS workflows, browser and API automation' },
];

function pickTopicSignals(text) {
  const lower = text.toLowerCase();
  return {
    market: lower.includes('north america') || lower.includes('market') ? 'market entry' : 'growth bet',
    speed: /90|30|60|days|weeks|deadline/.test(lower) ? 'time-boxed launch' : 'phased validation',
    product: lower.includes('product') || lower.includes('line') ? 'new product line' : 'new initiative',
    risk: lower.includes('compliance') || lower.includes('risk') ? 'explicit risk review' : 'risk discovery',
    ai: lower.includes('ai') ? 'AI-enabled offer' : 'technology-enabled offer',
  };
}

function generateCouncil(topic) {
  const s = pickTopicSignals(topic);
  const round1 = {
    chair: `Meeting rule: separate strategic decision from execution. The council should first decide whether this ${s.product} deserves a gated public validation, then only dispatch work after board approval. I will require clear disagreement before final synthesis.`,
    strategy: `Recommendation: proceed only as a ${s.speed}, not as a full-scale rollout. The strongest angle is a focused wedge for one buyer segment, then expansion through proof. Validate buyer urgency, channel access, and one non-obvious reason to believe now is the right time.`,
    product: `Build the first version around one painful workflow, not a broad platform. The MVP should include a clear promise, a narrow feature set, and a demo that a non-technical buyer understands in under two minutes.`,
    finance: `The decision should be staged. Cap the first validation budget and price the pilot so each session or engagement covers variable AI and support cost. If buyers will not pay for a pilot, treat that as weak demand evidence.`,
    risk: `Main red flags: overclaiming AI capability, unclear data handling, support burden, and regulatory or platform-review delays. The launch must expose no private data, no hidden model keys, and no unmanaged automation without approval.`,
    memory: `Relevant organizational memory: decisions like this fail when discussion ends at a document. The durable pattern is: decision standard → owner → acceptance criteria → review cadence → reusable SOP.`,
    sources: `Evidence requirement: separate assumptions from sources. Before public claims, attach uploaded notes, customer transcripts, market references, or test results. Unsupported claims should remain hypotheses, not launch copy.`,
  };
  const debate = {
    chair: `I accept Strategy's gated-launch view and Risk's isolation requirement. I reject any plan that skips board approval before execution. The meeting must end with a task list, but dispatch waits for the approval seal.`,
    strategy: `I agree with Finance that the first budget must be capped. I disagree with Product if the MVP becomes too polished before demand is proven. Public credibility first, narrow paid pilots second.`,
    product: `I agree with Risk that trust is part of the product. I disagree with waiting too long for perfect positioning; a working demo can generate positioning data faster than internal debate.`,
    finance: `I agree with Execution discipline and disagree with pricing below variable cost for attention. Even a hackathon demo should show a credible pay-per-use model.`,
    risk: `I agree with Product that a demo is necessary. I disagree with connecting the public demo to private execution systems. The public version must be isolated, sanitized, and approval-gated.`,
    memory: `I agree with the Chair's separation of decision and execution. I disagree with losing the meeting archive; every round, dissent, decision, approval, and dispatched task should remain traceable.`,
    sources: `I agree with Strategy on market entry but disagree with treating intuition as evidence. Final copy should distinguish observed facts, source-backed claims, and assumptions to test.`,
  };
  const decision = `Conditional GO. Launch a public, sanitized MVP that demonstrates the council workflow: board question → multi-role debate → source and memory review → chair synthesis → board approval seal → executable task dispatch. Do not claim autonomous execution in the first public version; show approval-gated execution planning first.`;
  const tasks = [
    { owner: 'Product', target: 'Claude Code', priority: 'High', task: 'Define one public demo scenario, council roles, and meeting language.', acceptance: 'A visitor understands the council workflow in 30 seconds.' },
    { owner: 'Engineering', target: 'Codex', priority: 'High', task: 'Deploy a sanitized demo with no private bridge, local paths, or secrets.', acceptance: 'Public URL opens and secret/internal scan is clean.' },
    { owner: 'Risk', target: 'Claude Code', priority: 'High', task: 'Review copy, data flow, claims, and approval boundaries.', acceptance: 'No private context, no hidden execution, no overclaiming.' },
    { owner: 'Source Review', target: 'Notebook-style reviewer', priority: 'Normal', task: 'Attach or summarize source evidence for claims.', acceptance: 'Claims are marked as fact, source-backed claim, or assumption.' },
    { owner: 'Org Memory', target: 'Obsidian-style memory', priority: 'Normal', task: 'Convert the meeting result into reusable SOP and decision record.', acceptance: 'Decision, dissent, approval, and task owners are archived.' },
    { owner: 'Growth', target: 'Gemini / media helper', priority: 'Normal', task: 'Record a 60-90 second demo and prepare launch copy.', acceptance: 'Video shows prompt → debate → chair decision → approval → tasks.' },
  ];
  return { round1, debate, decision, tasks };
}

function App() {
  const [topic, setTopic] = useState(defaultPrompt);
  const [session, setSession] = useState(() => generateCouncil(defaultPrompt));
  const [stage, setStage] = useState('ready');
  const [approved, setApproved] = useState(false);

  const costNote = useMemo(() => ({ price: '2 USDT', mode: 'Pay per council session', boundary: 'Users pay for the outcome; provider controls model cost under the hood.' }), []);

  function runCouncil() {
    setStage('running');
    setApproved(false);
    window.setTimeout(() => {
      setSession(generateCouncil(topic));
      setStage('done');
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  }

  return <main>
    <section className="hero">
      <div className="badge">OKX.AI Genesis Hackathon MVP · sanitized public demo</div>
      <h1>Agent Strategy Council</h1>
      <p className="lead">An approval-gated multi-agent boardroom: debate, source review, organizational memory, chair decision, and executable task dispatch.</p>
      <div className="heroGrid">
        <div><strong>Board layer</strong><span>Human chairman approves the final decision before execution.</span></div>
        <div><strong>Council layer</strong><span>Role agents debate, challenge, synthesize, and preserve the meeting record.</span></div>
        <div><strong>Execution layer</strong><span>Codex, Claude Code, Gemini, Kimi, OpenClaw, Holmes, MCP/RPA receive approved tasks.</span></div>
      </div>
    </section>

    <section className="panel layers">
      <h2>Operating structure</h2>
      <div className="layerFlow">
        <div><b>👑 Chairman</b><span>Final approval · "Approved" seal</span></div>
        <div><b>🏛️ Strategy Council</b><span>Chair · Strategy · Product · Finance · Risk · Org Memory · Source Review</span></div>
        <div><b>⚙️ Execution Corps</b><span>How / Do / Verify after approval only</span></div>
      </div>
    </section>

    <section className="panel inputPanel">
      <div className="panelHead">
        <h2>Start a council session</h2>
        <p>Use the demo scenario or paste your own business decision.</p>
      </div>
      <textarea value={topic} onChange={e => setTopic(e.target.value)} />
      <div className="actions">
        <button onClick={runCouncil}>{stage === 'running' ? 'Council is thinking…' : 'Run strategy council'}</button>
        <span>{costNote.mode}: suggested demo price {costNote.price}. {costNote.boundary}</span>
      </div>
    </section>

    <section className="panel" id="results">
      <div className="panelHead">
        <h2>Round 1 · independent perspectives</h2>
        <p>Each agent analyzes the same question from a different organizational seat.</p>
      </div>
      <div className="cards cardsWide">
        {council.map(a => <article className="card" key={a.id}>
          <header><span>{a.icon}</span><div><h3>{a.name}</h3><small>{a.title}</small></div></header>
          <p className="frame">{a.frame}</p>
          <p>{session.round1[a.id]}</p>
        </article>)}
      </div>
    </section>

    <section className="panel">
      <div className="panelHead">
        <h2>Round 2 · cross-review and disagreement</h2>
        <p>The council must name agreement, disagreement, and a correction.</p>
      </div>
      <div className="debateList">
        {council.map(a => <div className="debate" key={a.id}><b>{a.icon} {a.name}</b><p>{session.debate[a.id]}</p></div>)}
      </div>
    </section>

    <section className="panel decision">
      <div className="panelHead">
        <h2>Chair decision</h2>
        <p>One synthesized decision, not disconnected answers.</p>
      </div>
      <blockquote>{session.decision}</blockquote>
      <div className="actions approvalActions">
        <button className="approveBtn" onClick={() => setApproved(true)}>👑 Board approval: APPROVED</button>
        {approved && <span className="seal">Chairman seal · APPROVED</span>}
      </div>
    </section>

    <section className="panel">
      <div className="panelHead">
        <h2>Executable task list</h2>
        <p>Tasks are editable in the full product; this demo shows approval-gated dispatch targets.</p>
      </div>
      <div className="table">
        {session.tasks.map((t, i) => <div className="row" key={i}>
          <span className="num">{String(i + 1).padStart(2, '0')}</span>
          <span className="owner">{t.owner}</span>
          <span className="priority">{t.priority}</span>
          <span className="target">→ {t.target}</span>
          <span className="task"><b>{t.task}</b><em>{t.acceptance}</em></span>
        </div>)}
      </div>
    </section>

    <section className="panel">
      <div className="panelHead">
        <h2>Execution corps</h2>
        <p>They do not vote on strategy; they execute after approval and return status.</p>
      </div>
      <div className="execGrid">
        {executionCorps.map(x => <div className="execCard" key={x.name}><b>{x.icon} {x.name}</b><span>{x.role}</span></div>)}
      </div>
    </section>

    <section className="panel safety">
      <h2>Public safety boundary</h2>
      <ul>
        <li>No private company data in the demo.</li>
        <li>No local file bridge, internal automation, private network, or hidden execution system.</li>
        <li>No API keys in the browser or repository.</li>
        <li>Autonomous execution is approval-gated; this MVP demonstrates decision and planning.</li>
      </ul>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
