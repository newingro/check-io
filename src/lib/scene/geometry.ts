/**
 * Motore geometrico minimale per la composizione architettonica della hero.
 *
 * Le forme sono insiemi di segmenti 3D (wireframe) con lo stesso numero di
 * elementi, così da poter essere interpolate tra loro. Il modulo è puro e
 * viene usato sia lato server (SVG statico) sia lato client (canvas animato).
 */

export type Vec3 = readonly [number, number, number];
export type Segment = readonly [Vec3, Vec3];

export const SEGMENT_COUNT = 96;
const TARGET_RADIUS = 2.6;

const v = (x: number, y: number, z: number): Vec3 => [x, y, z];

function box(x: number, y: number, z: number, w: number, h: number, d: number): Segment[] {
  const b = [v(x, y, z), v(x + w, y, z), v(x + w, y, z + d), v(x, y, z + d)];
  const t = [v(x, y + h, z), v(x + w, y + h, z), v(x + w, y + h, z + d), v(x, y + h, z + d)];
  const out: Segment[] = [];
  for (let i = 0; i < 4; i++) {
    out.push([b[i], b[(i + 1) % 4]], [t[i], t[(i + 1) % 4]], [b[i], t[i]]);
  }
  return out;
}

function polyline(points: Vec3[], closed = false): Segment[] {
  const out: Segment[] = [];
  for (let i = 0; i < points.length - 1; i++) out.push([points[i], points[i + 1]]);
  if (closed && points.length > 2) out.push([points[points.length - 1], points[0]]);
  return out;
}

function rectXY(x0: number, y0: number, x1: number, y1: number, z: number): Segment[] {
  return polyline([v(x0, y0, z), v(x1, y0, z), v(x1, y1, z), v(x0, y1, z)], true);
}

function arcXY(cx: number, cy: number, z: number, r: number, a0: number, a1: number, steps: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    pts.push(v(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z));
  }
  return pts;
}

function circleXZ(cx: number, y: number, cz: number, r: number, steps: number): Segment[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < steps; i++) {
    const a = (Math.PI * 2 * i) / steps;
    pts.push(v(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r));
  }
  return polyline(pts, true);
}

/** Residenza: volume principale a falde, annesso, porta e pergolato. */
function residence(): Segment[] {
  const s: Segment[] = [];
  s.push(...box(-2.2, 0, -1.1, 2.6, 1.5, 2.0));
  const r0 = v(-2.2, 2.45, -0.1);
  const r1 = v(0.4, 2.45, -0.1);
  s.push([r0, r1], [v(-2.2, 1.5, 0.9), r0], [v(0.4, 1.5, 0.9), r1], [v(-2.2, 1.5, -1.1), r0], [v(0.4, 1.5, -1.1), r1]);
  s.push(...box(0.4, 0, -0.7, 1.8, 1.0, 1.6));
  // porta con architrave inclinato, come nel simbolo del brand
  s.push(...polyline([v(-1.2, 0, 0.9), v(-1.2, 0.95, 0.9), v(-0.65, 1.12, 0.9), v(-0.65, 0, 0.9)]));
  s.push(...rectXY(-2.0, 0.55, -1.5, 1.15, 0.9), ...rectXY(-0.35, 0.55, 0.15, 1.15, 0.9));
  s.push(...rectXY(0.75, 0.35, 1.95, 0.8, 0.9));
  // terrazza e pergolato
  s.push(...polyline([v(0.4, 0, 0.9), v(0.4, 0, 1.9), v(2.2, 0, 1.9), v(2.2, 0, 0.9)]));
  s.push([v(0.4, 0, 1.9), v(0.4, 1.0, 1.9)], [v(2.2, 0, 1.9), v(2.2, 1.0, 1.9)], [v(0.4, 1.0, 1.9), v(2.2, 1.0, 1.9)]);
  s.push([v(0.4, 1.0, 1.9), v(0.4, 1.0, 0.9)], [v(2.2, 1.0, 1.9), v(2.2, 1.0, 0.9)]);
  return s;
}

/** Città: volumi verticali di altezze diverse con marcapiani. */
function city(): Segment[] {
  const s: Segment[] = [];
  s.push(...box(-2.3, 0, -0.4, 1.0, 2.0, 1.0));
  s.push(...box(-1.1, 0, -1.0, 1.3, 3.6, 1.3));
  s.push(...box(0.4, 0, -0.2, 1.0, 1.5, 1.0));
  s.push(...box(0.6, 0, -1.6, 0.9, 2.7, 0.9));
  s.push(...box(1.6, 0, -0.6, 0.8, 1.0, 0.8));
  for (const y of [0.9, 1.8, 2.7]) {
    s.push([v(-1.1, y, 0.3), v(0.2, y, 0.3)], [v(0.2, y, 0.3), v(0.2, y, -1.0)]);
  }
  s.push([v(-0.45, 3.6, -0.35), v(-0.45, 4.15, -0.35)]);
  return s;
}

/** Simbolo: la "i" e il cerchio con la porta, estrusi nello spazio. */
function symbol(): Segment[] {
  const s: Segment[] = [];
  const R = 1.5;
  const doorL = -0.666;
  const doorR = 0.39;
  const yBottomL = -Math.sqrt(R * R - doorL * doorL);
  const yBottomR = -Math.sqrt(R * R - doorR * doorR);
  const a0 = Math.atan2(yBottomR, doorR);
  const a1 = Math.atan2(yBottomL, doorL) + Math.PI * 2;
  for (const z of [0.3, -0.3]) {
    const arc = arcXY(0, 0, z, R, a0, a1, 20);
    s.push(...polyline(arc));
    s.push(...polyline([v(doorR, yBottomR, z), v(doorR, 0.66, z), v(doorL, 0.26, z), v(doorL, yBottomL, z)]));
    const dot: Vec3[] = arcXY(-1.896, 1.2, z, 0.42, 0, Math.PI * 2, 10).slice(0, 10);
    s.push(...polyline(dot, true));
  }
  const arcFront = arcXY(0, 0, 0.3, R, a0, a1, 20);
  for (let i = 0; i <= 20; i += 4) {
    const p = arcFront[i];
    s.push([p, v(p[0], p[1], -0.3)]);
  }
  for (const p of [v(doorR, 0.66, 0.3), v(doorL, 0.26, 0.3), v(doorR, yBottomR, 0.3), v(doorL, yBottomL, 0.3)]) {
    s.push([p, v(p[0], p[1], -0.3)]);
  }
  s.push(...box(-2.237, -1.506, -0.3, 0.682, 2.156, 0.6));
  return s;
}

/** Struttura: reticolo astratto di volumi annidati e anello orizzontale. */
function lattice(): Segment[] {
  const s: Segment[] = [];
  s.push(...box(-1.4, -1.4, -1.4, 2.8, 2.8, 2.8));
  const inner: Vec3[] = [];
  const h = 0.8;
  for (const y of [-h, h]) {
    for (let i = 0; i < 4; i++) {
      const a = (Math.PI / 2) * i;
      inner.push(v(Math.cos(a) * 1.13, y, Math.sin(a) * 1.13));
    }
  }
  for (let i = 0; i < 4; i++) {
    s.push([inner[i], inner[(i + 1) % 4]], [inner[4 + i], inner[4 + ((i + 1) % 4)]], [inner[i], inner[4 + i]]);
  }
  const outerTop = [v(-1.4, 1.4, -1.4), v(1.4, 1.4, -1.4), v(1.4, 1.4, 1.4), v(-1.4, 1.4, 1.4)];
  const outerBottom = outerTop.map((p) => v(p[0], -1.4, p[2]));
  for (let i = 0; i < 4; i++) {
    s.push([inner[4 + i], outerTop[i]], [inner[i], outerBottom[i]]);
  }
  s.push(...circleXZ(0, 0, 0, 2.3, 24));
  s.push([v(0, -1.9, 0), v(0, 1.9, 0)]);
  return s;
}

export const FORM_NAMES = ["residenza", "citta", "simbolo", "struttura"] as const;
export type FormName = (typeof FORM_NAMES)[number];

function normalize(segments: Segment[]): Segment[] {
  let minX = Infinity, minY = Infinity, minZ = Infinity, maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (const seg of segments) {
    for (const p of seg) {
      minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
      minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
      minZ = Math.min(minZ, p[2]); maxZ = Math.max(maxZ, p[2]);
    }
  }
  const c = v((minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2);
  let radius = 0;
  for (const seg of segments) {
    for (const p of seg) {
      radius = Math.max(radius, Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]));
    }
  }
  const k = TARGET_RADIUS / radius;
  const t = (p: Vec3): Vec3 => v((p[0] - c[0]) * k, (p[1] - c[1]) * k, (p[2] - c[2]) * k);
  return segments.map(([a, b]) => [t(a), t(b)] as const);
}

/** Porta ogni forma allo stesso numero di segmenti e li ordina per angolo. */
function prepare(segments: Segment[]): Segment[] {
  const base = normalize(segments).slice(0, SEGMENT_COUNT);
  const out = [...base];
  let i = 0;
  while (out.length < SEGMENT_COUNT) {
    const p = base[(i * 7) % base.length][i % 2];
    out.push([p, p]);
    i++;
  }
  const angle = (seg: Segment) => Math.atan2((seg[0][2] + seg[1][2]) / 2, (seg[0][0] + seg[1][0]) / 2);
  return out.sort((a, b) => angle(a) - angle(b));
}

let cache: Record<FormName, Segment[]> | null = null;

export function getForms(): Record<FormName, Segment[]> {
  if (!cache) {
    cache = {
      residenza: prepare(residence()),
      citta: prepare(city()),
      simbolo: prepare(symbol()),
      struttura: prepare(lattice()),
    };
  }
  return cache;
}

/** Rango verticale (0 = in basso, 1 = in alto) del punto medio di ogni segmento. */
export function heightRanks(segments: Segment[]): Float32Array {
  const order = segments
    .map((seg, i) => ({ i, y: (seg[0][1] + seg[1][1]) / 2 }))
    .sort((a, b) => a.y - b.y);
  const ranks = new Float32Array(segments.length);
  order.forEach((entry, position) => {
    ranks[entry.i] = position / Math.max(1, segments.length - 1);
  });
  return ranks;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export type SegmentBuffer = [number, number, number, number, number, number][];

/**
 * Transizione "costruttiva" tra due forme: nella prima metà la forma di
 * partenza si smonta dall'alto verso il basso (ogni linea si contrae nel
 * proprio punto medio), nella seconda la nuova forma si costruisce dal basso.
 */
export function morphFrame(
  from: Segment[],
  to: Segment[],
  fromRanks: Float32Array,
  toRanks: Float32Array,
  progress: number,
  out: SegmentBuffer,
) {
  const building = progress >= 0.5;
  const source = building ? to : from;
  const phase = building ? (progress - 0.5) * 2 : progress * 2;
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const [a, b] = source[i];
    let scale = 1;
    if (progress > 0) {
      if (building) {
        scale = easeOutCubic(clamp01((phase - toRanks[i] * 0.45) / 0.55));
      } else {
        scale = 1 - easeInOutCubic(clamp01((phase - (1 - fromRanks[i]) * 0.45) / 0.55));
      }
    }
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    const mz = (a[2] + b[2]) / 2;
    const row = out[i];
    row[0] = mx + (a[0] - mx) * scale;
    row[1] = my + (a[1] - my) * scale;
    row[2] = mz + (a[2] - mz) * scale;
    row[3] = mx + (b[0] - mx) * scale;
    row[4] = my + (b[1] - my) * scale;
    row[5] = mz + (b[2] - mz) * scale;
  }
}

export interface Camera {
  yaw: number;
  pitch: number;
  distance: number;
}

export const DEFAULT_CAMERA: Camera = { yaw: -0.62, pitch: 0.36, distance: 11 };

/** Proietta un punto 3D sullo schermo. Restituisce [x, y, profondità]. */
export function project(
  x: number,
  y: number,
  z: number,
  cam: Camera,
  scale: number,
  cx: number,
  cy: number,
  out: [number, number, number],
) {
  const cosY = Math.cos(cam.yaw);
  const sinY = Math.sin(cam.yaw);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const cosP = Math.cos(cam.pitch);
  const sinP = Math.sin(cam.pitch);
  const y2 = y * cosP - z1 * sinP;
  const z2 = y * sinP + z1 * cosP;
  const persp = cam.distance / (cam.distance - z2);
  out[0] = cx + x1 * persp * scale;
  out[1] = cy - y2 * persp * scale;
  out[2] = z2;
}

/** Opacità in funzione della profondità: le linee vicine sono più luminose. */
export function depthAlpha(depth: number) {
  const t = Math.min(1, Math.max(0, (depth + TARGET_RADIUS) / (TARGET_RADIUS * 2)));
  return 0.22 + 0.78 * t;
}

export const FLOOR_Y = -TARGET_RADIUS * 0.72;
export const SCALE_FACTOR = 0.165;

export interface ProjectedLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  alpha: number;
}

/** Calcola le linee proiettate di una forma, usate per l'SVG statico. */
export function projectForm(form: FormName, size: number, cam: Camera = DEFAULT_CAMERA): ProjectedLine[] {
  const segments = getForms()[form];
  const scale = size * SCALE_FACTOR;
  const c = size / 2;
  const a: [number, number, number] = [0, 0, 0];
  const b: [number, number, number] = [0, 0, 0];
  const lines: ProjectedLine[] = [];
  for (const [p, q] of segments) {
    if (p[0] === q[0] && p[1] === q[1] && p[2] === q[2]) continue;
    project(p[0], p[1], p[2], cam, scale, c, c, a);
    project(q[0], q[1], q[2], cam, scale, c, c, b);
    lines.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], alpha: depthAlpha((a[2] + b[2]) / 2) });
  }
  return lines;
}

/** Griglia del piano di appoggio, proiettata. */
export function projectFloor(size: number, cam: Camera = DEFAULT_CAMERA, extent = 5, step = 1): ProjectedLine[] {
  const scale = size * SCALE_FACTOR;
  const c = size / 2;
  const a: [number, number, number] = [0, 0, 0];
  const b: [number, number, number] = [0, 0, 0];
  const lines: ProjectedLine[] = [];
  for (let k = -extent; k <= extent; k += step) {
    project(k, FLOOR_Y, -extent, cam, scale, c, c, a);
    project(k, FLOOR_Y, extent, cam, scale, c, c, b);
    lines.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], alpha: 1 });
    project(-extent, FLOOR_Y, k, cam, scale, c, c, a);
    project(extent, FLOOR_Y, k, cam, scale, c, c, b);
    lines.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], alpha: 1 });
  }
  return lines;
}
