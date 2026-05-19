import { ARK_HOST_BUNDLE_DIR } from "./ark_host_config";

if (!(globalThis as any).console) {
  (globalThis as any).console = {
    log: (msg: any) => print(String(msg)),
    info: (msg: any) => print(String(msg)),
    warn: (msg: any) => print(String(msg)),
    error: (msg: any) => print(String(msg)),
  };
}

function tryInstallNativeTimers() {
  if (typeof (globalThis as any).setTimeout === "function") {
    return;
  }

  try {
    const loader = (globalThis as any).requireNapiPreview;
    if (typeof loader !== "function") {
      return;
    }
    const etsVm = loader("ets_interop_js_napi", true);
    if (!etsVm || typeof etsVm.createRuntime !== "function") {
      return;
    }

    etsVm.createRuntime({
      "log-level": "debug",
      "panda-files": `${ARK_HOST_BUNDLE_DIR}/hello.abc`,
      "boot-panda-files": `${ARK_HOST_BUNDLE_DIR}/etsstdlib.abc:${ARK_HOST_BUNDLE_DIR}/hello.abc`,
    });
  } catch {
    // Keep the microtask timer shim below as the fallback.
  }
}

tryInstallNativeTimers();

if (!(globalThis as any).setTimeout) {
  type TimerRecord = {
    dueAt: number;
    handler: any;
    repeat: boolean;
    timeoutMs: number;
    args: any[];
  };

  let nextTimerId = 1;
  const timers = new Map<number, TimerRecord>();

  const runTimer = (id: number) => {
    Promise.resolve().then(() => {
      const timer = timers.get(id);
      if (!timer) {
        return;
      }
      if (Date.now() < timer.dueAt) {
        runTimer(id);
        return;
      }

      if (!timer.repeat) {
        timers.delete(id);
      } else {
        timer.dueAt = Date.now() + timer.timeoutMs;
      }

      if (typeof timer.handler === "function") {
        timer.handler(...timer.args);
      }

      if (timer.repeat && timers.has(id)) {
        runTimer(id);
      }
    });
  };

  const registerTimer = (
    handler: any,
    timeoutMs: number = 0,
    repeat: boolean = false,
    ...args: any[]
  ) => {
    const id = nextTimerId++;
    const delay = typeof timeoutMs === "number" && timeoutMs > 0 ? timeoutMs : 0;
    timers.set(id, {
      dueAt: Date.now() + delay,
      handler,
      repeat,
      timeoutMs: delay,
      args,
    });
    runTimer(id);
    return id;
  };

  (globalThis as any).setTimeout = registerTimer;
  (globalThis as any).setInterval = (
    handler: any,
    timeoutMs: number = 0,
    ...args: any[]
  ) => registerTimer(handler, timeoutMs, true, ...args);
  (globalThis as any).__nodeAddonApiTimerMap__ = timers;
}

if (!(globalThis as any).clearTimeout) {
  (globalThis as any).clearTimeout = (id: number) => {
    const timers = (globalThis as any).__nodeAddonApiTimerMap__;
    if (timers && typeof timers.delete === "function") {
      timers.delete(id);
    }
  };
}

if (!(globalThis as any).clearInterval) {
  (globalThis as any).clearInterval = (id: number) => {
    (globalThis as any).clearTimeout(id);
  };
}

if (!(globalThis as any).setImmediate) {
  (globalThis as any).setImmediate = (handler: any, ...args: any[]) => {
    return (globalThis as any).setTimeout(handler, 0, ...args);
  };
}
