import { DEFAULT_CAMERA, projectFloor, projectForm, type Camera, type FormName, type ProjectedLine } from "@/lib/scene/geometry";
import { cn } from "@/lib/cn";

interface ArchitecturalArtProps {
  form: FormName;
  /** Identificatore univoco per gli id SVG interni. */
  id: string;
  camera?: Partial<Camera>;
  floor?: boolean;
  animate?: boolean;
  className?: string;
  intensity?: number;
}

const SIZE = 800;
const BUCKETS = 6;
const r = (n: number) => Math.round(n * 10) / 10;

function toPath(lines: ProjectedLine[]) {
  return lines.map((l) => `M${r(l.x1)} ${r(l.y1)}L${r(l.x2)} ${r(l.y2)}`).join("");
}

/** Raggruppa le linee per livello di opacità: pochi <path> invece di centinaia di <line>. */
function groupByDepth(lines: ProjectedLine[], intensity: number) {
  const groups: ProjectedLine[][] = Array.from({ length: BUCKETS }, () => []);
  for (const line of lines) {
    groups[Math.min(BUCKETS - 1, Math.floor(line.alpha * BUCKETS))].push(line);
  }
  return groups
    .map((group, i) => ({ d: toPath(group), opacity: r(((i + 0.5) / BUCKETS) * intensity * 100) / 100, count: group.length }))
    .filter((g) => g.count > 0);
}

/**
 * Composizione architettonica statica (SVG renderizzato sul server).
 * Usata come prima immagine della hero, come fallback senza JavaScript
 * e come elemento grafico delle pagine interne.
 */
export function ArchitecturalArt({
  form,
  id,
  camera,
  floor = true,
  animate = true,
  className,
  intensity = 0.9,
}: ArchitecturalArtProps) {
  const cam = { ...DEFAULT_CAMERA, ...camera };
  const groups = groupByDepth(projectForm(form, SIZE, cam), intensity);
  const maskId = `floor-mask-${id}`;
  const gradId = `floor-grad-${id}`;

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={cn("block size-full", className)} aria-hidden="true" focusable="false">
      {floor ? (
        <>
          <defs>
            <radialGradient id={gradId} cx="50%" cy="62%" r="46%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={maskId}>
              <rect width={SIZE} height={SIZE} fill={`url(#${gradId})`} />
            </mask>
          </defs>
          <path
            d={toPath(projectFloor(SIZE, cam))}
            mask={`url(#${maskId})`}
            stroke="#35cdbd"
            strokeOpacity="0.14"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : null}
      <g stroke="#35cdbd" strokeWidth="1" strokeLinecap="round" fill="none">
        {groups.map((group, i) => (
          <path
            key={i}
            d={group.d}
            strokeOpacity={group.opacity}
            vectorEffect="non-scaling-stroke"
            pathLength={animate ? 1 : undefined}
            className={animate ? "art-line" : undefined}
            style={animate ? ({ "--i": i * 6 } as React.CSSProperties) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
