// deno-lint-ignore-file no-explicit-any
function minify(js: string): string {
  return js
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}();,:])\s*/g, "$1")
    .replace(/\n+/g, "");
}

export function useScript<T extends (...args: any[]) => any>(
  fn: T,
  ...params: Parameters<T>
): string {
  const javascript = minify(fn.toString());
  return `(${javascript})(${params.map((p) => JSON.stringify(p)).join(", ")})`;
}
