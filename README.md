# Agent Strategy Council

Agent Strategy Council is a public, sanitized multi-agent boardroom demo for the OKX.AI Genesis Hackathon.

It demonstrates an AI organization layer: a business question enters a structured council room, multiple AI roles debate from different perspectives, a human chairman can challenge assumptions, and execution tasks are unlocked only after approval.

## One-line summary

Agent Strategy Council turns scattered AI tools into a coordinated digital workforce through multi-agent debate, human approval, task dispatch, and organizational memory.

## Why this matters

Most companies are adopting AI tools one chat at a time. A business owner may use ChatGPT, Claude, Gemini, coding agents, research agents, documents, and task systems, but the work remains fragmented:

- no clear AI role division;
- no shared decision protocol;
- no human approval gate;
- no execution accountability;
- no reusable organizational memory.

The next bottleneck in enterprise AI is not only model capability. It is coordination, governance, and memory.

## What the demo shows

1. A board-level business question is submitted.
2. Role-based AI agents provide independent perspectives.
3. The chairman can add a follow-up comment and open another round.
4. Agents respond to the challenge and refine their positions.
5. A chair decision is produced.
6. The chairman approves the decision.
7. Execution tasks are unlocked and routed to an execution corps.
8. The meeting becomes an organizational memory record.

## Council roles

- Strategy Agent — direction, positioning, trade-offs.
- Product Agent — product clarity and user workflow.
- Finance Agent — ROI, cost, and commercial viability.
- Risk Agent — compliance, failure modes, and guardrails.
- Source Review Agent — assumptions and evidence quality.
- Organizational Memory Agent — prior decisions and reusable knowledge.
- Chairman — human-in-the-loop challenge and approval.
- Execution Corps — simulated task dispatch after approval.

## Current public demo

Primary domain:

http://agentstrategycouncil.com/

Preferred final domain after SSL issuance:

https://agentstrategycouncil.com/

Backup CloudBase demo:

https://lenow-stage1-d3g5uekbqca59505b-1435078503.tcloudbaseapp.com/agent-strategy-council-asp/

## Technical architecture

```text
Browser-only public demo
  ├─ React + Vite static frontend
  ├─ Role-based council simulation
  ├─ Chairman follow-up rounds
  ├─ Approval-gated task dispatch simulation
  ├─ Meeting record / organizational memory view
  └─ No backend, no secrets, no private automation
```

The production concept can later connect to real model APIs, agent runners, knowledge bases, and enterprise workflow systems. The hackathon MVP is intentionally isolated for safety and public review.

## Safety boundary

This repository intentionally contains no private company context, no local bridge paths, no internal agent names, and no API keys.

The MVP does not connect to:

- private company data;
- local file bridges;
- private networks;
- internal automation;
- production databases;
- API keys in the browser;
- unmanaged autonomous execution.

Autonomous execution remains approval-gated by design.

## Business potential

Agent Strategy Council can evolve into an enterprise AI operating layer for founders, operators, and teams that need to coordinate multiple AI workers safely:

- strategy meetings;
- project decomposition;
- execution handoff;
- risk review;
- source review;
- decision records;
- reusable SOP generation;
- organizational memory.

## Roadmap

1. Public static demo.
2. International hosting and display domain.
3. UI polish for final hackathon recording.
4. Source Review card: fact / source-backed / assumption.
5. Danger-action gate for high-risk operations.
6. Real model-backed council sessions.
7. BYOK or pay-per-session model.
8. Team workspace and organizational memory.
9. Enterprise audit trail and execution analytics.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
