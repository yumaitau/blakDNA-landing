# Security policy

Report suspected vulnerabilities privately to support@yumait.com.au. Include the affected public component, commit or release, expected and observed behaviour, and a minimal reproduction without live secrets or customer data. Ask for a secure transfer channel before sharing sensitive evidence.

Do not test customer infrastructure without authorization. This policy is not a bug-bounty offer, safe-harbour agreement, or promised response time.

This repository is a static public website. It must not contain application source history, credentials, unpublished Marketplace identifiers, private repository URLs, customer evidence, or production account configuration. Browser code and all `PUBLIC_` configuration are public information.

No third-party browser analytics, advertising pixels, account system, or local form ingestion is enabled. Keep CSP restrictive and confirm all outbound conversion links before publishing. New data collection requires an explicit privacy and consent review.

Run dependency and secret checks on each change. Untrusted fork code must not run automatically on organisation self-hosted runners. Maintainers review contributions and move reviewed changes onto a trusted branch before CI execution.
