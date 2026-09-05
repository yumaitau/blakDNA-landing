export interface EditorialPage {
  slug: string;
  title: string;
  description: string;
  lead: string;
  sections: { title: string; paragraphs: string[] }[];
  related: string[];
}

export const pages: EditorialPage[] = [
  {
    slug: "product", title: "An organism, not another queue.",
    description: "Meet blakDNA: a persistent cyber-resilience organism that connects security change, attack paths, evidence, memory, and human response.",
    lead: "Security signals only matter when you understand what they mean for this organisation.",
    sections: [
      { title: "The organisation is the context.", paragraphs: ["An identity, repository, cloud workload, and database are not separate security stories. Their permissions and trust relationships determine what an attacker could reach. blakDNA keeps that connected context in an evolving Security Genome.", "The genome includes assets, controls, dependencies, exposure, previous incidents, accepted risks, and the reasons behind human decisions. Its temporal model preserves how those relationships changed, rather than overwriting yesterday's understanding."] },
      { title: "Change is not automatically a threat.", paragraphs: ["Deployments, new applications, and changed permissions are part of a living organisation. blakDNA evaluates a mutation against prior state, organisational patterns, deterministic security knowledge, business context, and reachable attack paths.", "Most observations should be absorbed or remembered. Material changes become investigations and evidence-backed calls to action. The goal is less noise without learning to ignore insecurity."] },
      { title: "The response is part of the product.", paragraphs: ["A recommendation has an outcome. Human rationale becomes immune memory; an independent environmental observation confirms whether the risk actually changed. A person reporting a fix is not the same as a verified fix.", "The current vertical slice demonstrates this lifecycle with a synthetic GitHub Actions and AWS IAM organisation. Integration coverage and customer deployment readiness should be checked with the team; this site does not imply a universal sensor catalogue or a live Marketplace listing."] },
    ], related: ["how-it-works", "security-genome", "adaptive-cyber-immunity"],
  },
  {
    slug: "how-it-works", title: "Follow one dangerous mutation.",
    description: "Follow the blakDNA synthetic AWS and GitHub journey from permission change to investigation, attack path, human response, verified remediation, and learning.",
    lead: "A deployment role gains one permission. The important question is what that permission makes reachable.",
    sections: [
      { title: "Observe the difference.", paragraphs: ["In the synthetic demonstration, a GitHub Actions role starts with deployment permissions. A later normalized IAM observation includes iam:CreatePolicyVersion. blakDNA compares the old and new state, preserves evidence, and records a mutation.", "Deterministic analysis connects repository trust, the deployment role, policy modification, and the production account. Hermes receives the scoped context and relevant memory for a hypothesis-driven investigation, including an attempt to disprove the conclusion."] },
      { title: "Explain the reachable path.", paragraphs: ["The demonstrated path runs from a compromised repository through Actions and the AWS deployment role to IAM policy modification and production privilege escalation. The conclusion depends on actual policy scope and effective controls; the permission name alone is not universal proof of exploitability.", "A canonical event explains the mutation, path, observed risk change, confidence, evidence, owner, and recommendation. Slack, Teams, email, webhook, API, inbox, and CLI preserve the same meaning. Safe retries and delivery receipts do not create new findings."] },
      { title: "Verify, then learn.", paragraphs: ["A human records why the permission should be removed. The risk stays active until a subsequent authoritative observation removes the permission and attack-path recalculation confirms the path is gone. The verified outcome and human explanation become immune memory.", "A learned CI/CD antibody can match later changes in shadow mode. Owner approval reruns supported positive and negative historical cases before activating compiled detection. A future recurrence is recognised without granting permission to modify production controls."] },
    ], related: ["attack-path-analysis", "evidence-backed-risk", "adaptive-cyber-immunity"],
  },
  {
    slug: "architecture", title: "Hermes thinks. blakDNA remembers.",
    description: "A customer-hosted architecture combining deterministic collection, a temporal Security Genome, PostgreSQL, Hermes reasoning, scoped MCP tools, and evidence-backed response.",
    lead: "Engineering establishes the facts. Reasoning connects their significance. Persistent memory carries the lesson forward.",
    sections: [
      { title: "Deterministic foundations.", paragraphs: ["Pluggable sensors normalize source data into observations with entity references, facts, evidence, timestamps, provenance, and confidence. Large raw telemetry feeds are not repeatedly sent to a language model for basic parsing.", "PostgreSQL is the authoritative store for temporal entities, relationships, observations, mutations, evidence, living risks, attack paths, and immune memory. A modular application and worker keep this state together without requiring an unnecessary collection of microservices."] },
      { title: "A nervous system, not a second orchestrator.", paragraphs: ["Hermes provides reasoning, agent sessions, delegation, model routing, tool execution, and scheduled or event-driven review. blakDNA supplies cyber-specific state and a scoped MCP surface for retrieving evidence, comparing genome states, searching memory, and investigating attack paths.", "Specialist responsibilities include Sentinel, Cartographer, Risk Analyst, Hunter, Attack Path Analyst, Challenger, and Reporter. Hermes selects the relevant participants; every observation does not trigger every agent. Brolga can provide compact, relevant threat context rather than an unfiltered threat feed."] },
      { title: "Persistence without hidden reasoning.", paragraphs: ["Audits retain session identity, model and prompt version, observations used, retrieved memory, tools, evidence, accepted claims, concise reasoning summaries, human decisions, and outcomes. Hidden chain-of-thought is not an audit artifact.", "The customer-hosted model does not require a publisher-hosted control plane. Configure model destinations, outbound integrations, storage, retention, and access boundaries for the buyer's environment before connecting real organisational data."] },
    ], related: ["deployment", "security", "security-genome"],
  },
  {
    slug: "security", title: "Trust has to be inspectable.",
    description: "blakDNA safety boundaries: evidence provenance, tenant isolation, human approval, normal-versus-secure separation, read-only investigation, and verified remediation.",
    lead: "An important conclusion needs evidence. A consequential action needs authority.",
    sections: [
      { title: "Evidence before organisational truth.", paragraphs: ["Claims reference tenant-scoped evidence such as API results, configuration, repository state, identity relationships, threat intelligence, or human confirmation. Confidence and concise reasoning accompany the claim; uncertainty remains visible.", "Human context changes how an observation is understood, not whether an innate weakness exists. An intentionally public HTTPS service still needs appropriate origin protection, authentication, TLS, and operating controls."] },
      { title: "Investigation is not remediation authority.", paragraphs: ["Approved read-only investigation may query, correlate, form hypotheses, retrieve memory, and recommend action. By default it cannot change IAM, disable accounts, rotate credentials, alter firewalls, isolate endpoints, delete evidence, or deploy production code.", "Security-sensitive improvements require evaluation and explicit approval where required. Supported adaptive detection is replayed before owner approval. Unapproved matches remain shadow evaluation; free-form model text is not executed as production security logic."] },
      { title: "Practical deployment boundaries.", paragraphs: ["Human membership and role are resolved when a request is authorized. Service credentials are scoped by tenant, purpose, and expiry. Sensitive integration configuration is encrypted; notification delivery constrains destinations and preserves uncertainty when a provider's response is ambiguous.", "No certification, independent audit, or guaranteed prevention rate is claimed here. Request deployment evidence and a review of your requirements before adoption. Report suspected vulnerabilities privately using the responsible-disclosure instructions below, without posting credentials or customer evidence in public issues."] },
    ], related: ["responsible-disclosure", "architecture", "evidence-backed-risk"],
  },
  {
    slug: "aws-marketplace", title: "Your AWS environment. Your cyber DNA.",
    description: "Understand the planned blakDNA AWS Marketplace customer-hosted container model, licensing boundaries, buyer responsibilities, and deployment readiness.",
    lead: "The customer-hosted container model keeps organisational state in the buyer's environment.",
    sections: [
      { title: "A contract container model.", paragraphs: ["The architecture is designed for AWS Marketplace contract distribution. Licensing identity is baked into the published container; buyers do not select a runtime flag to disable it. Licensing is checked before readiness and monitored while the service runs.", "This page is not a subscription offer. No live Marketplace product identifier, approved listing, price, or universal deployment availability is asserted. Ask the team for current availability, an approved offer, and the supported image digest before purchasing or deploying."] },
      { title: "Know what you are deploying.", paragraphs: ["The buyer package targets private application and worker tasks, authoritative PostgreSQL, encrypted secrets and evidence storage, logging, and controlled ingress. Terraform, CloudFormation, and EKS/Helm paths have different prerequisites and responsibility boundaries.", "A successful launch needs more than a green health page: prove licensing, database connectivity, durable observation write/read, restart persistence, and the supported synthetic organism journey. Keep deployment and teardown scoped to the approved AWS account and region."] },
      { title: "Prepare for an evidence-led evaluation.", paragraphs: ["Bring your intended AWS region, network topology, identity provider, data-handling requirements, model destination, and initial AWS/GitHub scope. The team can identify which capabilities are ready for evaluation and which require additional integration work.", "Do not paste cloud credentials, Marketplace entitlements, or customer telemetry into a public repository. The public deployment surface is separate from private application source and does not expose customer-specific configuration."] },
    ], related: ["deployment", "architecture", "contact"],
  },
  {
    slug: "deployment", title: "A deliberate path into your environment.",
    description: "Plan blakDNA customer-hosted deployment: approved account and image, scoped sensors, Hermes configuration, verified persistence, upgrades, and guarded teardown.",
    lead: "Start with a bounded evaluation. Prove the complete organism before expanding its senses.",
    sections: [
      { title: "Prepare the trust boundary.", paragraphs: ["Choose an approved AWS account and region, a supported immutable image, private networking, HTTPS ingress, PostgreSQL, encrypted storage, and secret-management controls. The buyer owns the account, data, identity policies, retention, and operating access.", "Configure Hermes and any model destination deliberately. Start with least-privilege AWS and GitHub sensors and a synthetic organisation. Broader Microsoft, engineering, and threat-intelligence coverage should follow an explicit integration-readiness review."] },
      { title: "Prove a journey, not a process.", paragraphs: ["Run migrations and licensing preflight before admitting traffic. Observe a known change, retrieve its evidence through an authorized interface, restart the service, and verify that the same genome state survives.", "Then follow an IAM mutation through investigation, notification, human response, independent remediation verification, and immune memory. Verify backups and restore, inspect logs for secrets, and record the exact image digest and deployment evidence."] },
      { title: "Public instructions, explicit readiness.", paragraphs: ["The public deployment repository is the handoff for buyer-facing templates and runbooks. Its README and release status determine what is available; a repository existing does not mean a Marketplace offer or an AWS apply has been verified.", "Upgrade tests must preserve PostgreSQL state. Destructive teardown must require explicit confirmation and verify only stack-owned resources were removed. Never run a template against an unapproved account merely because a local plan succeeded."] },
    ], related: ["aws-marketplace", "security", "contact"],
  },
  {
    slug: "cyber-resilience-organism", title: "Security understanding that persists.",
    description: "What is a cyber-resilience organism? Learn how continuous sensing, organisational context, memory, human feedback, and outcome verification differ from a dashboard.",
    lead: "A finding is a moment. Resilience depends on what happens before it and what the organisation learns afterward.",
    sections: [
      { title: "Continuity changes the question.", paragraphs: ["A cyber-resilience organism maintains understanding across events. Instead of asking only whether a configuration is bad, it asks what changed, what became reachable, whether the pattern has appeared before, and what evidence would disprove the concern.", "This does not replace logs, scanners, security engineering, or the people accountable for risk. It connects their outputs to a temporal organisation model and carries decisions and verified outcomes into the next investigation."] },
      { title: "Resilience is broader than weakness.", paragraphs: ["Resistance, detection, containment, recovery, and adaptation are distinct capabilities. Identity, endpoints, cloud, data, supply chain, detection, recovery, and third-party dependencies require different evidence.", "A missing data source is an evidence gap, not a healthy score. An accepted risk is still risk. A resilience trend should be shown only when the underlying observations support that comparison."] },
    ], related: ["product", "how-it-works", "evidence-backed-risk"],
  },
  {
    slug: "security-genome", title: "The connected shape of your security.",
    description: "The Security Genome is blakDNA's evolving, temporal understanding of assets, identities, privileges, dependencies, controls, evidence, and security decisions.",
    lead: "Your Security Genome describes what exists, how it connects, and how that understanding changes over time.",
    sections: [
      { title: "Relationships carry the risk.", paragraphs: ["A repository deploys a workload. A workload assumes an identity. That identity reads a secret protecting a critical data asset. These relationships can turn an isolated weakness into a reachable path to business impact.", "The genome models entities and relationships together with evidence and temporal validity. It can compare states rather than presenting an inventory that silently overwrites historical context."] },
      { title: "Remember the human context.", paragraphs: ["Ownership, business importance, exceptions, compensating controls, and past security decisions belong alongside technical facts. An explanation that a service is intentionally public is useful context; it does not prove its origin is protected.", "Separating normality from security prevents a learned baseline from erasing innate security knowledge. Repeated administrator access without MFA can be both normal for an organisation and unsafe."] },
    ], related: ["architecture", "attack-path-analysis", "adaptive-cyber-immunity"],
  },
  {
    slug: "attack-path-analysis", title: "What can an attacker reach now?",
    description: "Attack-path analysis connects exposure, permissions, trust, dependencies, and critical assets to explain the security impact of organisational change.",
    lead: "The significance of a permission is not its name. It is the route that permission may open.",
    sections: [
      { title: "From configuration to reachability.", paragraphs: ["Attack paths are first-class objects with evidence, confidence, first observation, and temporal state. A changed trust relationship or permission can open a path that was not present in the previous genome state.", "In the synthetic AWS/GitHub slice, deployment trust and IAM policy scope connect a repository to a potential production privilege-escalation route. Effective denies and other controls matter; the investigator should attempt to disprove reachability before treating a hypothesis as confirmed."] },
      { title: "Recalculate after the response.", paragraphs: ["A ticket marked complete is not proof that a route disappeared. Authoritative sensor data must show the relevant change, and attack-path analysis must confirm that the path is no longer active.", "The historical path remains useful evidence. If the same trust or permission pattern returns, immune memory can connect it to the earlier response and the organisation's recurring weakness."] },
    ], related: ["how-it-works", "security-genome", "evidence-backed-risk"],
  },
  {
    slug: "adaptive-cyber-immunity", title: "Keep the lesson. Not just the alert.",
    description: "Adaptive cyber immunity combines organisation-specific memory, human rationale, verified outcomes, and replay-gated antibodies without normalising insecurity.",
    lead: "Every meaningful response should improve what the organisation knows about itself.",
    sections: [
      { title: "Innate and adaptive stay separate.", paragraphs: ["Innate knowledge covers security principles, known weaknesses, excessive privilege, weak authentication, and dangerous exposure. Adaptive knowledge describes this organisation: deployment patterns, critical services, trusted workflows, and the context behind previous decisions.", "Learning that behaviour is common does not make it secure. A business exception can change prioritisation and ownership while the underlying weakness and compensating-control requirements remain visible."] },
      { title: "Antibodies must earn their place.", paragraphs: ["An antibody represents a learned detection or defensive understanding tied to prior evidence and memory. Supported CI/CD matches can first run in shadow mode without changing production policy.", "Before owner-approved activation, historical positive and negative cases are rerun and recorded. Matching a later mutation is observable in the audit trail. This is a bounded learning mechanism, not permission for an LLM to rewrite controls or a claim of general autonomous improvement."] },
    ], related: ["security", "how-it-works", "cyber-resilience-organism"],
  },
  {
    slug: "evidence-backed-risk", title: "Risk needs a reason. And a history.",
    description: "Evidence-backed living risk combines exposure, exploitability, impact, controls, velocity, attack paths, confidence, and independently verified outcomes.",
    lead: "A severity label cannot tell you why a weakness became more urgent today.",
    sections: [
      { title: "Risk changes with the environment.", paragraphs: ["Internet exposure, exploit availability, privilege expansion, business importance, control degradation, and new attack paths can change the urgency of an existing weakness. Deterministic risk calculations should make these contributing changes inspectable.", "Hermes adds context and a concise explanation. Evidence IDs, confidence, previous assessments, and the conditions that could disprove the conclusion keep that explanation accountable. Unknown prior state stays unknown rather than becoming a fabricated improvement or decline."] },
      { title: "Closure is an observed outcome.", paragraphs: ["A recommendation carries an owner and an expected response. A human can confirm an issue, explain expected behaviour, accept risk, plan remediation, or identify an incorrect assumption. The reason is retained as a learning signal.", "Mitigation still depends on independent environmental evidence. Daily Genome Reports preserve what was known when generated; a fresh Pulse shows later change. Neither should manufacture resilience percentages or treat absent telemetry as proof of safety."] },
    ], related: ["attack-path-analysis", "security", "product"],
  },
  {
    slug: "contact", title: "Start with your environment.",
    description: "Contact Yuma IT about blakDNA, a bounded evaluation, current AWS Marketplace readiness, deployment requirements, and cyber-resilience integration scope.",
    lead: "Tell us what you run, what matters most, and what you need to prove.",
    sections: [
      { title: "A useful first conversation.", paragraphs: ["Bring the cloud and identity platforms you use, your initial AWS/GitHub scope, the systems you consider critical, and your data-handling constraints. We can discuss the current vertical slice and identify what a bounded evaluation should demonstrate.", "Ask for current integration readiness, supported deployment paths, Marketplace availability, and evidence from testing. We do not ask you to send credentials, customer logs, sensitive architecture, or incident evidence through the public contact form."] },
      { title: "Contact and support.", paragraphs: ["blakDNA is a Yuma IT Pty Ltd project. The primary enquiry button opens the company's existing contact channel; this static site does not collect a second copy of your enquiry.", "For support or private security disclosure, use the addresses listed below. No response-time SLA, commercial price, or subscription offer is established by this website."] },
    ], related: ["deployment", "security", "responsible-disclosure"],
  },
  {
    slug: "privacy", title: "Privacy on this website.",
    description: "Privacy information for the static blakDNA marketing site: hosting requests, external contact links, no advertising trackers, and Yuma IT privacy contacts.",
    lead: "This public site explains the product. It is not a destination for organisational telemetry.",
    sections: [
      { title: "What this site does.", paragraphs: ["The site serves static pages through Cloudflare Pages. Hosting infrastructure necessarily handles technical request data such as IP address and browser information to deliver and protect the site. No advertising pixels or client analytics are configured here.", "The site does not collect a contact form, create an account, or ingest security telemetry. Theme preference is not stored. Following a contact link takes you to Yuma IT's separate website, where its privacy policy explains enquiry handling."] },
      { title: "Your choices and enquiries.", paragraphs: ["You can browse without opting into analytics because no analytics integration is enabled. Any future analytics change must document its provider, purpose, retention, consent behaviour, and configuration before activation.", "For privacy questions, access or correction requests, or concerns about handling of your information, contact support@yumait.com.au. Refer to Yuma IT's published privacy policy for the company's privacy practices and complaint process."] },
    ], related: ["contact", "terms", "security"],
  },
  {
    slug: "terms", title: "Website terms.",
    description: "Terms for using the blakDNA public information website, with clear separation from commercial offers, deployment instructions, and product guarantees.",
    lead: "Information here supports an evaluation. It is not a contract to supply a security outcome.",
    sections: [
      { title: "Scope of this information.", paragraphs: ["This website is published by Yuma IT Pty Ltd, ABN 62 684 389 839. Product descriptions explain the intended model and the demonstrated vertical slice. Confirm current availability, suitability, pricing, supported integrations, and deployment requirements with the team.", "Commercial supply, licensing, support commitments, and any Marketplace subscription are governed by the applicable agreed terms, not by illustrations or examples on this site. No guarantee that attacks will be prevented or all weaknesses detected is made here."] },
      { title: "Responsible use.", paragraphs: ["Do not submit credentials, personal customer records, or confidential security evidence through public issues or marketing enquiries. Use deployment materials only in an environment you are authorized to operate and follow the safeguards in the relevant release.", "The public website implementation has its own repository license. Brand names and artwork do not imply endorsement rights. External sites and repositories have their own terms and privacy practices. Contact the team if information is unclear or appears inaccurate."] },
    ], related: ["privacy", "contact", "responsible-disclosure"],
  },
  {
    slug: "responsible-disclosure", title: "Report a security concern privately.",
    description: "Responsible disclosure for blakDNA: contact Yuma IT privately, share a minimal reproduction, protect customer evidence, and avoid unauthorized testing.",
    lead: "Help us investigate without exposing the people and systems affected.",
    sections: [
      { title: "Make a bounded report.", paragraphs: ["Email support@yumait.com.au with a brief description, affected public component or supported release, expected versus observed behaviour, and a minimal reproduction that contains no live secrets or customer data.", "If sensitive evidence is needed, ask for an appropriate private transfer channel first. Do not post it in a public GitHub issue. Testing must stay within systems and accounts you are authorized to assess; this page is not authorization to attack customer environments."] },
      { title: "What happens next.", paragraphs: ["The team can clarify scope, request further evidence, and coordinate next steps with the reporter. A report should distinguish a reachable weakness from a hypothesis and explain any prerequisites or compensating controls.", "This is a private reporting channel, not a bug-bounty promise, a safe-harbour agreement, or a guaranteed response-time commitment. For urgent concerns, mark the subject clearly and avoid sending unnecessary sensitive detail."] },
    ], related: ["security", "contact", "privacy"],
  },
];

export const routePaths = ["/", ...pages.map((page) => `/${page.slug}/`)];
