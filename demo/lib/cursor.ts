// A visible cursor and click ripple. Headless video doesn't draw the mouse, so
// this is injected into every page with addInitScript. It only listens to real
// mouse events, so whatever Playwright does with the mouse is what you see.

export interface CursorOptions {
  /** 'arrow' for desktop, 'touch' for a fingertip dot on phones */
  kind: 'arrow' | 'touch'
}

export function installCursor({ kind }: CursorOptions) {
  if (window.top !== window) return
  const RUST = '#B23C1C'
  const INK = '#10291C'
  const PAPER = '#FAF9F4'

  const mount = () => {
    if (document.getElementById('__demo-cursor')) return
    const style = document.createElement('style')
    style.textContent = `
      #__demo-cursor { position: fixed; left: 0; top: 0; z-index: 2147483647; pointer-events: none;
        opacity: 0; transition: opacity .2s ease; will-change: transform; }
      #__demo-cursor.on { opacity: 1; }
      #__demo-cursor .shape { transition: transform .12s ease; transform-origin: 3px 3px; }
      #__demo-cursor.down .shape { transform: scale(.86); }
      #__demo-cursor.touch .shape { width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%;
        background: rgba(16,41,28,.22); border: 2.5px solid rgba(250,249,244,.95);
        box-shadow: 0 0 0 1.5px rgba(16,41,28,.45), 0 4px 10px rgba(16,41,28,.25); transform-origin: 50% 50%; }
      #__demo-cursor.touch.down .shape { transform: scale(.82); background: rgba(178,60,28,.38); }
      .__demo-ripple { position: fixed; z-index: 2147483646; pointer-events: none; width: 18px; height: 18px;
        margin: -9px 0 0 -9px; border-radius: 50%; border: 3px solid ${RUST}; background: rgba(178,60,28,.16);
        animation: __demo-ripple .6s cubic-bezier(.22,1,.36,1) forwards; }
      @keyframes __demo-ripple { from { transform: scale(.5); opacity: .95; } to { transform: scale(3.4); opacity: 0; } }
    `
    document.head.appendChild(style)

    const cursor = document.createElement('div')
    cursor.id = '__demo-cursor'
    cursor.setAttribute('aria-hidden', 'true')
    if (kind === 'touch') {
      cursor.classList.add('touch')
      cursor.innerHTML = '<div class="shape"></div>'
    } else {
      cursor.innerHTML = `<svg class="shape" width="30" height="34" viewBox="0 0 30 34" style="margin:-3px 0 0 -3px;display:block;filter:drop-shadow(0 3px 4px rgba(16,41,28,.28))">
        <path d="M3 3 L3 27.5 L9.6 21.2 L14.2 31.4 L18.6 29.5 L14.1 19.4 L23.2 19.4 Z" fill="${INK}" stroke="${PAPER}" stroke-width="2" stroke-linejoin="round"/>
      </svg>`
    }
    document.body.appendChild(cursor)

    const place = (x: number, y: number) => {
      cursor.style.transform = `translate(${x}px, ${y}px)`
      cursor.classList.add('on')
      try {
        sessionStorage.setItem('__demo-cursor', `${x},${y}`)
      } catch {}
    }
    try {
      const saved = sessionStorage.getItem('__demo-cursor')
      if (saved) {
        const [x, y] = saved.split(',').map(Number)
        place(x, y)
      }
    } catch {}

    const ripple = (x: number, y: number) => {
      const r = document.createElement('div')
      r.className = '__demo-ripple'
      r.style.left = `${x}px`
      r.style.top = `${y}px`
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 700)
    }
    ;(window as any).__demoRipple = ripple

    window.addEventListener('mousemove', (e) => place(e.clientX, e.clientY), { capture: true, passive: true })
    window.addEventListener(
      'mousedown',
      (e) => {
        cursor.classList.add('down')
        ripple(e.clientX, e.clientY)
      },
      { capture: true, passive: true },
    )
    window.addEventListener('mouseup', () => cursor.classList.remove('down'), { capture: true, passive: true })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount)
  else mount()
}
