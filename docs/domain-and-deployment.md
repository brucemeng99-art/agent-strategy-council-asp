# Domain and International Deployment Plan

## Selected display domain

agentstrategycouncil.com

## Availability check

WHOIS result on 2026-07-11: No match for domain "AGENTSTRATEGYCOUNCIL.COM".

Interpretation: the domain appears available for registration at the time of check.

## Current blocker

The domain is not purchased yet. Hermes cannot complete payment or registrar ownership without access to a registrar account and explicit payment flow.

## Recommended purchase path

Use one of:

1. Cloudflare Registrar
2. Namecheap
3. Alibaba Cloud / Tencent Cloud domain service
4. GoDaddy

Recommended: Cloudflare Registrar if available, because DNS and future Pages deployment are easier.

## DNS plan after purchase

Option A — CloudBase custom domain:

- Bind custom domain in CloudBase console.
- Add required CNAME at registrar DNS.
- Configure HTTPS certificate.

Option B — Vercel / Cloudflare Pages international mirror:

- Deploy the static site to Vercel or Cloudflare Pages.
- Add domain agentstrategycouncil.com.
- Add DNS records provided by the platform.

## Current international hosting status

- CloudBase deployment is live.
- Vercel CLI is available through npx but not logged in.
- Netlify CLI is available through npx but not logged in.
- Wrangler / Cloudflare CLI is not installed.

## Next action

1. Purchase agentstrategycouncil.com.
2. Login to Vercel or Cloudflare Pages.
3. Deploy static site as international mirror.
4. Bind agentstrategycouncil.com to the mirror.
5. Keep CloudBase URL as China/internal fallback.
