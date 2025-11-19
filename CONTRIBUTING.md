# Contributing to Blockradar TypeScript SDK

Thank you for your interest in contributing! This project aims to provide a clean, strongly-typed SDK for the Blockradar REST API.

## Prerequisites
- Node.js 18+
- npm 9+
- A Blockradar test API key (optional for integration testing)

## Setup
- Fork and clone the repository
- Install dependencies: `npm i`
- Build: `npm run build`
- Run unit tests: `npm test`

Optional integration tests:
- Set env vars: `BLOCKRADAR_API_KEY_TEST`, `BLOCKRADAR_WALLET_ID`, and (optionally) `BLOCKRADAR_BASE_URL_TEST`

## Project Structure
- `src/client/` core SDK client (`BlockradarClient`, `HttpClient`, auth, config)
- `src/resources/` resource modules grouped by domain (wallets, addresses, withdrawals, swaps, virtual-accounts, contracts)
- `src/types/` shared DTOs and envelopes
- `src/utils/` headers and serialization helpers
- `tests/` Vitest unit tests mirroring resources
- `examples/` usage examples

## Contribution Guidelines
- Keep the core dependency footprint minimal; use native `fetch`
- Follow TypeScript strict typing (no `any`); prefer precise DTOs
- Add JSDoc to new public methods (params and returns)
- Mirror REST endpoints in resource classes; centralize paths, avoid hardcoded strings scattered across code
- Use `x-api-key` auth via headers; do not hardcode secrets
- Add tests for new functionality (happy path and basic error handling)
- Update README with endpoint mappings and usage examples when adding new modules

## Adding a New Endpoint
1. Create or extend DTOs in `src/types/<domain>.ts`
2. Add methods in the corresponding resource class under `src/resources/<domain>/`
3. Add unit tests in `tests/` reflecting the new methods
4. Update `README.md` with endpoint summary and one short usage snippet
5. Optionally add an example in `examples/`

## Branching & Commits
- Do not push directly to `main`
- Use feature branches: `feat/<short-feature-name>`, `fix/<short>`, etc.
- Push to `develop` (or a feature branch) and open PRs into `main`
- Require at least 1 review approval and all tests passing
- Prefer squash-and-merge with Conventional Commit PR titles:
  - `feat(module): add X`
  - `fix(module): correct Y`
  - `docs: update README`
  - `chore: tooling or housekeeping`

## Testing
- Unit tests: `npm test`
- Ensure tests pass before submitting a PR
- Integration tests can be added as `describe.skipIf(!apiKey)` blocks gated by env vars

## Security
- Never commit API keys, secrets, or `.env` files
- `.gitignore` excludes `.env`, `node_modules`, `dist`, `.trae/`

## Pull Request Checklist
- [ ] Strictly typed inputs/outputs for new functions
- [ ] JSDoc comments for new public APIs
- [ ] Unit tests for new functionality
- [ ] README updated (endpoints and examples if applicable)
- [ ] No secrets or private data committed

## Questions
Open an issue or start a discussion on GitHub if you need help clarifying endpoint behavior or typing.