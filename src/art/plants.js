// Procedural kitchen-garden plants, drawn as flat vector line art.
// Every plant grows from (0,0) on the ground line: negative y is above
// ground, positive y is below. Each generator returns a list of parts:
//   { t?: transform, cls?: animation class, paths: [{ d, fill, stroke, sw, draw }] }
// Animation classes: g-stem (stroke draws on), g-leaf (unfurls from its
// base, drawn along +x), g-fruit (swells from its centre), g-root (draws down).

export const INK = '#173D1F'
export const C = {
  leafDark: '#2F6B2A',
  leaf: '#4E8E35',
  leafLight: '#8DBF5A',
  leafPale: '#B9D88A',
  bean: '#D93A2B',
  tomato: '#D8432E',
  tomatoOrange: '#EC7B2C',
  tomatoGreen: '#9CC15A',
  squash: '#E8A33A',
  flower: '#F2C230',
  courgette: '#2F5A2A',
  courgetteStripe: '#6E9A4B',
  beet: '#8E1F45',
  beetDeep: '#6A1433',
  carrot: '#E87A24',
  garlic: '#F2EEE2',
  cane: '#B58A4E',
  root: '#E9D3A6',
  marigold: '#EF8B1F',
  marigoldCentre: '#B4471A',
}

export function rng(seed = 1) {
  let s = (seed * 2654435761) >>> 0 || 1
  return () => {
    s ^= s << 13
    s >>>= 0
    s ^= s >>> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}

const f = (n) => Math.round(n * 10) / 10
const rad = (deg) => (deg * Math.PI) / 180

export function smooth(pts) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`
  }
  return d
}

// Pointed leaf from (0,0) along +x. bend curls the tip.
export function leafD(L, W, bend = 0) {
  return `M0 0C${f(L * 0.22)} ${f(-W)} ${f(L * 0.68)} ${f(-W * 0.92 + bend * 0.5)} ${f(L)} ${f(bend)}C${f(L * 0.7)} ${f(W * 0.62 + bend * 0.5)} ${f(L * 0.24)} ${f(W * 0.95)} 0 0Z`
}
function ribD(L, W, bend = 0, veins = 3) {
  let d = `M0 0Q${f(L * 0.5)} ${f(bend * 0.35)} ${f(L * 0.9)} ${f(bend * 0.85)}`
  for (let i = 1; i <= veins; i++) {
    const x = (L * i) / (veins + 1.4)
    const y = bend * (x / L) * 0.5
    d += `M${f(x)} ${f(y)}L${f(x + L * 0.13)} ${f(y - W * 0.55)}M${f(x)} ${f(y)}L${f(x + L * 0.13)} ${f(y + W * 0.5)}`
  }
  return d
}
function leaf(x, y, angle, L, W, fill, opts = {}) {
  const bend = opts.bend ?? 0
  const paths = [{ d: leafD(L, W, bend), fill, stroke: INK, sw: 1.1 }]
  if (opts.rib !== false) paths.push({ d: ribD(L, W, bend, opts.veins ?? 3), fill: 'none', stroke: opts.ribColor || INK, sw: 0.8 })
  return { t: `translate(${f(x)} ${f(y)}) rotate(${f(angle)})`, cls: 'g-leaf', paths }
}
export function circleAt(cx, cy, r) {
  return `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(r * 2)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-r * 2)} 0Z`
}
function stem(d, sw = 1.6, stroke = INK) {
  return { cls: 'g-stem', paths: [{ d, fill: 'none', stroke, sw, draw: true }] }
}
function along(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

// Runner beans climbing a cane wigwam, scarlet flowers and hanging pods.
export function runnerBeans(seed = 1, H = 250) {
  const r = rng(seed)
  const parts = []
  const top = [0, -H]
  const bases = [[-H * 0.2, 2], [H * 0.2, 2], [-H * 0.04, 2]]
  // canes
  bases.forEach((b) => {
    parts.push({ cls: 'g-stem', paths: [{ d: `M${f(b[0])} ${b[1]}L${f(top[0] + (b[0] > 0 ? -8 : b[0] < -20 ? 8 : 0))} ${f(top[1] - 10)}`, fill: 'none', stroke: C.cane, sw: 3, draw: true }] })
  })
  parts.push({ paths: [{ d: `M-7 ${f(-H + 4)}l14 -6M-7 ${f(-H - 3)}l14 6`, fill: 'none', stroke: INK, sw: 1.2 }] })
  // a vine spiralling up each cane
  bases.forEach((b, vi) => {
    const pts = []
    const n = 26
    const freq = 5 + r() * 2
    const phase = r() * 6
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * 0.94
      const [x, y] = along(b, top, t)
      pts.push([x + Math.sin(t * freq * Math.PI + phase) * 7, y])
    }
    parts.push(stem(smooth(pts), 1.5, '#3F7A2E'))
    // trifoliate leaves at nodes
    for (let i = 3; i < n - 1; i += 2) {
      const [x, y] = pts[i]
      const side = i % 4 === 1 ? -1 : 1
      const base = side < 0 ? 180 : 0
      const L = 15 + r() * 9
      const fill = [C.leafDark, C.leaf, C.leaf][Math.floor(r() * 3)]
      parts.push(leaf(x, y, base + side * (-28 + r() * 10), L, L * 0.48, fill, { bend: side * 2, veins: 2 }))
      parts.push(leaf(x, y, base + side * (8 + r() * 12), L * 1.05, L * 0.5, fill, { bend: side * 2, veins: 2 }))
      parts.push(leaf(x, y, base + side * (42 + r() * 12), L * 0.9, L * 0.45, fill, { bend: side * 2, veins: 2 }))
      // flower racemes
      if (r() < 0.38 && i > 5) {
        const fx = x + side * 6
        const fs = []
        for (let k = 0; k < 4; k++) {
          const px = fx + side * k * 3.2
          const py = y - k * 4.5
          fs.push({ d: `M${f(px)} ${f(py)}c-1.6-3.6 1.4-6.2 3.4-4.4c2.4-1.2 4.4 1.8 2 4c1.6 2.4-1.8 4-3.4 2.2c-1.8 1.4-3.6-0.4-2-1.8z`, fill: C.bean, stroke: INK, sw: 0.7 })
        }
        parts.push({ cls: 'g-fruit', paths: fs })
      }
      // pods
      if (r() < 0.32 && i > 6 && vi !== 2) {
        const L2 = 26 + r() * 16
        parts.push({ t: `translate(${f(x)} ${f(y)}) rotate(${f(side * (4 + r() * 12))})`, cls: 'g-fruit', paths: [
          { d: `M0 0c3.4 ${f(L2 * 0.3)} 3.6 ${f(L2 * 0.7)} 0.6 ${f(L2)}c-3.6 ${f(-L2 * 0.28)} -4 ${f(-L2 * 0.7)} -0.6 ${f(-L2)}z`, fill: '#6FA641', stroke: INK, sw: 0.9 },
          { d: `M0.4 ${f(L2 * 0.25)}v${f(L2 * 0.5)}`, fill: 'none', stroke: INK, sw: 0.5 },
        ] })
      }
    }
  })
  return parts
}

// Staked tomato: zigzag stem, compound leaves, ripening trusses.
export function tomato(seed = 2, H = 200) {
  const r = rng(seed)
  const parts = []
  parts.push({ cls: 'g-stem', paths: [{ d: `M10 4L12 ${f(-H - 8)}`, fill: 'none', stroke: C.cane, sw: 3, draw: true }] })
  const pts = [[0, 0]]
  const n = 9
  for (let i = 1; i <= n; i++) pts.push([(i % 2 ? -4 : 4) + (r() - 0.5) * 3, (-H * i) / n])
  parts.push(stem(smooth(pts), 2.2, '#3F7A2E'))
  for (let i = 1; i < n; i++) {
    const [x, y] = pts[i]
    const side = i % 2 ? -1 : 1
    // compound leaf: petiole + leaflet pairs
    const len = 36 - i * 1.6 + r() * 6
    const ang = side < 0 ? 200 - r() * 25 : -20 + r() * 25
    const ex = x + Math.cos(rad(ang)) * len
    const ey = y + Math.sin(rad(ang)) * len
    parts.push(stem(`M${f(x)} ${f(y)}Q${f((x + ex) / 2)} ${f((y + ey) / 2 - 8)} ${f(ex)} ${f(ey)}`, 1.1, INK))
    for (let k = 1; k <= 3; k++) {
      const [lx, ly] = along([x, y], [ex, ey], k / 3.4)
      const Ls = 10 + r() * 4
      parts.push(leaf(lx, ly, ang - 60, Ls, Ls * 0.5, C.leafDark, { veins: 1, bend: -1 }))
      parts.push(leaf(lx, ly, ang + 60, Ls, Ls * 0.5, C.leafDark, { veins: 1, bend: 1 }))
    }
    parts.push(leaf(ex, ey, ang, 13, 6.5, C.leaf, { veins: 1 }))
    // truss on the other side
    if (i > 1 && i < n - 1 && i % 2 === 0) {
      const tx = x - side * 8
      const fruits = []
      const count = 3 + Math.floor(r() * 3)
      const ripe = i < 4 ? [C.tomato, C.tomato, C.tomatoOrange] : i < 6 ? [C.tomatoOrange, C.tomato, C.tomatoGreen] : [C.tomatoGreen, C.tomatoGreen, C.tomatoOrange]
      fruits.push({ d: `M${f(x)} ${f(y)}Q${f(tx)} ${f(y + 2)} ${f(tx - side * 6)} ${f(y + 10)}`, fill: 'none', stroke: INK, sw: 1 })
      for (let k = 0; k < count; k++) {
        const cx = tx - side * (k * 6.5) + (r() - 0.5) * 3
        const cy = y + 14 + (k % 2) * 6 + r() * 3
        const rr = 5.4 + r() * 2
        fruits.push({ d: circleAt(cx, cy, rr), fill: ripe[k % 3], stroke: INK, sw: 0.9 })
        fruits.push({ d: `M${f(cx - 3)} ${f(cy - rr + 1)}l3 1.4l3 -1.4M${f(cx)} ${f(cy - rr - 1)}v2.6`, fill: 'none', stroke: '#2F6B2A', sw: 1 })
        fruits.push({ d: `M${f(cx - rr * 0.45)} ${f(cy - rr * 0.2)}q1 -2.2 3 -2.6`, fill: 'none', stroke: '#FFF4E0', sw: 0.9 })
      }
      parts.push({ cls: 'g-fruit', paths: fruits })
    }
  }
  // small yellow flowers at the top
  const [fx, fy] = pts[n - 1]
  parts.push({ cls: 'g-fruit', paths: [0, 1, 2].flatMap((k) => petals(fx + 8 + k * 6, fy + k * 5, 4.2, C.flower, '#C98A12', 5, k * 20)) })
  return parts
}

function star(cx, cy, R, r0, n) {
  let d = ''
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n - Math.PI / 2
    const rr = i % 2 ? r0 : R
    d += `${i ? 'L' : 'M'}${f(cx + Math.cos(a) * rr)} ${f(cy + Math.sin(a) * rr)}`
  }
  return d + 'Z'
}

// Five rounded petals around a centre: squash and tomato flowers.
function petals(cx, cy, R, fill, centre, n = 5, rot = 0) {
  const out = []
  for (let i = 0; i < n; i++) {
    const a = rot + (360 / n) * i
    const x = cx + Math.cos(rad(a)) * R * 0.15
    const y = cy + Math.sin(rad(a)) * R * 0.15
    out.push({ d: leafD(R, R * 0.5), fill, stroke: INK, sw: 0.7, t: `translate(${f(x)} ${f(y)}) rotate(${f(a)})` })
  }
  out.push({ d: circleAt(cx, cy, R * 0.26), fill: centre, stroke: INK, sw: 0.6 })
  return out
}

function palmateD(R, lobes = 5, rnd) {
  const pts = []
  const steps = 60
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = rad(-200 + t * 220)
    const lobe = Math.abs(Math.cos(t * lobes * Math.PI))
    const rr = R * (0.58 + 0.42 * Math.pow(lobe, 0.7)) * (0.94 + rnd() * 0.08)
    pts.push([Math.cos(a) * rr, Math.sin(a) * rr * 0.86])
  }
  return smooth(pts) + 'Z'
}

// Courgette / squash: a mound of big lobed leaves, trumpet flowers, fruit.
export function squash(seed = 3, W = 150) {
  const r = rng(seed)
  const parts = []
  // trailing vine with a tendril, behind the leaves
  const vine = [[0, -2], [W * 0.28, 1], [W * 0.5, -3], [W * 0.62, 0]]
  parts.push(stem(smooth(vine), 1.6, '#3F7A2E'))
  parts.push(stem(`M${f(W * 0.56)} -2c4 -8 12 -6 10 0s-8 4 -6 -1s6 -2 4 1`, 0.9, INK))
  // leaves: back row high and dark, front row low and lighter
  const rows = [
    { n: 4, y: 0.5, R: 0.21, fill: C.leafDark },
    { n: 5, y: 0.26, R: 0.2, fill: C.leaf },
  ]
  rows.forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const t = (i + 0.5) / row.n
      const ex = (t - 0.5) * W * (ri ? 1 : 0.78) + (r() - 0.5) * 8
      const ey = -W * row.y * (0.75 + Math.sin(t * Math.PI) * 0.4) - r() * 6
      const R = W * row.R * (0.85 + r() * 0.3)
      parts.push(stem(`M0 -2Q${f(ex * 0.5)} ${f(ey * 0.2)} ${f(ex)} ${f(ey + R * 0.5)}`, 1.6, '#4C8A35'))
      const veins = [0, 1, 2, 3, 4].map((k) => {
        const a = rad(-180 + k * 45 + (r() - 0.5) * 6)
        return `M0 0L${f(Math.cos(a) * R * 0.8)} ${f(Math.sin(a) * R * 0.7)}`
      }).join('')
      parts.push({ t: `translate(${f(ex)} ${f(ey)}) rotate(${f((r() - 0.5) * 28)})`, cls: 'g-fruit', paths: [
        { d: palmateD(R, 2.5, r), fill: row.fill, stroke: INK, sw: 1.1 },
        { d: veins, fill: 'none', stroke: C.leafPale, sw: 0.9 },
        { d: `M${f(-R * 0.35)} ${f(-R * 0.3)}l3 2m${f(R * 0.5)} -3l2 3m${f(-R * 0.6)} ${f(R * 0.42)}l3 1`, fill: 'none', stroke: C.leafPale, sw: 0.7 },
      ] })
    }
  })
  // flowers: open trumpets peeking between the leaves
  ;[[W * 0.2, -W * 0.36], [-W * 0.3, -W * 0.22]].forEach(([x, y], k) => {
    parts.push({ cls: 'g-fruit', paths: petals(x, y, 9, C.flower, C.squash, 5, k * 30) })
  })
  // courgette fruit lying on the soil in front
  parts.push({ t: `translate(${f(W * 0.12)} -7) rotate(-6)`, cls: 'g-fruit', paths: [
    { d: 'M-24 0c0-6 6-8 24-8s26 2 26 8-8 8-26 8-24-2-24-8z', fill: C.courgette, stroke: INK, sw: 1.1 },
    { d: 'M-18 -3.4c12-2 26-2 38 0M-18 3.2c12 2 26 2 38 0M-20 0h44', fill: 'none', stroke: C.courgetteStripe, sw: 1.2 },
    { d: 'M26 -2l6 -3', fill: 'none', stroke: INK, sw: 1.6 },
  ] })
  return parts
}

// Beetroot: ruby-veined leaves, shoulder above ground, taproot below.
export function beetroot(seed = 4, H = 70) {
  const r = rng(seed)
  const parts = []
  const n = 6
  for (let i = 0; i < n; i++) {
    const a = -150 + (i / (n - 1)) * 120 + (r() - 0.5) * 10
    const sx = Math.cos(rad(a)) * H * 0.35
    const sy = -6 + Math.sin(rad(a)) * H * 0.35
    parts.push(stem(`M0 -6Q${f(sx * 0.4)} ${f(sy * 0.6)} ${f(sx)} ${f(sy)}`, 1.6, C.beet))
    const L = H * (0.5 + r() * 0.22)
    parts.push(leaf(sx, sy, a + (r() - 0.5) * 12, L, L * 0.42, i % 2 ? C.leaf : C.leafDark, { ribColor: C.beet, veins: 3, bend: (r() - 0.5) * 6 }))
  }
  const R = H * 0.16
  parts.push({ cls: 'g-root', paths: [{ d: `M0 ${f(R * 1.6)}C1 ${f(R * 3)} -1 ${f(R * 4)} 1.5 ${f(R * 5.6)}M0.6 ${f(R * 3)}l-6 4M0.4 ${f(R * 3.8)}l5 5`, fill: 'none', stroke: C.beetDeep, sw: 1, draw: true }] })
  parts.push({ cls: 'g-fruit', paths: [
    { d: `M0 ${f(-R * 0.9)}C${f(R * 1.3)} ${f(-R * 0.9)} ${f(R * 1.25)} ${f(R * 1.1)} 0 ${f(R * 1.7)}C${f(-R * 1.25)} ${f(R * 1.1)} ${f(-R * 1.3)} ${f(-R * 0.9)} 0 ${f(-R * 0.9)}Z`, fill: C.beet, stroke: INK, sw: 1.1 },
    { d: `M${f(-R * 0.5)} ${f(-R * 0.2)}q${f(R * 0.3)} -${f(R * 0.4)} ${f(R * 0.7)} -${f(R * 0.4)}`, fill: 'none', stroke: '#C2557C', sw: 1 },
  ] })
  return parts
}

// Carrots: feathery fronds above, orange root in section below.
export function carrot(seed = 5, H = 64) {
  const r = rng(seed)
  const parts = []
  const fronds = 5
  for (let i = 0; i < fronds; i++) {
    const a = -125 + (i / (fronds - 1)) * 70 + (r() - 0.5) * 8
    const L = H * (0.75 + r() * 0.3)
    const ex = Math.cos(rad(a)) * L
    const ey = Math.sin(rad(a)) * L
    parts.push(stem(`M0 -2Q${f(ex * 0.35)} ${f(ey * 0.55)} ${f(ex)} ${f(ey)}`, 1.1, '#3F7A2E'))
    let fd = ''
    for (let k = 3; k <= 10; k++) {
      const [x, y] = along([0, -2], [ex, ey], k / 10.5)
      const s = 5.5 - k * 0.3
      fd += `M${f(x)} ${f(y)}l${f(-s)} ${f(-s * 0.6)}M${f(x)} ${f(y)}l${f(s)} ${f(-s * 0.6)}`
      fd += `M${f(x - s * 0.6)} ${f(y - s * 0.36)}l-1.6 -2.4M${f(x + s * 0.6)} ${f(y - s * 0.36)}l1.6 -2.4`
    }
    parts.push({ cls: 'g-leaf', paths: [{ d: fd, fill: 'none', stroke: C.leaf, sw: 1.3 }] })
  }
  const D = H * 0.62
  parts.push({ cls: 'g-root', paths: [
    { d: `M-5.5 -1C-5.5 ${f(D * 0.4)} -2 ${f(D * 0.8)} 0 ${f(D)}C2 ${f(D * 0.8)} 5.5 ${f(D * 0.4)} 5.5 -1Z`, fill: C.carrot, stroke: INK, sw: 1, draw: false },
    { d: `M-4.6 ${f(D * 0.18)}h3M1.6 ${f(D * 0.32)}h3M-3.6 ${f(D * 0.48)}h2.6M0.6 ${f(D * 0.62)}h2M0 ${f(D)}v8`, fill: 'none', stroke: INK, sw: 0.8 },
  ] })
  return parts
}

// Garlic / onion: strap leaves, white bulb below ground.
export function garlic(seed = 6, H = 60) {
  const r = rng(seed)
  const parts = []
  for (let i = 0; i < 4; i++) {
    const lean = (i - 1.5) * 9 + (r() - 0.5) * 6
    const L = H * (0.8 + r() * 0.3)
    parts.push({ cls: 'g-stem', paths: [{ d: `M0 -1Q${f(lean * 0.4)} ${f(-L * 0.6)} ${f(lean * 1.6)} ${f(-L)}`, fill: 'none', stroke: i % 2 ? C.leafLight : C.leaf, sw: 3.2, draw: true }] })
  }
  parts.push({ cls: 'g-fruit', paths: [
    { d: 'M0 -2C9 -2 11 10 0 16C-11 10 -9 -2 0 -2Z', fill: C.garlic, stroke: INK, sw: 1 },
    { d: 'M0 0C-3 6 -3 10 0 15M0 0C3 6 3 10 0 15M-2 16l-2 5M0 16v6M2 16l2 5', fill: 'none', stroke: INK, sw: 0.7 },
  ] })
  return parts
}

// Lettuce rosette.
export function lettuce(seed = 7, R = 26) {
  const r = rng(seed)
  const parts = []
  for (let i = 0; i < 9; i++) {
    const a = -180 + (i / 8) * 180 + (r() - 0.5) * 12
    const L = R * (0.8 + r() * 0.35)
    parts.push(leaf(0, -3, a, L, L * 0.62, i % 3 === 0 ? C.leafLight : i % 3 === 1 ? C.leafPale : C.leaf, { veins: 2, bend: (r() - 0.5) * 8 }))
  }
  return parts
}

// Marigold, the companion plant at the bed edges.
export function marigold(seed = 8, H = 30) {
  const r = rng(seed)
  const parts = []
  const heads = 2 + Math.floor(r() * 2)
  for (let i = 0; i < heads; i++) {
    const x = (i - (heads - 1) / 2) * 9 + (r() - 0.5) * 4
    const y = -H * (0.7 + r() * 0.35)
    parts.push(stem(`M0 0Q${f(x * 0.5)} ${f(y * 0.5)} ${f(x)} ${f(y)}`, 1.1, '#3F7A2E'))
    parts.push(leaf(x * 0.4, y * 0.45, i % 2 ? -150 : -30, 8, 3.4, C.leafDark, { rib: false }))
    parts.push({ cls: 'g-fruit', paths: [
      { d: star(x, y, 6.6, 4.2, 10), fill: C.marigold, stroke: INK, sw: 0.7 },
      { d: `M${f(x - 2.4)} ${f(y)}a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0Z`, fill: C.marigoldCentre, stroke: 'none', sw: 0 },
    ] })
  }
  return parts
}

// Grass and weed tufts along the ground line.
export function tuft(seed = 9, H = 12) {
  const r = rng(seed)
  let d = ''
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * 2.4
    d += `M${f(x)} 0q${f((r() - 0.5) * 4)} ${f(-H * 0.5)} ${f((i - 2) * 2.4)} ${f(-H * (0.6 + r() * 0.5))}`
  }
  return [{ cls: 'g-leaf', paths: [{ d, fill: 'none', stroke: C.leaf, sw: 1.1 }] }]
}

// A seed sprouting, with a branching root system drawn downward.
export function rootSystem(seed = 10, depth = 260, spread = 34) {
  const r = rng(seed)
  const parts = []
  const main = [[0, 0]]
  const steps = 12
  for (let i = 1; i <= steps; i++) main.push([(r() - 0.5) * 7 + Math.sin(i * 0.9) * 3, (depth * i) / steps])
  parts.push({ cls: 'g-root', paths: [{ d: smooth(main), fill: 'none', stroke: C.root, sw: 1.6, draw: true }] })
  for (let i = 1; i < steps - 1; i++) {
    const [x, y] = main[i]
    for (const side of [-1, 1]) {
      if (r() < 0.25) continue
      const len = spread * (1 - i / steps) * (0.6 + r() * 0.6) + 8
      const pts = [[x, y]]
      for (let k = 1; k <= 4; k++) pts.push([x + side * (len * k) / 4, y + (len * k) / 4 * (0.55 + r() * 0.5) + (r() - 0.5) * 3])
      parts.push({ cls: 'g-root', paths: [{ d: smooth(pts), fill: 'none', stroke: C.root, sw: 1, draw: true }] })
      // root hairs
      const [hx, hy] = pts[2]
      parts.push({ cls: 'g-root', paths: [{ d: `M${f(hx)} ${f(hy)}l${f(side * 5)} ${f(6 + r() * 4)}M${f(hx)} ${f(hy)}l${f(-side * 2)} ${f(7)}`, fill: 'none', stroke: C.root, sw: 0.7, draw: true }] })
    }
  }
  return parts
}

// A long runner-bean vine trailing down a page margin, W wide and H tall.
export function vineRail(seed = 1, H = 1200, W = 100) {
  const r = rng(seed)
  const parts = []
  const pts = []
  for (let y = 0; y <= H; y += 36) pts.push([W / 2 + Math.sin(y / 110 + seed) * W * 0.24 + (r() - 0.5) * 6, y])
  parts.push({ cls: 'g-stem', paths: [{ d: smooth(pts), fill: 'none', stroke: '#3F7A2E', sw: 2, draw: true }] })
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i]
    const side = i % 2 ? -1 : 1
    const base = side < 0 ? 180 : 0
    if (i % 3 !== 0) {
      const L = 17 + r() * 8
      const fill = [C.leafDark, C.leaf, C.leaf][Math.floor(r() * 3)]
      parts.push(leaf(x, y, base + side * (-30 + r() * 10), L, L * 0.48, fill, { bend: side * 2, veins: 2 }))
      parts.push(leaf(x, y, base + side * (10 + r() * 12), L * 1.08, L * 0.5, fill, { bend: side * 2, veins: 2 }))
      parts.push(leaf(x, y, base + side * (48 + r() * 10), L * 0.9, L * 0.45, fill, { bend: side * 2, veins: 2 }))
    } else if (r() < 0.6) {
      // a tendril curl
      parts.push({ cls: 'g-stem', paths: [{ d: `M${f(x)} ${f(y)}c${side * 8} 2 ${side * 14} -6 ${side * 10} -10s-8 2 -5 5s5 -1 3 -3`, fill: 'none', stroke: INK, sw: 0.9, draw: true }] })
    }
    if (i % 5 === 2) {
      const fs = []
      for (let k = 0; k < 4; k++) {
        const px = x - side * (8 + k * 3.4)
        const py = y + k * 5
        fs.push({ d: `M${f(px)} ${f(py)}c-1.6-3.6 1.4-6.2 3.4-4.4c2.4-1.2 4.4 1.8 2 4c1.6 2.4-1.8 4-3.4 2.2c-1.8 1.4-3.6-0.4-2-1.8z`, fill: C.bean, stroke: INK, sw: 0.7 })
      }
      parts.push({ cls: 'g-fruit', paths: fs })
    }
    if (i % 7 === 4) {
      const L2 = 30 + r() * 14
      parts.push({ t: `translate(${f(x)} ${f(y)}) rotate(${f(-side * 10)})`, cls: 'g-fruit', paths: [
        { d: `M0 0c3.4 ${f(L2 * 0.3)} 3.6 ${f(L2 * 0.7)} 0.6 ${f(L2)}c-3.6 ${f(-L2 * 0.28)} -4 ${f(-L2 * 0.7)} -0.6 ${f(-L2)}z`, fill: '#6FA641', stroke: INK, sw: 0.9 },
        { d: `M0.4 ${f(L2 * 0.25)}v${f(L2 * 0.5)}`, fill: 'none', stroke: INK, sw: 0.5 },
      ] })
    }
  }
  return parts
}

export const PLANTS = { vineRail, runnerBeans, tomato, squash, beetroot, carrot, garlic, lettuce, marigold, tuft, rootSystem }
