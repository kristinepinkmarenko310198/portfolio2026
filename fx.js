// Shared front-end interactions for the portfolio pages.
// Lime blend cursor, magnetic buttons, scroll reveals, scroll-lit headings,
// live clocks and copy-to-clipboard. Call window.PortfolioFX.init() from a DC's componentDidMount.
(function () {
  let started = false;

  function init() {
    if (started) return;
    started = true;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Simple dissolve: dark overlay fades in over the page, then we navigate.
    // On arrival the overlay starts visible and fades out, giving a smooth dark dissolve.
    {
      // Prefetch same-origin pages
      const prefetched = new Set();
      const prefetch = (url) => {
        if (prefetched.has(url)) return;
        prefetched.add(url);
        const l = document.createElement("link");
        l.rel = "prefetch"; l.as = "document"; l.href = url;
        document.head.appendChild(l);
      };
      const warmCache = () => {
        document.querySelectorAll('a[href]').forEach((a) => {
          let u; try { u = new URL(a.href, location.href); } catch (_) { return; }
          if (u.origin !== location.origin) return;
          if (!/\.(dc\.html|html)$/i.test(u.pathname)) return;
          if (u.pathname === location.pathname) return;
          prefetch(a.href);
        });
      };
      if ("requestIdleCallback" in window) requestIdleCallback(warmCache, { timeout: 2000 });
      else setTimeout(warmCache, 600);

      // Create the transition overlay (matches page background)
      const ov = document.createElement("div");
      ov.style.cssText = "position:fixed;inset:0;background:#0F1111;z-index:99998;pointer-events:none;opacity:0;transition:opacity .22s ease";
      document.body.appendChild(ov);

      // Fade in on arrival: if we came from a transition, overlay starts solid and dissolves away
      if (sessionStorage.getItem("_nav")) {
        sessionStorage.removeItem("_nav");
        ov.style.transition = "none";
        ov.style.opacity = "1";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ov.style.transition = "opacity .3s ease";
            ov.style.opacity = "0";
          });
        });
      }

      // Intercept internal link clicks
      document.addEventListener("click", (e) => {
        const a = e.target.closest("a[href]");
        if (!a || a.target === "_blank") return;
        const raw = a.getAttribute("href");
        if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;
        let u; try { u = new URL(a.href, location.href); } catch (_) { return; }
        if (u.origin !== location.origin) return;
        if (!/\.(dc\.html|html)$/i.test(u.pathname)) return;
        if (u.pathname === location.pathname && !u.hash) return;
        if (u.pathname === location.pathname) return; // same page hash

        e.preventDefault();
        const target = a.href;
        sessionStorage.setItem("_nav", "1");

        // Dissolve out, then navigate
        ov.style.transition = "opacity .22s ease";
        ov.style.opacity = "1";
        setTimeout(() => { window.location.href = target; }, 240);
      });
    }

    // Nav stays see-through at the top of the page and gets its dark backing once you scroll.
    const navEl = document.querySelector(".nav");
    if (navEl) { const ns = () => navEl.classList.toggle("scrolled", window.scrollY > 40); window.addEventListener("scroll", ns, { passive: true }); ns(); }
    // Keep the prototype preview video looping even if the browser drops the loop attribute mid-session.
    const bindLoops = () => {
      document.querySelectorAll(".proto-poster video, video[loop]").forEach((v) => {
        if (v.dataset.loopBound) return;
        v.dataset.loopBound = "1";
        v.loop = true;
        v.addEventListener("ended", () => { try { v.currentTime = 0; v.play(); } catch (e) {} });
      });
    };
    bindLoops();
    new MutationObserver(bindLoops).observe(document.body, { childList: true, subtree: true });
    // Mobile: burger button that opens a full-screen menu with the same links.
    const inner = navEl && navEl.querySelector(".nav-inner"), links = navEl && navEl.querySelector(".nav-links");
    if (inner && links && !inner.querySelector(".burger")) {
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "burger"; btn.setAttribute("aria-label", "Open menu"); btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = "<span></span><span></span>";
      const menu = document.createElement("div");
      menu.className = "mnav"; menu.id = "mnav"; btn.setAttribute("aria-controls", "mnav");
      const items = [...links.querySelectorAll("a")].map((a) => ({ href: a.getAttribute("href"), text: a.textContent.trim(), cur: a.classList.contains("active") || a.getAttribute("aria-current") === "page" }));
      const cta = navEl.querySelector(".nav-cta");
      if (cta) items.push({ href: cta.getAttribute("href"), text: "Let's talk" });
      items.forEach((it) => { const l = document.createElement("a"); l.href = it.href; l.textContent = it.text; if (it.cur) l.setAttribute("aria-current", "page"); menu.appendChild(l); });
      const foot = document.createElement("p"); foot.className = "mnav-foot"; foot.textContent = "Kristina Ponomarenko · UX/UI Lead · Linz, Austria"; menu.appendChild(foot);
      inner.appendChild(btn); navEl.appendChild(menu);
      const set = (open) => { navEl.classList.toggle("menu-open", open); btn.setAttribute("aria-expanded", String(open)); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); document.documentElement.style.overflow = open ? "hidden" : ""; };
      btn.addEventListener("click", () => set(!navEl.classList.contains("menu-open")));
      menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && navEl.classList.contains("menu-open")) { set(false); btn.focus(); } });
      window.addEventListener("resize", () => { if (window.innerWidth > 760) set(false); });
    }

    /* ---------- custom cursor ---------- */
    if (fine) {
      const dot = document.createElement("div");
      dot.setAttribute("data-fx-cursor", "");
      dot.setAttribute("aria-hidden", "true");
      dot.style.cssText =
        "position:fixed;left:0;top:0;width:10px;height:10px;border-radius:50%;background:#C6F24E;" +
        "pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;" +
        "transition:width .3s cubic-bezier(.22,1,.36,1),height .3s cubic-bezier(.22,1,.36,1);will-change:left,top";
      document.body.appendChild(dot);
      const label = document.createElement("span");
      label.style.cssText =
        "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;" +
        "font:600 11px/1 'Instrument Sans',sans-serif;color:#0F1111;opacity:0;transition:opacity .2s;white-space:nowrap;text-transform:uppercase;letter-spacing:.1em";
      dot.appendChild(label);

      let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
      window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
      const loop = () => {
        cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
        dot.style.left = cx + "px"; dot.style.top = cy + "px";
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      const grow = (txt) => {
        dot.style.width = txt ? "78px" : "38px";
        dot.style.height = txt ? "78px" : "38px";
        dot.style.mixBlendMode = txt ? "normal" : "difference";
        label.textContent = txt || "";
        label.style.opacity = txt ? "1" : "0";
      };
      const reset = () => {
        dot.style.width = "10px"; dot.style.height = "10px";
        dot.style.mixBlendMode = "difference";
        label.style.opacity = "0"; label.textContent = "";
      };
      const bind = () => {
        document.querySelectorAll("[data-cursor]").forEach((el) => {
          if (el._fxBound) return; el._fxBound = true;
          el.addEventListener("mouseenter", () => grow(el.getAttribute("data-cursor") || ""));
          el.addEventListener("mouseleave", reset);
        });
        document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
          if (el._fxHover || el.hasAttribute("data-cursor")) return; el._fxHover = true;
          el.addEventListener("mouseenter", () => grow(""));
          el.addEventListener("mouseleave", reset);
        });
      };
      bind();
      window.PortfolioFX._rebind = bind;
    }

    /* ---------- magnetic ---------- */
    if (fine && motion) {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        if (el._mag) return; el._mag = true;
        const strength = parseFloat(el.getAttribute("data-magnetic")) || 0.3;
        let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
        const tick = () => {
          cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
          el.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
          raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(tick) : null;
        };
        const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          tx = (e.clientX - (r.left + r.width / 2)) * strength;
          ty = (e.clientY - (r.top + r.height / 2)) * strength;
          start();
        });
        el.addEventListener("mouseleave", () => { tx = 0; ty = 0; start(); });
      });
    }

    /* ---------- scroll reveals ---------- */
    if (motion) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const d = e.target.getAttribute("data-reveal-delay");
          e.target.style.transitionDelay = d ? d + "ms" : "0ms";
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      // one orchestrated entrance: only the page header animates in; the rest of the
      // page is already visible and lets the scroll-lit headings carry the motion
      document.querySelectorAll("header [data-reveal]").forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1)";
        io.observe(el);
      });
    }

    /* ---------- scroll-lit headings ---------- */
    const lits = Array.from(document.querySelectorAll(".lit"));
    if (lits.length) {
      if (!motion) {
        lits.forEach((el) => el.style.setProperty("--p", "120%"));
      } else {
        let ticking = false;
        const paint = () => {
          ticking = false;
          const vh = window.innerHeight;
          lits.forEach((el) => {
            const r = el.getBoundingClientRect();
            const p = Math.max(0, Math.min(1, (vh * 0.88 - r.top) / (r.height + vh * 0.32)));
            el.style.setProperty("--p", (p * 140 - 14).toFixed(1) + "%");
          });
        };
        const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        paint();
      }
    }

    /* ---------- clocks ---------- */
    const fmt = (opts) => new Date().toLocaleTimeString("en-GB", opts);
    const tick = () => {
      const hm = fmt({ hour: "2-digit", minute: "2-digit", timeZone: "Europe/Vienna" });
      const hms = fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Vienna" });
      const local = fmt({ hour: "2-digit", minute: "2-digit" });
      document.querySelectorAll("[data-clock]").forEach((c) => (c.textContent = hm));
      document.querySelectorAll("[data-clock-s]").forEach((c) => (c.textContent = hms));
      document.querySelectorAll("[data-clock-local]").forEach((c) => (c.textContent = local));
    };
    tick();
    setInterval(tick, 1000);

    /* ---------- copy to clipboard ---------- */
    document.addEventListener("click", (e) => {
      const btn = e.target.closest && e.target.closest("[data-copy]");
      if (!btn) return;
      const val = btn.getAttribute("data-copy");
      const done = () => {
        btn.setAttribute("data-copied", "");
        clearTimeout(btn._t);
        btn._t = setTimeout(() => btn.removeAttribute("data-copied"), 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done, () => { window.location.href = "mailto:" + val; });
      } else {
        window.location.href = "mailto:" + val;
      }
    });

    /* ---------- flowing mesh gradient (hero) ---------- */
    document.querySelectorAll(".glow.vivid").forEach((el) => meshGradient(el, motion));
  }

  /* Liquid hero (WebGL): a slowly travelling wave field, normalised by its own
     gradient so the colour bands keep an even width, then ramped
     background → deep green → olive-lime → pale highlight, with film grain. */
  const LIQUID_FS = [
    "precision highp float;",
    "varying vec2 uv;",
    "uniform float uT, uAr, uA, uIn; uniform vec2 uPtr;",
    "uniform vec3 cBg, cDeep, cMid, cLime, cHi;",
    // soft diagonal light streaks, like light through ribbed glass
    "float band(float y, float f, float ph, float sh){ return pow(0.5 + 0.5 * sin(y * f + ph), sh); }",
    "void main(){",
    "  vec2 p = vec2((uv.x - 0.5) * uAr, uv.y - 0.5) + uPtr * 0.025;",
    "  float a = uA;",
    "  float an = 0.52;",
    "  vec2 q = vec2(cos(an) * p.x - sin(an) * p.y, sin(an) * p.x + cos(an) * p.y);",
    "  float w = 0.35 * sin(q.x * 1.3 + a * 0.6) + 0.18 * sin(q.x * 2.7 - a * 0.9);",
    "  float y = q.y + w * 0.12;",
    "  float s1 = band(y, 21.0, a * 1.10, 2.6);",
    "  float s2 = band(y, 33.0, -a * 0.80 + 1.7, 4.0);",
    "  float s3 = band(y, 12.0, a * 0.55 + 3.1, 1.6);",
    "  float s4 = band(y, 51.0, a * 1.40 + 0.6, 7.0);",
    "  float along = 0.65 + 0.35 * sin(q.x * 1.6 + a * 0.7 + y * 3.0);",
    // light comes from the top right and fades toward the bottom left
    "  float m = smoothstep(0.05, 0.85, uv.y * 0.85 + uv.x * 0.3 - 0.05);",
    "  m = m * (0.8 + 0.2 * sin(q.x * 0.9 - a * 0.4));",
    "  vec3 col = cBg;",
    "  col = mix(col, cDeep, clamp(s3 * m * 1.25, 0.0, 1.0));",
    "  col = mix(col, cMid, clamp(s1 * m * along * 1.2, 0.0, 1.0) * 0.95);",
    "  col = mix(col, cLime, clamp(s2 * m * along * 1.1, 0.0, 1.0) * 0.8);",
    "  col = mix(col, cHi, clamp((s4 * 0.6 + s1 * s2) * m * m, 0.0, 1.0) * 0.55);",
    "  col = mix(cBg, col, uIn);",
    "  float n = fract(sin(dot(gl_FragCoord.xy + fract(uT * 0.37) * vec2(113.1, 71.7), vec2(12.9898, 78.233))) * 43758.5453);",
    "  col += (n - 0.5) * 0.016;",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  // Paper Shaders "Mesh Gradient" (github.com/paper-design/shaders, Apache-2.0, pinned 0.0.82):
  // soft olive, khaki and forest greens with a fine grain.
  function paperPanels(host, motion) {
    try {
      const P = window.PaperShaders, c = P.getShaderColorFromString;
      const el = document.createElement("div");
      el.className = "mesh liquid paper";
      el.setAttribute("aria-hidden", "true");
      host.insertBefore(el, host.firstChild);
      const colors = ["#C9CF86", "#0A0C0B", "#8FA94A", "#3F6E28", "#050606", "#B3C064", "#16261A"];
      new P.ShaderMount(el, P.meshGradientFragmentShader, {
        u_colors: colors.map(c), u_colorsCount: colors.length,
        u_distortion: 0.5, u_swirl: 0.05, u_grainMixer: 0, u_grainOverlay: 0.05,
        u_fit: P.ShaderFitOptions.cover, u_scale: 0.8, u_rotation: 0,
        u_offsetX: 0, u_offsetY: 0, u_originX: 0.5, u_originY: 0.5, u_worldWidth: 0, u_worldHeight: 0
      }, undefined, motion ? 0.6 : 0, Math.random() * 20000, 2);
      host._mesh = true;
      host.classList.add("has-mesh");
      if (motion) {
        const par = () => { el.style.transform = "translate3d(0," + (window.scrollY * 0.3).toFixed(1) + "px,0)"; };
        window.addEventListener("scroll", par, { passive: true }); par();
      }
      return true;
    } catch (e) { return false; }
  }

  function meshGradient(host, motion) {
    if (host._mesh) return;
    if (window.PaperShaders && paperPanels(host, motion)) return;
    const cv = document.createElement("canvas");
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return mesh2D(host, motion);
    host._mesh = true;
    cv.setAttribute("aria-hidden", "true");
    cv.className = "mesh liquid";
    host.insertBefore(cv, host.firstChild);
    host.classList.add("has-mesh");

    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, "attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, LIQUID_FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.remove(); host.classList.remove("has-mesh"); host._mesh = false; return mesh2D(host, motion); }
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    const uT = U("uT"), uAr = U("uAr"), uA = U("uA"), uIn = U("uIn"), uPtr = U("uPtr");
    const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i + 1, i + 3), 16) / 255);
    gl.uniform3fv(U("cBg"), rgb("#0A0F0D"));
    gl.uniform3fv(U("cDeep"), rgb("#0D4A33"));
    gl.uniform3fv(U("cMid"), rgb("#1E9466"));
    gl.uniform3fv(U("cLime"), rgb("#9BD24E"));
    gl.uniform3fv(U("cHi"), rgb("#E2F8B8"));

    const size = () => {
      const r = host.getBoundingClientRect();
      // full resolution (up to 1.5x on retina), capped at ~2.4M pixels so it stays smooth
      let k = Math.min(1.5, window.devicePixelRatio || 1);
      const cap = 2400000 / Math.max(1, r.width * r.height);
      if (k * k > cap) k = Math.sqrt(cap);
      const w = Math.max(2, Math.round(r.width * k)), h = Math.max(2, Math.round(r.height * k));
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform1f(uAr, r.width / Math.max(1, r.height));
    };
    size();
    window.addEventListener("resize", size, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(() => size()).observe(host);

    let px = 0, py = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", (e) => { tx = (e.clientX / window.innerWidth) * 2 - 1; ty = -((e.clientY / window.innerHeight) * 2 - 1); }, { passive: true });

    const t0 = performance.now(), phase = Math.random() * 40;
    let visible = true, raf = 0, intro = 1;
    const frame = (now) => {
      const t = (now - t0) / 1000;
      intro = Math.min(1, intro + 0.012);
      px += (tx - px) * 0.04; py += (ty - py) * 0.04;
      gl.uniform1f(uT, t);
      gl.uniform1f(uA, phase + t * 0.16);
      gl.uniform1f(uIn, 1 - Math.pow(1 - intro, 3));
      gl.uniform2f(uPtr, px, py);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      cv.style.transform = "translate3d(0," + (window.scrollY * 0.3).toFixed(1) + "px,0)";
      raf = (visible && motion) ? requestAnimationFrame(frame) : 0;
    };
    cv.style.opacity = "1";
    frame(performance.now());
    if (!motion) return;
    const wake = () => { if (visible && !raf) raf = requestAnimationFrame(frame); };
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; wake(); }).observe(host);
    document.addEventListener("visibilitychange", () => { visible = !document.hidden; wake(); });
  }

  // Fallback without WebGL: soft colour fields drawn on a small 2D canvas and blurred up.
  function mesh2D(host, motion) {
    if (host._mesh) return; host._mesh = true;
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.className = "mesh";
    const W = 192, H = 108;
    cv.width = W; cv.height = H;
    host.insertBefore(cv, host.firstChild);
    host.classList.add("has-mesh");
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    // colour, base position (0-1), drift radius, speed, size, strength
    const blobs = [
      { c: [127, 164, 68],  x: .22, y: .78, ax: .30, ay: .22, s: .11, r: .62, a: .95, p: 0.0 },  // olive
      { c: [198, 242, 78],  x: .55, y: .70, ax: .28, ay: .20, s: .15, r: .38, a: .55, p: 1.7 },  // lime
      { c: [26, 104, 74],   x: .82, y: .25, ax: .25, ay: .28, s: .09, r: .58, a: .90, p: 3.1 },  // emerald
      { c: [12, 72, 78],    x: .15, y: .20, ax: .22, ay: .25, s: .07, r: .55, a: .85, p: 4.4 },  // deep teal
      { c: [169, 207, 87],  x: .70, y: .95, ax: .32, ay: .18, s: .13, r: .45, a: .60, p: 2.3 },  // light green
      { c: [58, 96, 34],    x: .45, y: .40, ax: .35, ay: .30, s: .10, r: .50, a: .70, p: 5.2 },  // forest
      { c: [34, 140, 120],  x: .95, y: .65, ax: .20, ay: .25, s: .12, r: .40, a: .45, p: 0.9 },  // sea green
    ];

    let t = Math.random() * 100, last = performance.now(), visible = true, raf = 0;
    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0F1111";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const D = Math.max(W, H);
      for (const b of blobs) {
        const k = t * b.s + b.p;
        const x = (b.x + Math.sin(k) * b.ax + Math.sin(k * 0.53 + 1.3) * b.ax * 0.4) * W;
        const y = (b.y + Math.cos(k * 0.81) * b.ay + Math.sin(k * 0.37 + 2.1) * b.ay * 0.4) * H;
        const r = b.r * D * (0.85 + 0.15 * Math.sin(k * 1.7));
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [R, G, B] = b.c;
        g.addColorStop(0, "rgba(" + R + "," + G + "," + B + "," + b.a + ")");
        g.addColorStop(0.45, "rgba(" + R + "," + G + "," + B + "," + (b.a * 0.45) + ")");
        g.addColorStop(1, "rgba(" + R + "," + G + "," + B + ",0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    };
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      t += dt * 1.6;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    draw();
    if (!motion) return;
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    io.observe(host);
    document.addEventListener("visibilitychange", () => {
      visible = !document.hidden;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    raf = requestAnimationFrame(loop);
  }

  window.PortfolioFX = { init };
})();
