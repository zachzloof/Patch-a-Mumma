// Starts the site for recording: a fresh production build served by
// `vite preview` in-process (no child process to orphan on Windows).
// Set DEMO_URL to record against something already running instead.
import { join } from 'node:path'

export interface RunningApp {
  url: string
  close: () => Promise<void>
}

export async function startApp(root: string, outDir: string, port = 4317): Promise<RunningApp> {
  if (process.env.DEMO_URL) {
    const url = process.env.DEMO_URL.replace(/\/$/, '')
    const res = await fetch(url).catch(() => null)
    if (!res?.ok) throw new Error(`DEMO_URL ${url} is not responding`)
    return { url, close: async () => {} }
  }

  // vite resolves from the app's own node_modules (the repo root).
  const { build, preview } = await import('vite')
  const configFile = join(root, 'vite.config.js')
  await build({ root, configFile, logLevel: 'warn', build: { outDir, emptyOutDir: true } })
  const server = await preview({
    root,
    configFile,
    logLevel: 'warn',
    build: { outDir },
    preview: { port, strictPort: true, open: false, host: '127.0.0.1' },
  })
  const url = `http://127.0.0.1:${port}`
  return {
    url,
    close: () => new Promise<void>((resolve) => server.httpServer.close(() => resolve())),
  }
}
