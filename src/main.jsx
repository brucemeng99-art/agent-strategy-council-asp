import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Simulated execution-tracking stages. This is a client-side demo only:
// it mirrors the "dispatched -> accepted -> in progress -> done" lifecycle of a
// real council, but connects to no bridge, no automation, and no real agents.
const EXEC_STAGES = [
  { label: 'Queued', progress: 0 },
  { label: 'Dispatched', progress: 15 },
  { label: 'Accepted', progress: 35 },
  { label: 'In progress', progress: 70 },
  { label: 'Done (simulated)', progress: 100 },
];

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
    raw: text.trim(),
    brief: text.trim().replace(/\s+/g, ' ').slice(0, 220),
    okx: lower.includes('okx') || lower.includes('agent id') || lower.includes('5155') || lower.includes('#okxai'),
    manufacturing: lower.includes('manufactur') || lower.includes('catalytic') || lower.includes('三元催化') || lower.includes('出口') || lower.includes('north america') || lower.includes('middle east'),
    market: lower.includes('north america') || lower.includes('market') ? 'market entry' : 'growth bet',
    speed: /90|30|60|days|weeks|deadline/.test(lower) ? 'time-boxed launch' : 'phased validation',
    product: lower.includes('product') || lower.includes('line') ? 'new product line' : 'new initiative',
    risk: lower.includes('compliance') || lower.includes('risk') ? 'explicit risk review' : 'risk discovery',
    ai: lower.includes('ai') ? 'AI-enabled offer' : 'technology-enabled offer',
  };
}

function buildInitialRounds(session) {
  return [
    { n: 1, title: 'Round 1 · independent perspectives', note: 'Each agent analyzes the same question from a different organizational seat.', entries: session.round1 },
    { n: 2, title: 'Round 2 · cross-review and disagreement', note: 'The council must name agreement, disagreement, and a correction.', entries: session.debate },
  ];
}

function generateAdditionalRound(topic, roundNo, chairmanNote) {
  const s = pickTopicSignals(topic);
  const note = chairmanNote?.trim() || 'The chairman asks the council to continue, challenge assumptions, and sharpen the final decision.';
  return {
    chair: `Chair instruction received: “${note}” I will force this round to respond directly to the chairman, separate disagreement from consensus, and move toward a sharper decision gate.`,
    strategy: `Responding to the chairman: the strategic question is no longer only whether to proceed, but what proof must be produced before expansion. For this ${s.speed}, I would require one clear segment, one channel test, and one stop-loss rule.`,
    product: `Responding to the chairman: I would narrow the offer further. The next round should turn the idea into a demo promise, a buyer workflow, and one acceptance test that proves the ${s.product} is understandable.`,
    finance: `Responding to the chairman: I would not approve open-ended spending. The next gate should define maximum validation budget, pilot price, and the metric that proves payback is plausible.`,
    risk: `Responding to the chairman: the strongest correction is to keep public claims below proven capability. Any execution, integration, or data handling should remain approval-gated until reviewed.`,
    memory: `Responding to the chairman: this round should be archived as a decision record, not just a discussion. The reusable rule is: chairman question → dissent → revised decision standard → task owner → review date.`,
    sources: `Responding to the chairman: the council should mark which points are facts, which are source-backed claims, and which are assumptions. Unsupported assumptions should become test tasks, not marketing copy.`,
  };
}

function generateCouncil(topic) {
  const s = pickTopicSignals(topic);
  const scenario = s.okx
    ? 'OKX.AI Genesis Hackathon final-submission sprint'
    : s.manufacturing
      ? 'manufacturing export business decision'
      : `${s.speed} ${s.product}`;
  const xPost = `Introducing AI Command Council — an approval-gated multi-agent boardroom for real manufacturing operators. It turns one business question into independent agent perspectives, chair synthesis, approved tasks, and organizational memory. Agent ID: 5155 https://agentstrategycouncil.com/ #OKXAI`;
  const round1 = {
    chair: `Priority: HIGH. This is a ${scenario}, so the council must separate public demo proof from private execution. The decision gate is: can a reviewer see the workflow clearly in one session — prompt → independent perspectives → chair decision → approved task list → memory record?`,
    strategy: `Recommendation: proceed today as a submission sprint, not a broad platform promise. Position AI Command Council as an enterprise coordination layer for operators who already use multiple AI tools but lack governance, role division, and memory. The wedge is manufacturing decision support, because it shows real operational complexity without exposing private data.`,
    product: `The demo must answer the pasted prompt visibly. Minimum product promise: paste a business decision, click Run Strategy Council, receive role-based perspectives, a chair decision, and executable tasks. For this test, the output should explicitly mention AI Command Council, Agent ID: 5155, the public URL, and #OKXAI so the result is screenshot-ready.`,
    finance: `Commercial view: keep the first offer simple — pay-per-council-session or BYOK enterprise workspace. Do not imply unlimited autonomous execution. Show that the provider can control model cost while customers pay for decision outcomes, auditability, and task routing.`,
    risk: `Main risk: judges think this is only a static webpage or that it overclaims real autonomous execution. Mitigation: label the public site as a sanitized MVP, show approval-gated execution, and make the result visibly change when the user runs a council session. No browser API keys, no private bridge, no company data.`,
    memory: `Organizational memory rule: this session should become a reusable record — input question, independent perspectives, disagreements, final decision, task owners, and posting copy. That is the difference between a chat answer and an AI organization process.`,
    sources: `Source discipline: public claims should be limited to what the demo proves. Proven: structured multi-role council flow, approval gate, task plan, memory-style record. Assumption to validate later: real model-backed sessions and enterprise workspace economics.`,
  };
  const debate = {
    chair: `I accept Risk's warning: the public demo must not pretend to run private agents. I also accept Product's correction: if the button does not visibly produce a result, the demo fails. Final decision must prioritize visible reviewer confidence.`,
    strategy: `I agree with Product that the demo must be obvious within seconds. I disagree with making the X post too generic. The post should name the manufacturing operator use case and the multi-agent governance problem.`,
    product: `I agree with Risk on safety boundaries, but disagree with hiding the experience behind disclaimers. The interaction should feel alive: clear running state, generated perspectives, decision, task list, and approval dispatch lifecycle.`,
    finance: `I agree with Strategy that this should be positioned as outcome infrastructure, not another chatbot. I disagree with selling it as full automation today; the safer paid wedge is approval-gated council sessions.`,
    risk: `I agree with Product that visible output is mandatory. I disagree with any copy implying real private execution from the public site. The safe phrase is “sanitized MVP demonstrating the workflow.”`,
    memory: `I agree with the Chair that every run must become a record. I disagree with treating the X post as a side task; it is part of the decision record and should be generated by the council.`,
    sources: `I agree with Risk: claims must match what the public site proves. The screenshot should show the workflow and the final X/Twitter draft, not private backend claims.`,
  };
  const decision = s.okx
    ? `GO for OKX.AI submission. Use this as the final public demo: AI Command Council coordinates role-based agents for a manufacturing operator, produces a clear task plan, keeps execution approval-gated, and outputs the X/Twitter launch copy. Do not claim private autonomous execution from the public site; claim a sanitized MVP demonstrating the enterprise AI command workflow.\n\nX/Twitter draft:\n${xPost}`
    : `Conditional GO. Launch a public, sanitized MVP that demonstrates the council workflow: board question → multi-role debate → source and memory review → chair synthesis → board approval seal → executable task dispatch. Do not claim autonomous execution in the first public version; show approval-gated execution planning first.`;
  const tasks = [
    { owner: 'Product', target: 'Claude Code', priority: 'High', task: 'Make the public demo visibly generate OKX-ready council output from the pasted prompt.', acceptance: 'A visitor sees independent perspectives, a chair decision, and X/Twitter draft after clicking Run.' },
    { owner: 'Engineering', target: 'Codex', priority: 'High', task: 'Deploy the sanitized static demo with no private bridge, local paths, API keys, or secrets.', acceptance: 'https://agentstrategycouncil.com/ opens, button works, and build passes.' },
    { owner: 'Risk', target: 'Claude Code', priority: 'High', task: 'Review copy, public claims, data flow, and approval boundaries.', acceptance: 'No private context, no hidden execution, no overclaiming real backend automation.' },
    { owner: 'Source Review', target: 'Notebook-style reviewer', priority: 'Normal', task: 'Attach or summarize source evidence for claims.', acceptance: 'Claims are marked as fact, source-backed claim, or assumption.' },
    { owner: 'Org Memory', target: 'Obsidian-style memory', priority: 'Normal', task: 'Convert the meeting result into reusable SOP and decision record.', acceptance: 'Decision, dissent, approval, and task owners are archived.' },
    { owner: 'Growth', target: 'Gemini / media helper', priority: 'Normal', task: s.okx ? `Publish the X/Twitter post: “${xPost}”` : 'Record a 60-90 second demo and prepare launch copy.', acceptance: 'Post or video shows prompt → debate → chair decision → approval → tasks.' },
  ];
  return { round1, debate, decision, tasks, scenario, xPost, brief: s.brief };
}

function App() {
  const [topic, setTopic] = useState(defaultPrompt);
  const [session, setSession] = useState(() => generateCouncil(defaultPrompt));
  const [rounds, setRounds] = useState(() => buildInitialRounds(generateCouncil(defaultPrompt)));
  const [chairmanNote, setChairmanNote] = useState('');
  const [stage, setStage] = useState('ready');
  const [approved, setApproved] = useState(false);
  const [execStep, setExecStep] = useState(0);
  const timers = useRef([]);

  const costNote = useMemo(() => ({ price: '2 USDT', mode: 'Pay per council session', boundary: 'Users pay for the outcome; provider controls model cost under the hood.' }), []);

  function clearTimers() {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
  }

  function runCouncil() {
    setStage('running');
    setApproved(false);
    setExecStep(0);
    setRounds([]);
    clearTimers();
    window.setTimeout(() => {
      const nextSession = generateCouncil(topic);
      setSession(nextSession);
      setRounds(buildInitialRounds(nextSession));
      setChairmanNote('');
      setStage('done');
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  }

  // Approval gate: tasks only advance through the execution lifecycle AFTER the
  // chairman applies the approval seal. Before approval, dispatch stays blocked.
  function approve() {
    setApproved(true);
    clearTimers();
    setExecStep(1);
    for (let i = 2; i < EXEC_STAGES.length; i += 1) {
      const step = i;
      timers.current.push(window.setTimeout(() => setExecStep(step), (i - 1) * 900));
    }
  }

  function addRound() {
    if (approved) return;
    const nextN = rounds.length + 1;
    setRounds(prev => [...prev, {
      n: nextN,
      title: `Round ${nextN} · chairman follow-up and revised positions`,
      note: chairmanNote.trim()
        ? 'The chairman has spoken. Each agent must directly respond, agree/disagree, and update its position.'
        : 'Open another round. Each agent must challenge assumptions and sharpen its position.',
      chairmanNote: chairmanNote.trim(),
      entries: generateAdditionalRound(topic, nextN, chairmanNote),
    }]);
    setChairmanNote('');
    window.setTimeout(() => document.getElementById(`round-${nextN}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  useEffect(() => clearTimers, []);

  const execStage = EXEC_STAGES[Math.min(execStep, EXEC_STAGES.length - 1)];

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
        <button onClick={runCouncil} disabled={stage === 'running'}>{stage === 'running' ? 'Council is thinking…' : 'Run strategy council'}</button>
        <span>{costNote.mode}: suggested demo price {costNote.price}. {costNote.boundary}</span>
      </div>
    </section>

    {stage === 'running' && <section className="panel runningPanel" id="results">
      <div className="panelHead">
        <h2>Independent perspectives are being generated…</h2>
        <p>The council is reading your prompt and preparing role-based output. This public MVP uses a safe browser-side simulation, so no private model key or company data is exposed.</p>
      </div>
      <div className="loadingSteps">
        <span>🧭 Strategy Agent analyzing priority</span>
        <span>🛠️ Product Agent shaping demo output</span>
        <span>🛡️ Risk Agent checking public claims</span>
        <span>👨‍💼 Chair Agent preparing decision</span>
      </div>
    </section>}

    <section className="panel chairmanPanel" id="results">
      <div className="panelHead">
        <h2>Chairman intervention / open another round</h2>
        <p>This mirrors the internal workbench: the chairman can speak after any round, then open the next round for every agent to respond.</p>
      </div>
      <textarea
        className="chairmanInput"
        value={chairmanNote}
        onChange={e => setChairmanNote(e.target.value)}
        disabled={approved}
        placeholder="Chairman's comment, question, or correction for the next round…"
      />
      <div className="actions">
        <button onClick={addRound} disabled={approved}>🔁 Add chairman comment & open next round</button>
        <span>{approved ? 'The meeting is approved, so new discussion rounds are locked.' : `${rounds.length} rounds currently in the meeting record.`}</span>
      </div>
    </section>

    {rounds.map(round => <section className="panel" id={`round-${round.n}`} key={round.n}>
      <div className="panelHead">
        <h2>{round.title}</h2>
        <p>{round.note}</p>
      </div>
      {round.chairmanNote && <div className="chairmanNote"><b>👑 Chairman says:</b><span>{round.chairmanNote}</span></div>}
      <div className={round.n === 1 ? 'cards cardsWide' : 'debateList'}>
        {council.map(a => round.n === 1
          ? <article className="card" key={a.id}>
              <header><span>{a.icon}</span><div><h3>{a.name}</h3><small>{a.title}</small></div></header>
              <p className="frame">{a.frame}</p>
              <p>{round.entries[a.id]}</p>
            </article>
          : <div className="debate" key={a.id}><b>{a.icon} {a.name}</b><p>{round.entries[a.id]}</p></div>)}
      </div>
    </section>)}

    <section className="panel decision">
      <div className="panelHead">
        <h2>Chair decision</h2>
        <p>One synthesized decision, not disconnected answers.</p>
      </div>
      <blockquote>{session.decision}</blockquote>
      <div className="actions approvalActions">
        <button className="approveBtn" onClick={approve} disabled={approved}>👑 Board approval: APPROVE & DISPATCH</button>
        {approved && <span className="seal">Chairman seal · APPROVED</span>}
        {!approved && <span>Execution stays blocked until the chairman applies the seal.</span>}
      </div>
    </section>

    <section className="panel">
      <div className="panelHead">
        <h2>Executable task list {approved ? '· dispatched' : '· awaiting approval'}</h2>
        <p>{approved
          ? `Approval-gated dispatch is live. Execution status below is a simulated demo lifecycle (no real bridge) — current stage: ${execStage.label} (${execStage.progress}%).`
          : 'Dispatch is locked until the chairman applies the approval seal above. No task leaves the boardroom without board approval.'}</p>
      </div>
      <div className={approved ? 'table' : 'table locked'}>
        {session.tasks.map((t, i) => <div className="row" key={i}>
          <span className="num">{String(i + 1).padStart(2, '0')}</span>
          <span className="owner">{t.owner}</span>
          <span className="priority">{t.priority}</span>
          <span className={approved ? 'target' : 'target locked'}>{approved ? `→ ${t.target}` : `🔒 awaiting approval · ${t.target}`}</span>
          <span className="task">
            <b>{t.task}</b>
            <em>{t.acceptance}</em>
            <span className={approved ? 'execStatus live' : 'execStatus'}>
              {approved ? <>
                <span className="execBar"><span style={{ width: `${execStage.progress}%` }} /></span>
                <span className="execLabel">{execStage.label} · {execStage.progress}%</span>
              </> : <span className="execLabel">🔒 Blocked — pending board approval</span>}
            </span>
          </span>
        </div>)}
      </div>
    </section>

    <section className="panel">
      <div className="panelHead">
        <h2>Meeting record · organizational memory</h2>
        <p>Every session is archived as a reusable decision record — the Obsidian-style memory the council reads back next time.</p>
      </div>
      <div className="record">
        <div><b>Question</b><span>{topic.slice(0, 160)}{topic.length > 160 ? '…' : ''}</span></div>
        <div><b>Rounds</b><span>{rounds.map(r => `Round ${r.n}`).join(' · ')} · chairman can reopen discussion before approval</span></div>
        <div><b>Chair decision</b><span>{session.decision.slice(0, 150)}…</span></div>
        <div><b>Approval</b><span>{approved ? 'Chairman seal applied · execution dispatched' : 'Not yet approved · execution blocked'}</span></div>
        <div><b>Dispatched tasks</b><span>{session.tasks.length} tasks with owners and acceptance criteria</span></div>
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
