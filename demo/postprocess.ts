// Turns the raw Playwright recordings into portfolio-ready files.
//
//   node demo/postprocess.ts            both variants
//   node demo/postprocess.ts desktop    just one
//
// For each variant it writes, into demo/output/:
//   patch-a-mumma-<variant>.mp4       3s title card, crossfade, trimmed walkthrough (H.264)
//   patch-a-mumma-<variant>-loop.mp4  ~15s muted loop of the opening, for a portfolio grid
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'
import { chromium } from 'playwright'

const DEMO = dirname(fileURLToPath(import.meta.url))
const OUT = join(DEMO, 'output')
const RAW = join(OUT, 'raw')
const PAPER = '0xFAF9F4'

const TITLE_SECONDS = 3 // title card fully on screen
const XFADE = 0.6 // crossfade from the card into the walkthrough
const LEAD_IN = 0.1 // seconds kept before the "start" mark
const TAIL = 0.2 // seconds kept after the "end" mark
const LOOP_SECONDS = 15
const FPS = 30

const log = (...a: unknown[]) => console.log('[post]', ...a)

function run(cmd: string, args: string[]) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (r.status !== 0) throw new Error(`${cmd} failed:\n${r.stderr?.slice(-3000)}`)
  return r.stdout
}

const duration = (file: string) =>
  Number(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).trim())

/**
 * Seconds to add to a recorder mark to get its time in the raw video, measured
 * from the black sync flash record.ts shows just before the recorded pass.
 */
function syncOffset(raw: string, syncMark: number) {
  const r = spawnSync('ffmpeg', ['-v', 'info', '-i', raw, '-vf', 'blackdetect=d=0.25:pix_th=0.08:pic_th=0.97', '-an', '-f', 'null', '-'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
  const starts = [...(r.stderr ?? '').matchAll(/black_start:([\d.]+)/g)].map((m) => Number(m[1]))
  if (!starts.length) throw new Error(`No sync flash found in ${raw}`)
  // The flash is the only black screen in the recording (pages start white).
  if (starts.length > 1) console.warn(`[post] ${starts.length} black intervals in ${raw}; using the first`)
  return starts[0] - syncMark
}

async function renderTitleCards(variants: { name: string; w: number; h: number; scale: number }[]) {
  const browser = await chromium.launch()
  try {
    for (const v of variants) {
      const page = await browser.newPage({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: v.scale })
      await page.goto(pathToFileURL(join(DEMO, 'title-card.html')).href, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const ok = await page.evaluate(() => document.fonts.check('850 100px Archivo'))
      if (!ok) log('warning: Archivo did not load for the title card (offline?); using a fallback face')
      await page.screenshot({ path: join(RAW, `title-${v.name}.png`) })
      await page.close()
    }
  } finally {
    await browser.close()
  }
}

export async function postprocess(names: string[] = ['desktop', 'mobile']) {
  const variants = names
    .filter((name) => existsSync(join(RAW, `${name}.webm`)))
    .map((name) => {
      const meta = JSON.parse(readFileSync(join(RAW, `${name}.json`), 'utf8'))
      return { name, w: meta.size.width, h: meta.size.height, scale: meta.scale, marks: meta.marks as Record<string, number> }
    })
  if (!variants.length) throw new Error('No raw recordings in demo/output/raw. Run `npm run demo:record` first.')

  await renderTitleCards(variants)

  const results: { file: string; seconds: number }[] = []
  for (const v of variants) {
    const raw = join(RAW, `${v.name}.webm`)
    const W = v.w
    const H = v.h
    const offset = syncOffset(raw, v.marks.sync)
    log(`${v.name}: video runs ${offset.toFixed(3)}s from the recorder's clock`)
    const start = Math.max(0, v.marks.start + offset - LEAD_IN)
    const end = Math.min(duration(raw), v.marks.end + offset + TAIL)
    const clip = end - start
    const norm = `fps=${FPS},scale=${W}:${H}:flags=lanczos,setsar=1,format=yuv420p`

    // Main walkthrough: title card, crossfade, trimmed recording, fade out to paper.
    const main = join(OUT, `patch-a-mumma-${v.name}.mp4`)
    const total = TITLE_SECONDS + clip
    run('ffmpeg', [
      '-y', '-v', 'error',
      '-loop', '1', '-framerate', String(FPS), '-t', String(TITLE_SECONDS + XFADE), '-i', join(RAW, `title-${v.name}.png`),
      '-ss', start.toFixed(3), '-t', clip.toFixed(3), '-i', raw,
      '-filter_complex',
      `[0:v]${norm}[card];[1:v]${norm},setpts=PTS-STARTPTS[walk];` +
        `[card][walk]xfade=transition=fade:duration=${XFADE}:offset=${TITLE_SECONDS},` +
        `fade=t=out:st=${(total - 0.7).toFixed(3)}:d=0.7:color=${PAPER}[v]`,
      '-map', '[v]', '-an',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      main,
    ])
    results.push({ file: main, seconds: duration(main) })

    // Portfolio-grid loop: the opening (garden growing in, then down through the
    // soil), smaller, muted, eased in and out of paper so the loop seam is soft.
    const loop = join(OUT, `patch-a-mumma-${v.name}-loop.mp4`)
    const loopLen = Math.min(LOOP_SECONDS, clip)
    const loopScale = v.name === 'mobile' ? `scale=${W}:${H}` : 'scale=1280:-2:flags=lanczos'
    run('ffmpeg', [
      '-y', '-v', 'error',
      '-ss', start.toFixed(3), '-t', loopLen.toFixed(3), '-i', raw,
      '-vf',
      `fps=${FPS},${loopScale},setsar=1,format=yuv420p,` +
        `fade=t=in:st=0:d=0.5:color=${PAPER},fade=t=out:st=${(loopLen - 0.6).toFixed(3)}:d=0.6:color=${PAPER}`,
      '-an',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      loop,
    ])
    results.push({ file: loop, seconds: duration(loop) })

    const lo = v.name === 'mobile' ? 40 : 45
    if (total < lo || total > 90) log(`warning: ${v.name} runs ${total.toFixed(1)}s (target ${lo}-90s)`)
  }

  for (const r of results) log(`${r.seconds.toFixed(1)}s  ${r.file}`)
  return results
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const names = process.argv.slice(2).filter((a) => !a.startsWith('-'))
  postprocess(names.length ? names : undefined).catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
