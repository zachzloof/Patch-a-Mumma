# Walkthrough recording

A repeatable Playwright setup that records the Patch A Mumma site for a portfolio.

```sh
npm run demo:record
```

That one command:

1. installs this folder's own dependency (Playwright), separate from the app;
2. seeds the recording (see below);
3. builds the site and serves it with `vite preview` on port 4317;
4. records a desktop (1920×1080) and a phone (390×844) walkthrough;
5. post-processes both with ffmpeg into `demo/output/`, which is gitignored.

It takes about 2½ minutes. You need Node 22.18 or later (it runs `.ts` directly) and `ffmpeg`/`ffprobe` on your PATH.

## Output

| File | What it is |
| --- | --- |
| `patch-a-mumma-desktop.mp4` | A 3s title card, a crossfade, then the 1080p walkthrough (about 1 minute; typing speed varies a few seconds per run) |
| `patch-a-mumma-mobile.mp4` | The same for the phone journey (about 48s) |
| `patch-a-mumma-desktop-loop.mp4` | A 15s muted 720p loop of the opening, for a portfolio grid |
| `patch-a-mumma-mobile-loop.mp4` | A 15s muted loop of the phone opening |
| `raw/` | The raw `.webm` recordings, the chapter marks and the title-card PNGs |

## The journeys

- **Desktop:** the garden grows in, then the page scrolls down through the soil (What we do, Simple as seeds in soil, What grows when). Next it goes to Services, then Fermentation & Preservation, then Book this service. On Contact it hovers the booking calendar, types the enquiry and sends it, ending on "Message sent".
- **Phone:** the garden grows in and the page scrolls until the sticky booking bar rises. Then Menu, Services, Fermentation & Preservation and Book this service, followed by the same enquiry, sent from the phone.

## Seed data

The site has no database or login, so seeding means the following:

- **The enquiry** (`fixtures.ts`): one believable visitor and her message. The contact details use reserved ranges: `example.com` and Ofcom's 07700 900xxx drama numbers.
- **Formspree is mocked** (`seed.ts`). The form is live and would email Penny, so the POST is answered locally with Formspree's own response shape. The recorder checks that exactly one enquiry was "sent" and that it matches the fixture.
- **Calendly is blocked.** It is hovered, never opened.
- **The calendar date is pinned to mid-May.** The sowing calendar highlights the current month, so the page's `Date` is shifted to mid-May and every recording matches. The shift is a constant offset, so time keeps moving and GSAP runs normally.

## Useful flags

```sh
node demo/record.ts --only=desktop      # one variant
node demo/record.ts --no-post           # record only
node demo/postprocess.ts                # re-encode from the raw recordings
# record a server that's already running (e.g. `npm run dev`):
$env:DEMO_URL = 'http://localhost:5173'; node demo/record.ts   # PowerShell
DEMO_URL=http://localhost:5173 node demo/record.ts             # bash
```

## How it stays clean and repeatable

- **No blank start.** Before recording, a warm-up pass visits every route, so fonts, chunks and images are cached. The real pass is then a fresh load, cut in after fonts are ready, so the video opens on the garden growing in.
- **Exact cuts.** The video's timeline doesn't start at the moment the page is created, and the gap varies from run to run. To line up the chapter marks, `record.ts` flashes one black frame during the warm-up, and `postprocess.ts` finds it with ffmpeg's `blackdetect`.
- **No fixed sleeps for syncing.** Waits key off selectors, page-transition classes, the scroll position settling and the mocked network response. The only timed waits are deliberate holds, so a viewer can take a moment in.
- **Visible input.** `lib/cursor.ts` injects a cursor and a click ripple: an arrow on desktop, a fingertip dot on the phone. `lib/human.ts` glides the mouse on eased arcs, types with `pressSequentially`, and scrolls frame by frame so the GSAP ScrollTrigger animations play as they would for a real visitor.

## Files

```
demo/
  record.ts         the journeys and recorder (entry point)
  postprocess.ts    ffmpeg: title card, trims, H.264, loops
  seed.ts           date pin and network stand-ins
  fixtures.ts       the enquiry content
  title-card.html   title card, rendered to PNG in the site's type and palette
  lib/cursor.ts     the injected cursor and ripple
  lib/human.ts      human-paced mouse, typing, scrolling and waits
  lib/server.ts     build and serve the site in-process
```

The phone video is recorded at 390×844. Chrome's screencast captures CSS pixels, so a higher-resolution phone capture isn't possible with `recordVideo`. The page still renders at 3× and is downsampled, which keeps small text smooth.
