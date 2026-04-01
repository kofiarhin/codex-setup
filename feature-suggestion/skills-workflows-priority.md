# Suggested New Skills & Workflows (High → Low Value)

This list is prioritized for **this repository’s current shape** (skill-oriented Codex setup) and your standards in `AGENT.md` (MERN conventions, strict architecture, output discipline).

## 1) `repo-bootstrap-mern`
**Why high value:** You repeatedly enforce a specific MERN baseline structure and conventions. Automating this yields immediate consistency and faster project starts.

**Primary workflow**
1. Validate target path and existing files.
2. Generate root/client/server scaffold exactly matching your preferred layout.
3. Create baseline `package.json` scripts (`concurrently`, client, server).
4. Add starter config files (`.gitignore`, `.env.example`, README skeleton).
5. Run smoke checks (install/lint/test placeholders).

**Suggested resources**
- `assets/templates/mern-base/`
- `scripts/scaffold_mern.sh`
- `references/standards-map.md`

---

## 2) `architecture-auditor`
**Why high value:** Ensures every repo change stays compliant with your architecture rules before code drift accumulates.

**Primary workflow**
1. Scan repo for structure violations (wrong folders, missing layers).
2. Detect prohibited patterns (hardcoded API URLs, missing middleware conventions).
3. Produce categorized findings (blocker/warn/info).
4. Offer autofix patch where safe.
5. Re-run checks and output final compliance score.

**Suggested resources**
- `scripts/audit_architecture.py`
- `references/ruleset.yaml`

---

## 3) `api-contract-enforcer`
**Why high value:** Standard response envelopes and validation are critical; this prevents inconsistent APIs that break frontend assumptions.

**Primary workflow**
1. Detect Express routes/controllers.
2. Verify success/error response schema usage.
3. Verify validation middleware presence for mutating endpoints.
4. Flag async error handling issues.
5. Generate patch suggestions and endpoint contract summary.

**Suggested resources**
- `scripts/check_api_contracts.js`
- `references/response-contract.md`

---

## 4) `env-safety-guardian`
**Why high value:** Environment drift and secret leaks are common and costly; this skill creates a strong guardrail.

**Primary workflow**
1. Scan for hardcoded URLs/secrets and `.env` misuse.
2. Verify `VITE_API_URL` usage patterns in frontend.
3. Confirm `.gitignore` and env templates are complete.
4. Build remediation checklist.
5. Optionally patch obvious violations.

**Suggested resources**
- `scripts/env_guard.py`
- `references/env-policy.md`

---

## 5) `scraper-crawlee-enforcer`
**Why high value:** You have a strict “Crawlee + PlaywrightCrawler only” scraping rule; this skill can enforce and scaffold compliant scraping quickly.

**Primary workflow**
1. Detect scraping modules and dependencies.
2. Block non-compliant stack usage (e.g., axios+cheerio scraping paths).
3. Scaffold modular Crawlee runner pattern.
4. Add normalization pipeline stubs.
5. Run compliance checks and produce report.

**Suggested resources**
- `assets/templates/crawlee-runner/`
- `scripts/check_scraping_stack.js`

---

## 6) `frontend-bem-scss-reviewer`
**Why high value:** Frontend quality and naming consistency directly affect maintainability; this skill codifies your SCSS/BEM standards.

**Primary workflow**
1. Map component folders and style files.
2. Verify naming (`Header.jsx`, `header.styles.scss`) and import style.
3. Detect deep nesting / non-BEM selectors.
4. Produce fix plan with exact file edits.
5. Optionally apply safe style refactors.

**Suggested resources**
- `scripts/check_bem_scss.py`
- `references/frontend-conventions.md`

---

## 7) `route-role-gate-checker`
**Why high value:** Auth and role-based access mistakes are high-risk and often subtle.

**Primary workflow**
1. Build route map (frontend + backend).
2. Detect protected routes and required roles.
3. Compare middleware/client guards for mismatches.
4. Flag token verification gaps.
5. Output actionable security diff.

**Suggested resources**
- `scripts/trace_auth_paths.js`
- `references/auth-patterns.md`

---

## 8) `deployment-readiness-checklist`
**Why high value:** Catches late-stage release blockers for Vercel + Render/Heroku setups, reducing failed deploy cycles.

**Primary workflow**
1. Validate build/start scripts and env usage.
2. Check platform-specific assumptions (frontend/backend split).
3. Verify no environment leakage and secret placeholders.
4. Run pre-deploy smoke checks.
5. Generate deployment readiness scorecard.

**Suggested resources**
- `scripts/predeploy_check.sh`
- `references/deploy-matrix.md`

---

## 9) `technical-debt-triager`
**Why high value:** Helps prioritize debt by impact, making refactors intentional rather than reactive.

**Primary workflow**
1. Scan TODO/FIXME hotspots and code smells.
2. Correlate with churn and complexity indicators.
3. Rank debt by risk and effort.
4. Propose sprint-sized remediation slices.
5. Output backlog markdown ready for planning.

**Suggested resources**
- `scripts/debt_triage.py`
- `references/scoring-model.md`

---

## 10) `release-note-and-changelog-builder`
**Why high value:** Lower direct engineering leverage than the above, but useful for shipping clarity and stakeholder communication.

**Primary workflow**
1. Parse commits/PR metadata since last tag.
2. Group changes by feature/fix/refactor/chore.
3. Generate internal and external release notes variants.
4. Highlight breaking changes + migration notes.
5. Update changelog files with consistent format.

**Suggested resources**
- `scripts/build_release_notes.py`
- `assets/templates/changelog.md`

---

## Recommended implementation sequence (quick win path)
1. `repo-bootstrap-mern`
2. `architecture-auditor`
3. `api-contract-enforcer`
4. `env-safety-guardian`
5. `scraper-crawlee-enforcer`

This sequence gives the fastest quality and consistency gains across new and existing repos.
