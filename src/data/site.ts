import { resolveConfiguration } from "../lib/config.ts";

export const configuration = resolveConfiguration(import.meta.env);
export const company = { name: "Yuma IT Pty Ltd", abn: "62 684 389 839", address: "49 Phillip Ave, Watson ACT 2602, Australia", email: "hello@yumait.com.au", support: "support@yumait.com.au" };
export const navigation = [
  { href: "/product/", label: "The organism" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/architecture/", label: "Architecture" },
  { href: "/security/", label: "Trust & safety" },
] as const;
export const questions = [
  { question: "Is blakDNA another SIEM or chatbot?", answer: "No. blakDNA maintains a temporal organisation model and persistent cyber memory. It works with security data sources rather than replacing them with a chat interface or another log store." },
  { question: "Does normal behaviour become trusted automatically?", answer: "No. Normal and secure remain separate judgements. Repeated unsafe behaviour remains unsafe, even when it is common in the organisation." },
  { question: "Can blakDNA change production controls by itself?", answer: "Consequential remediation requires explicit human approval by default. Investigation, recommendations, and verification do not authorize changing IAM, disabling accounts, or deleting infrastructure." },
  { question: "Where does the organisation's data live?", answer: "The customer-hosted architecture keeps the application and authoritative PostgreSQL data in the buyer's AWS environment. Hermes receives scoped evidence context through approved interfaces, not unrestricted raw telemetry." },
] as const;
