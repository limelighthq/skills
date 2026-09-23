# Notion publishing implementation plan

**Goal:** Publish this repository's skills to Notion automatically after validation, with explicit ownership and no manual work when adding skills.

**Architecture:** A Node command discovers tracked skills, plans changes against a typed Notion Skills database, and applies them through the public API. Python's standard ZIP library packages complete skills. GitHub Actions schedules the same command and keeps credentials out of the checkout.

**Spec:** ../specs/2026-09-23-notion-publishing-design.md

## Global constraints

- Node 20 or newer; Python 3.10 or newer; existing YAML dependency only.
- Git is authoritative. Never delete remote rows, rewrite unrelated rows, or silently adopt matching names.
- Use documented public APIs. Keep runtime artifacts and secrets out of Git.
- New skills are discovered from tracked files without adding per-skill configuration.

## Work

- [x] Add catalog tests, then implement tracked-file discovery, stable hashes, and reproducible complete ZIPs under tools/notion/.
- [x] Add HTTP tests, then implement bounded requests, pagination, rate-limit handling, and redacted failures.
- [x] Add publishing tests, then implement schema checks, explicit adoption, plans, idempotent updates, drift checks, and verified completion markers.
- [x] Add the command, configuration, gated workflow, and maintainer runbook. Update shipping instructions to distinguish configured automation from live deployment.
- [x] Run validation, all Node tests, installation checks, bundled-script checks, and an offline catalog preview. Review the complete patch.
- [ ] Create a reviewable PR.
- [ ] Activate only after the Limelight connection, adoption plan, and live publish are verified.

## Review focus

Exercise changed support files, scripts with executable bits, names colliding with unmanaged rows, a failure after a remote write, and a paginated listing that fails on a later page. Ensure none can produce a false successful sync or publish another repository's content.
