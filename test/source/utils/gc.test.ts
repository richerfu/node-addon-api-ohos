function hintGC() {
  const tools = (globalThis as any).ArkTools;
  if (tools && typeof tools.hintGC === "function") {
    tools.hintGC();
  }
}

function tick(count: number): Promise<void> {
  return new Promise((resolve) => {
    const run = () => {
      if (--count <= 0) {
        resolve();
      } else {
        (globalThis as any).setTimeout(run, 0);
      }
    };
    (globalThis as any).setTimeout(run, 0);
  });
}

export async function runGCTests(items: any[]) {
  const tests: any[][] = [];
  let current: any[] = [];
  for (const item of items) {
    if (typeof item === "string") {
      current = [item];
      tests.push(current);
    } else {
      current.push(item);
    }
  }

  for (const test of tests) {
    for (let i = 1; i < test.length; i++) {
      test[i]();
      hintGC();
      await tick(4);
    }
  }
}
