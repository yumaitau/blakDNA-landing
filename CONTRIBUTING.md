# Contributing

Open an issue describing the public website change. Do not post secrets, customer telemetry, or confidential product implementation details. Security concerns belong in the private channel in SECURITY.md.

Use a focused pull request. Keep the public site separate from the application and buyer infrastructure. Do not copy private repository files or history here.

Before review, run `pnpm test`, `pnpm build`, `pnpm test:site`, `node scripts/check-build-configurations.mjs`, and the Docker-backed browser/Lighthouse journey. Visual baselines must come from the pinned Linux browser container and be inspected, not automatically accepted by CI. Capture desktop, mobile, and light-mode changes together.

Avoid unsupported security or Marketplace claims, invented metrics, customer logos, unapproved imagery, and new tracking. Preserve keyboard access, reduced motion, strict TypeScript, internal links, and colour contrast. Reference the design/content decisions under docs.

Self-hosted CI executes only trusted same-repository branches. An outside contributor's fork does not receive automatic execution on these runners. Maintainers must review an outside contribution before importing it to a trusted branch.
