export function initializeGenome(root: HTMLElement) {
  const canvas = root.querySelector("canvas")!;
  const context = canvas.getContext("2d");
  if (!context) return;
  const stage = root.querySelector<HTMLElement>(".dna-stage")!;
  const controls = root.querySelector<HTMLElement>(".dna-controls")!;
  const play = root.querySelector<HTMLButtonElement>(".dna-play")!;
  const rotation = root.querySelector<HTMLInputElement>("input")!;
  const features = [...root.querySelectorAll<HTMLDetailsElement>(".dna-feature")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduced.matches;
  let visible = false;
  let angle = 35 * Math.PI / 180;
  let width = 0;
  let height = 0;
  let active = 0;
  let frame = 0;
  let previousTime = 0;
  let drag: { id: number; start: number; angle: number } | undefined;
  let endpoints: { x: number; y: number }[] = [];
  const noise = (seed: number) => Math.sin(seed * 127.1 + 311.7) * 0.5 + 0.5;
  const point = (position: number, strand: number, offset = 0) => {
    const phase = position * Math.PI * 5 + angle + strand * Math.PI;
    const depth = Math.cos(phase);
    const radius = Math.min(width * 0.15, 132) + offset;
    return { x: width / 2 + Math.sin(phase) * radius, y: 36 + position * (height - 72), depth };
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    for (let index = 0; index < 100; index++) {
      context.fillStyle = `rgba(224,183,137,${0.08 + noise(index + 15) * 0.22})`;
      context.beginPath();
      context.arc(noise(index) * width, noise(index + 8) * height, 0.7, 0, Math.PI * 2);
      context.fill();
    }
    for (let rung = 0; rung <= 48; rung++) {
      const start = point(rung / 48, 0);
      const end = point(rung / 48, 1);
      context.strokeStyle = "rgba(211,163,112,0.15)";
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
      for (let bead = 0; bead <= 12; bead++) {
        const fraction = bead / 12;
        context.fillStyle = `rgba(243,204,158,${0.25 + (start.depth * (1 - fraction) + end.depth * fraction + 1) * 0.2})`;
        context.beginPath();
        context.arc(start.x + (end.x - start.x) * fraction, start.y, 1.2, 0, Math.PI * 2);
        context.fill();
      }
    }
    for (let strand = 0; strand < 2; strand++) {
      for (let index = 0; index <= 620; index++) {
        const position = index / 620;
        const particle = point(position, strand, (noise(index + strand * 91) - 0.5) * 16);
        const brightness = (particle.depth + 1) / 2;
        const selected = Math.abs(position - (0.11 + Math.floor(active / 2) * 0.34)) < 0.055;
        context.fillStyle = selected ? `rgba(255,224,180,${0.45 + brightness * 0.55})` : `rgba(231,166,103,${0.2 + brightness * 0.75})`;
        context.beginPath();
        context.arc(particle.x, particle.y, 0.6 + brightness * 1.35 + noise(index + 5), 0, Math.PI * 2);
        context.fill();
      }
    }
    features.forEach((_, index) => {
      const node = point(0.11 + Math.floor(index / 2) * 0.34, index % 2);
      if (matchMedia("(min-width: 801px)").matches && endpoints[index]) {
        const end = endpoints[index];
        context.strokeStyle = index === active ? "#dfb182" : "#4a5143";
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo((node.x + end.x) / 2, node.y);
        context.lineTo(end.x, end.y);
        context.stroke();
      }
      context.fillStyle = index === active ? "#ffe4ba" : "#e9ae79";
      context.beginPath();
      context.arc(node.x, node.y, index === active ? 5 : 3, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = index === active ? "#e9ae79" : "#60523c";
      context.beginPath();
      context.arc(node.x, node.y, index === active ? 12 : 8, 0, Math.PI * 2);
      context.stroke();
    });
    canvas.dataset.rotation = String(Math.round(angle * 180 / Math.PI));
  };
  const sync = () => {
    play.textContent = paused ? "Play animation" : "Pause animation";
    play.setAttribute("aria-pressed", String(!paused));
    rotation.value = String(Math.round(angle * 180 / Math.PI) % 360);
  };
  const tick = (time: number) => {
    frame = 0;
    if (paused || !visible || document.hidden || drag) return;
    if (time - previousTime >= 32) {
      angle = (angle + Math.min(time - previousTime, 64) * 0.00012) % (Math.PI * 2);
      previousTime = time;
      draw();
      sync();
    }
    frame = requestAnimationFrame(tick);
  };
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (!paused && visible && !document.hidden && !drag) {
      previousTime = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };
  const resize = () => {
    const bounds = stage.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    endpoints = features.map((feature, index) => {
      const target = feature.querySelector("summary")!.getBoundingClientRect();
      return { x: (index % 2 === 0 ? target.right : target.left) - bounds.left, y: target.top - bounds.top + 1 };
    });
    draw();
  };
  features.forEach((feature, index) => {
    const select = () => { active = index; draw(); };
    feature.addEventListener("pointerenter", select);
    feature.addEventListener("focusin", select);
    feature.addEventListener("toggle", () => { if (feature.open) select(); });
  });
  play.addEventListener("click", () => { paused = !paused; sync(); schedule(); });
  rotation.addEventListener("input", () => {
    paused = true;
    angle = Number(rotation.value) * Math.PI / 180;
    sync();
    schedule();
    draw();
  });
  canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    drag = { id: event.pointerId, start: event.clientX, angle };
    canvas.setPointerCapture(event.pointerId);
    paused = true;
    sync();
    schedule();
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    angle = ((drag.angle + (event.clientX - drag.start) * 0.012) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    sync();
    draw();
  });
  const release = () => { drag = undefined; schedule(); };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("lostpointercapture", release);
  reduced.addEventListener("change", () => { paused = reduced.matches; sync(); schedule(); });
  document.addEventListener("visibilitychange", schedule);
  new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; schedule(); }).observe(stage);
  new ResizeObserver(resize).observe(stage);
  resize();
  sync();
  controls.hidden = false;
  root.dataset.ready = "true";
}
