"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  DEFAULT_CAMERA,
  depthAlpha,
  FLOOR_Y,
  FORM_NAMES,
  getForms,
  heightRanks,
  morphFrame,
  project,
  SCALE_FACTOR,
  SEGMENT_COUNT,
  type Camera,
  type SegmentBuffer,
} from "@/lib/scene/geometry";

const HOLD = 6.5;
const MORPH = 3.4;
const YAW_SPEED = 0.085;
const BUCKETS = 16;
const LINE_RGB = "53, 205, 189";
const INTENSITY = 0.9;

/**
 * Composizione 3D animata su canvas 2D (nessuna dipendenza WebGL).
 * Il primo fotogramma coincide con l'SVG statico ricevuto come `children`,
 * che resta visibile senza JavaScript o con `prefers-reduced-motion`.
 */
export function HeroScene({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const forms = getForms();
    const ranks = Object.fromEntries(FORM_NAMES.map((name) => [name, heightRanks(forms[name])])) as Record<
      (typeof FORM_NAMES)[number],
      Float32Array
    >;
    const buffer: SegmentBuffer = Array.from({ length: SEGMENT_COUNT }, () => [0, 0, 0, 0, 0, 0]);
    const cam: Camera = { ...DEFAULT_CAMERA };
    const pa: [number, number, number] = [0, 0, 0];
    const pb: [number, number, number] = [0, 0, 0];
    const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);
    const pulses = Array.from({ length: 5 }, (_, i) => ({ seg: (i * 19) % SEGMENT_COUNT, t: i / 5, speed: 0.35 + i * 0.06 }));
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const minFrameMs = coarse || window.innerWidth < 768 ? 32 : 0;

    let width = 0;
    let height = 0;
    let scale = 0;
    let elapsed = 0;
    let last = 0;
    let lastDraw = 0;
    let raf = 0;
    let visible = true;
    let started = false;
    const pointer = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(width, height) * SCALE_FACTOR;
      if (!raf) draw(elapsed);
    };

    const strokeBuckets = (alphaScale: number) => {
      for (let b = 0; b < BUCKETS; b++) {
        const list = buckets[b];
        if (list.length === 0) continue;
        ctx.beginPath();
        for (let i = 0; i < list.length; i += 4) {
          ctx.moveTo(list[i], list[i + 1]);
          ctx.lineTo(list[i + 2], list[i + 3]);
        }
        ctx.strokeStyle = `rgba(${LINE_RGB}, ${((b + 0.5) / BUCKETS) * alphaScale})`;
        ctx.stroke();
        list.length = 0;
      }
    };

    const draw = (t: number) => {
      const cx = width / 2;
      const cy = height / 2;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      const cycle = HOLD + MORPH;
      const k = Math.floor(t / cycle);
      const local = t - k * cycle;
      const fromName = FORM_NAMES[k % FORM_NAMES.length];
      const toName = FORM_NAMES[(k + 1) % FORM_NAMES.length];
      const progress = local < HOLD ? 0 : (local - HOLD) / MORPH;
      morphFrame(forms[fromName], forms[toName], ranks[fromName], ranks[toName], progress, buffer);

      pointer.yaw += (pointer.targetYaw - pointer.yaw) * 0.04;
      pointer.pitch += (pointer.targetPitch - pointer.pitch) * 0.04;
      cam.yaw = DEFAULT_CAMERA.yaw + t * YAW_SPEED + pointer.yaw;
      cam.pitch = DEFAULT_CAMERA.pitch + pointer.pitch;

      // Piano di appoggio: griglia con dissolvenza radiale.
      const extent = 5;
      const steps = 10;
      for (let g = -extent; g <= extent; g++) {
        for (let s = 0; s < steps; s++) {
          const u0 = -extent + (2 * extent * s) / steps;
          const u1 = -extent + (2 * extent * (s + 1)) / steps;
          for (const axis of [0, 1]) {
            const x0 = axis === 0 ? g : u0;
            const z0 = axis === 0 ? u0 : g;
            const x1 = axis === 0 ? g : u1;
            const z1 = axis === 0 ? u1 : g;
            const dist = Math.hypot((x0 + x1) / 2, (z0 + z1) / 2) / (extent * 0.92);
            const fade = Math.max(0, 1 - dist);
            if (fade <= 0.02) continue;
            project(x0, FLOOR_Y, z0, cam, scale, cx, cy, pa);
            project(x1, FLOOR_Y, z1, cam, scale, cx, cy, pb);
            const bucket = Math.min(BUCKETS - 1, Math.floor(fade * BUCKETS));
            buckets[bucket].push(pa[0], pa[1], pb[0], pb[1]);
          }
        }
      }
      strokeBuckets(0.14);

      // Forma principale.
      ctx.fillStyle = `rgba(${LINE_RGB}, 0.55)`;
      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const s = buffer[i];
        if (s[0] === s[3] && s[1] === s[4] && s[2] === s[5]) continue;
        project(s[0], s[1], s[2], cam, scale, cx, cy, pa);
        project(s[3], s[4], s[5], cam, scale, cx, cy, pb);
        const alpha = depthAlpha((pa[2] + pb[2]) / 2);
        const bucket = Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS));
        buckets[bucket].push(pa[0], pa[1], pb[0], pb[1]);
        ctx.fillRect(pa[0] - 1, pa[1] - 1, 2, 2);
      }
      strokeBuckets(INTENSITY);

      // Impulsi luminosi che percorrono le linee.
      for (const pulse of pulses) {
        const s = buffer[pulse.seg];
        if (s[0] === s[3] && s[1] === s[4] && s[2] === s[5]) {
          pulse.seg = (pulse.seg + 7) % SEGMENT_COUNT;
          continue;
        }
        const x = s[0] + (s[3] - s[0]) * pulse.t;
        const y = s[1] + (s[4] - s[1]) * pulse.t;
        const z = s[2] + (s[5] - s[2]) * pulse.t;
        project(x, y, z, cam, scale, cx, cy, pa);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${LINE_RGB}, 0.14)`;
        ctx.arc(pa[0], pa[1], 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(181, 239, 232, 0.95)";
        ctx.arc(pa[0], pa[1], 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (minFrameMs && now - lastDraw < minFrameMs) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      lastDraw = now;
      elapsed += dt;
      for (const pulse of pulses) {
        pulse.t += dt * pulse.speed;
        if (pulse.t >= 1) {
          pulse.t = 0;
          pulse.seg = (pulse.seg + 13) % SEGMENT_COUNT;
        }
      }
      draw(elapsed);
    };

    const play = () => {
      if (!started || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.targetYaw = (event.clientX / window.innerWidth - 0.5) * 0.35;
      pointer.targetPitch = (event.clientY / window.innerHeight - 0.5) * 0.1;
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(wrap);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    // Il canvas subentra all'SVG statico dopo l'animazione di ingresso,
    // a pagina caricata e con il thread principale libero.
    let handoff = 0;
    let idle = 0;
    const begin = () => {
      started = true;
      draw(0);
      setLive(true);
      play();
    };
    const schedule = () => {
      const wait = Math.max(0, 2600 - performance.now());
      handoff = window.setTimeout(() => {
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(begin, { timeout: 1500 });
        else begin();
      }, wait);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.clearTimeout(handoff);
      if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      window.removeEventListener("load", schedule);
      pause();
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="group/scene relative size-full" data-live={live ? "" : undefined}>
      <div className="absolute inset-0 transition-opacity duration-1000 group-data-[live]/scene:opacity-0">{children}</div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-1000 group-data-[live]/scene:opacity-100"
      />
    </div>
  );
}
