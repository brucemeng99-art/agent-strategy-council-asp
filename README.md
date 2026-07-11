# Agent Strategy Council ASP

Agent Strategy Council is a public, sanitized multi-agent boardroom demo for the OKX.AI Genesis Hackathon.

It demonstrates how a business owner can turn a strategic question into an organized AI council workflow:

1. A board-level question is submitted.
2. Role-based AI agents give independent perspectives.
3. The chairman can add a follow-up comment and open another round.
4. Agents respond, challenge assumptions, and revise their positions.
5. The chair produces one decision.
6. The chairman approves the decision.
7. Execution tasks are unlocked and routed to an execution corps.
8. The meeting becomes an organizational memory record.

This repository intentionally contains no private company context, no local bridge paths, no internal agent names, and no API keys.

## One-line summary

An approval-gated AI strategy council that turns scattered AI tools into an organized digital workforce with roles, decision rounds, execution tasks, and organizational memory.

## Problem

Most businesses are adopting AI tools one chat at a time. The result is fragmented work:

- no clear AI roles;
- no decision protocol;
- no approval gate;
- no execution accountability;
- no reusable organizational memory.

A company does not only need more chatbots. It needs an operating layer for AI work.

## Solution

Agent Strategy Council models AI work as an organization:

- Board layer: a human chairman approves key decisions.
- Council layer: role agents debate and synthesize strategy.
- Source and memory layer: assumptions, sources, and prior decisions are preserved.
- Execution layer: Codex, Claude Code, Gemini, Kimi, local workers, and tool agents receive approved tasks.

The demo is static and sanitized. It does not connect to private automation or real agent bridges.

## Demo flow

1. Open the demo page.
2. Start with the default business question or paste a new one.
3. Review Round 1 independent perspectives.
4. Add a chairman follow-up comment and open another round.
5. Review the new round of responses.
6. Approve and dispatch.
7. Watch the simulated execution lifecycle.
8. Review the meeting record.

## Current public demo

CloudBase demo:

https://lenow-stage1-d3g5uekbqca59505b-1435078503.tcloudbaseapp.com/agent-strategy-council-asp/

Planned display domain:

https://agentstrategycouncil.com

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

The production concept can later connect to real model APIs and agent runners, but this hackathon MVP is intentionally isolated for safety.

## Safety boundary

The hackathon MVP is a public demonstration layer. It does not connect to:

- private company data;
- local file bridges;
- private networks;
- internal automation;
- production databases;
- API keys in the browser;
- unmanaged autonomous execution.

Autonomous execution remains approval-gated by design.

## Business potential

The product can serve founders, operators, and teams who need to coordinate multiple AI workers safely:

- strategy meetings;
- project decomposition;
- execution handoff;
- risk review;
- source review;
- decision records;
- reusable SOP generation.

## Roadmap

1. Public static demo.
2. International hosting and display domain.
3. Source Review card: fact / source-backed / assumption.
4. Danger-action gate for high-risk operations.
5. Real model-backed council sessions.
6. BYOK or pay-per-session model.
7. Team workspace and organizational memory.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
