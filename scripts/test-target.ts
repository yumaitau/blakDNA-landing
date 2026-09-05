export function testTarget(value?: string): { baseURL: string; external: boolean } {
  const supplied = value?.trim();
  if (!supplied) return { baseURL: "http://127.0.0.1:4321", external: false };
  const url = new URL(supplied);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Test target must be an HTTP(S) origin without credentials");
  }
  return { baseURL: url.origin, external: true };
}
