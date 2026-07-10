import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const defaultPrompt = `A mid-sized hardware brand is considering launching a new AI-enabled product line in North America within 90 days. Should the company proceed? Evaluate market opportunity, product positioning, budget risk, compliance risk, and execution tasks.`;

const council = [
  {
    id: 'strategy',
    icon: '🧭',
    name: 'Strategy Agent',
    title: 'Market and positioning',
    frame: 'Decide where to play, why now, and what must be true for the move to work.',
  },
  {
    id: 'product',
    icon: '🛠️',
    name: 'Product Agent',
    title: 'Offer and roadmap',
    frame: 'Translate the idea into a product scope, launch wedge, and minimum lovable offer.',
  },
  {
    id: 'finance',
    icon: '💵',
    name: 'Finance Agent',
    title: 'Unit economics',
    frame: 'Pressure-test cost, pricing, payback, and the smallest budget that can validate demand.',
  },
  {
    id: 'risk',
    icon: '🛡️',
    name: 'Risk Agent',
    title: 'Compliance and downside',
    frame: 'Find hidden risks, approval gates, data exposure, customer trust, and failure modes.',
  },
  {
    id: 'execution',
    icon: '⚙️',
    name: 'Execution Agent',
    title: 'Plan and ownership',
    frame: 'Convert the decision into owners, milestones, acceptance criteria, and a review cadence.',
  },
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
    strategy: `Recommendation: proceed only as a ${s.speed}, not as a full-scale rollout. The strongest angle is to frame the ${s.product} as a focused wedge for one buyer segment, then earn expansion through proof. Before committing, validate three things: buyer urgency, channel access, and one clear reason the offer is hard to substitute.`,
    product: `Build the first version around one painful workflow, not a broad platform. The MVP should include a clear promise, a narrow feature set, and a demo that a non-technical buyer understands in under two minutes. Avoid adding integrations until the first buying signal is proven.`,
    finance: `The decision should be staged. Cap the first validation budget and price the pilot so each session or engagement covers variable AI and support cost. If the product cannot support paid pilots early, treat that as a weak demand signal rather than a marketing problem.`,
    risk: `Main red flags: overclaiming AI capability, unclear data handling, customer support burden, and regulatory or platform-review delays. The launch should expose no private data, no hidden model keys, and no unmanaged automation that can act outside user approval.`,
    execution: `Launch path: define ICP, landing page, live demo, pilot price, review gate, and owner per task. The first milestone is not scale; it is a credible public demo plus 3-5 qualified user conversations and a go/no-go review.`
  };
  const debate = {
    strategy: `I agree with Finance that the first budget must be capped. I disagree with Product if the MVP becomes too polished before demand is proven. The right move is public credibility first, then narrow paid pilots.`,
    product: `I agree with Risk that trust is part of the product. I disagree with Strategy on waiting too long for perfect positioning; a working demo can generate the positioning data faster than internal debate.`,
    finance: `I agree with Execution that the milestone must be measurable. I disagree with any plan that prices below variable cost for attention. Even a hackathon demo should show a path to pay-per-use economics.`,
    risk: `I agree with Product that a demo is necessary. I disagree with connecting the public demo to private execution systems. The public version must be isolated, sanitized, and approval-gated.`,
    execution: `I agree with Strategy on a narrow wedge and with Risk on isolation. I disagree with open-ended exploration. The team needs a seven-day checklist, not another brainstorm.`
  };
  const decision = `Conditional GO. Launch a public, sanitized MVP that demonstrates the council workflow without exposing private systems. The product should sell the outcome: one business question becomes a multi-role decision and an executable action plan. Do not claim autonomous execution in the first public version; show action-plan generation and approval gates first.`;
  const tasks = [
    { owner: 'Product', priority: 'High', task: 'Define one default demo scenario and the five council roles.', acceptance: 'A visitor can understand the use case in 30 seconds.' },
    { owner: 'Engineering', priority: 'High', task: 'Deploy a sanitized public demo with no private bridge, local paths, or secrets.', acceptance: 'Public URL opens and secret scan finds no internal tokens or private names.' },
    { owner: 'Risk', priority: 'High', task: 'Review copy, data flow, and claims before submission.', acceptance: 'No private company context, no hidden execution, no overclaiming.' },
    { owner: 'Growth', priority: 'Normal', task: 'Record a 60-90 second demo and prepare a launch post.', acceptance: 'Video shows prompt → council debate → final decision → action plan.' },
    { owner: 'Finance', priority: 'Normal', task: 'Set a pay-per-session price floor.', acceptance: 'Price is higher than estimated model and support cost.' },
  ];
  return { round1, debate, decision, tasks };
}

function App() {
  const [topic, setTopic] = useState(defaultPrompt);
  const [session, setSession] = useState(() => generateCouncil(defaultPrompt));
  const [stage, setStage] = useState('ready');

  const costNote = useMemo(() => ({ price: '2 USDT', mode: 'Pay per council session', boundary: 'Users pay for the outcome; provider controls model cost under the hood.' }), []);

  function runCouncil() {
    setStage('running');
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
      <p className="lead">Turn one business question into a multi-agent boardroom decision and executable action plan.</p>
      <div className="heroGrid">
        <div><strong>Problem</strong><span>AI tools are isolated across chats and agents.</span></div>
        <div><strong>Solution</strong><span>A council workflow: debate, chair decision, action plan.</span></div>
        <div><strong>Business model</strong><span>{costNote.mode}: suggested demo price {costNote.price}.</span></div>
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
        <span>{costNote.boundary}</span>
      </div>
    </section>

    <section className="panel" id="results">
      <div className="panelHead">
        <h2>Round 1 · independent perspectives</h2>
        <p>Each agent analyzes the same question from a different organizational seat.</p>
      </div>
      <div className="cards">
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
        <p>One synthesized decision, not five disconnected answers.</p>
      </div>
      <blockquote>{session.decision}</blockquote>
    </section>

    <section className="panel">
      <div className="panelHead">
        <h2>Executable action plan</h2>
        <p>Decision becomes task ownership and acceptance criteria.</p>
      </div>
      <div className="table">
        {session.tasks.map((t, i) => <div className="row" key={i}>
          <span className="num">{String(i + 1).padStart(2, '0')}</span>
          <span className="owner">{t.owner}</span>
          <span className="priority">{t.priority}</span>
          <span className="task"><b>{t.task}</b><em>{t.acceptance}</em></span>
        </div>)}
      </div>
    </section>

    <section className="panel safety">
      <h2>Public safety boundary</h2>
      <ul>
        <li>No private company data in the demo.</li>
        <li>No local file bridge, internal automation, or hidden execution system.</li>
        <li>No API keys in the browser or repository.</li>
        <li>Autonomous execution is approval-gated; this MVP demonstrates decision and planning.</li>
      </ul>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
