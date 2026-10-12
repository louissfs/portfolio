








import { useEffect, useRef, useState } from "react";

// ---------- EDIT YOUR CONTENT HERE ----------
const NAME = "LOUIS";
const CITY = "NICE, FRANCE";
const HOURS = "OPEN (24/7)";
const HERO_VIDEO = "/hero.mp4"; // video file in the /public folder
const PIXEL_SIZE = 160; // hero video pixel width: smaller = bigger pixels
const EMAIL = "affolouis0@gmail.com";
const GAME_DELAY = 12000; // ms to wait after loading before the game popup shows (12 seconds)
const NAV = ["Home", "Work", "About", "News", "Contact"];
const PROJECTS = [
  { title: "Project One", img: "/image1.png", url: "https://your-first-site.com", role: "Developer & Designer", stack: "React · CSS", year: "2026", color: "#2f6f4e", rgb: "255,255,255", fg: "#000" },
  { title: "Project Two / Hero", img: "/image2.png", url: "https://your-second-site.com", role: "Developer", stack: "React · Motion", year: "2026", color: "#2b2bd9", rgb: "255,255,255", fg: "#000" },
  { title: "Project Three", img: "/image3.png", url: "https://your-third-site.com", role: "Designer", stack: "Figma · JavaScript", year: "2026", color: "#e0a21b", rgb: "0,0,0", fg: "#fff" },
];
const ABOUT_IMAGES = ["/about1.png", "/about2.png", "/about3.png"]; // files in /public
const ABOUT = "I'm Louis, a 19-year-old web developer and designer from Nice. I build bold, animated websites and small apps for people and brands who want to stand out.";
const SKILLS = ["React", "JavaScript", "Python", "GSAP", "CSS", "Web design", "Motion"];
const TOOLS = ["VS Code", "Firebase", "Supabase", "Vercel", "GitHub"];
const NEWS = ["My new portfolio is live", "Learning scroll animation in React"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Pixelify+Sans:wght@400..700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Pixelify Sans',monospace;-webkit-font-smoothing:none;background:#000;color:#e4e6eb}
a{color:inherit;text-decoration:none;cursor:pointer}
.red{--r:#ff2a14}
.loader{position:fixed;inset:0;z-index:90;background:#da250d;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4vh;transition:opacity .9s ease .2s}
.lbar{width:min(60vw,700px);height:14px;background:#0003}
.lbar i{display:block;height:100%;background:#e4e6eb;transform-origin:left}
.loader.done{opacity:0}
.count{text-align:center;font-family:'Press Start 2P',monospace;font-size:clamp(40px,11vw,150px);line-height:1;color:#e4e6eb;image-rendering:pixelated;-webkit-font-smoothing:none}
.top{position:fixed;top:0;left:0;right:0;z-index:95;display:flex;justify-content:space-between;padding:8px 12px;font-size:13px;color:#fff;mix-blend-mode:difference}
.top .logo{font-family:'Press Start 2P',monospace;font-size:14px;line-height:1;width:25%}
.top .m{width:15%}
.top nav{font-size:18px;letter-spacing:0;margin-left:auto}
.top nav a:hover{color:#ff2a14}
.hero{position:sticky;top:0;height:100vh;overflow:hidden;z-index:1;transform-origin:50% 0}
.hero .bg,.hero video,.hero canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:filter .1s}
.hero .bg{background:radial-gradient(circle at 65% 35%,#f4b13a 0,#2d4a7a 30%,#101428 65%)}
.hero .tint{position:absolute;inset:0;background:#e0170a;mix-blend-mode:multiply}
.reg{position:absolute;right:20px;bottom:calc(25vw + 16px);width:56px;height:56px;border:4px solid #e4e6eb;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:30px}
.big{position:absolute;left:18px;right:18px;bottom:18px;font-family:'Press Start 2P',monospace;line-height:1.15;white-space:nowrap;color:#e4e6eb;text-align:center;transform-origin:0 100%;will-change:transform;transition:opacity 1.2s ease;image-rendering:pixelated;-webkit-font-smoothing:none;text-rendering:optimizeSpeed}
.big .ch:hover{opacity:.25}
.big .strike{position:absolute;left:0;right:0;top:calc(50% - .07em);height:.14em;background:#e4e6eb;transform:scaleX(0);transform-origin:left;cursor:pointer}
.big .strike::before{content:"";position:absolute;left:0;right:0;top:-.2em;bottom:-.2em}
.big:has(.strike:hover) .ch{opacity:.25}
.big .ch{display:inline-block;transition:opacity .9s ease}
.big:not(.go) .ch{opacity:0}
.big.go .ch{animation:drop 1.2s backwards;animation-delay:calc(var(--i) * 120ms + 300ms)}
.big.go .strike{animation:strike .7s steps(10) 1.3s both}
@keyframes drop{0%{transform:translateY(-110vh);opacity:0;animation-timing-function:cubic-bezier(.55,0,1,.45)}50%{transform:translateY(0);opacity:1;animation-timing-function:ease-out}65%{transform:translateY(-7vh);animation-timing-function:ease-in}80%{transform:translateY(0);animation-timing-function:ease-out}90%{transform:translateY(-2vh);animation-timing-function:ease-in}100%{transform:translateY(0);opacity:1}}
@keyframes strike{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.sheet{position:relative;z-index:2;background:#f7f7f7;color:#000}
.pad{padding:0 18px}
.h1{font-size:clamp(70px,15vw,230px);letter-spacing:0;font-weight:500;line-height:.95;transform-origin:left bottom}
.links{display:flex;gap:30px;font-size:22px;font-weight:500;margin:10px 0 70px}
.links a{border-bottom:1px solid #000;padding-bottom:3px}
.links sup{font-size:9px}
.redzone{background:#fff;padding:60px 18px 20vh;overflow:hidden}
.card{background:#dcdde1;color:#000;padding:22px 26px 40px;margin-bottom:8vh;transform-origin:0 0;will-change:transform}
.card header{display:flex;justify-content:space-between;align-items:flex-end}
.card h3{font-size:clamp(34px,5.5vw,80px);letter-spacing:0;font-weight:500}
.card header a{font-size:22px;border-bottom:2px solid currentColor}
.f1{margin-top:24px;border:1px dashed currentColor;padding:28px 40px 40px;font-size:13px;text-transform:uppercase;position:relative}
.f2{border:1px solid currentColor;padding:22px 24px 30px;margin-top:6px}
.f3{border:1px dashed currentColor;padding:12px 14px 14px;margin-top:6px}
.shot{aspect-ratio:16/9;margin-top:8px;display:grid;place-items:center;color:#fff;font-size:11px;background-size:cover!important}
.studio{padding:90px 18px 100px;position:relative;min-height:100vh}
.studio .cols{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px}
.collage{position:relative;height:420px}
.collage div{position:absolute;width:55%;aspect-ratio:4/3;box-shadow:0 10px 30px #0003;transition:transform .4s}
.collage:hover div{transform:rotate(0)!important}
.info{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:20px;font-size:12px;align-self:end}
.info p{font-size:17px;line-height:1.25;margin-bottom:24px;grid-column:1/-1;max-width:420px}
.info li{list-style:none;border-bottom:1px solid #0002;padding:2px 0}
.news{padding:60px 18px 14vh}
.news li{list-style:none;font-size:clamp(24px,3.4vw,48px);letter-spacing:0;border-top:1px solid #000;padding:14px 0}
.news li:hover{color:#ff2a14}
.foot{background:#000;min-height:90vh;padding:90px 18px 18px;display:flex;flex-direction:column;justify-content:space-between}
.foot .tag{font-size:14px;color:#e4e6eb99;letter-spacing:.08em}
.foot h2{font-family:'Press Start 2P',monospace;font-size:clamp(34px,13vw,230px);line-height:1.15;letter-spacing:0;color:#e4e6eb;margin:18px 0 28px}
.foot p{font-size:17px;line-height:1.6;color:#e4e6eb99;max-width:380px;margin-bottom:22px}
.foot .mail{display:inline-flex;align-items:center;gap:14px;font-size:clamp(22px,4.2vw,60px);letter-spacing:0;color:#e4e6eb;padding-bottom:6px;background:linear-gradient(#ff2a14,#ff2a14) left bottom/100% 3px no-repeat;transition:color .3s,background-size .4s}
.foot .mail span{display:inline-block;transition:transform .3s}
.foot .mail:hover{color:#ff2a14}
.foot .mail:hover span{transform:translate(6px,-6px)}
.foot .bar{display:flex;justify-content:space-between;font-size:13px;color:#e4e6eb88;border-top:1px solid #e4e6eb22;padding-top:14px;margin-top:60px}
.reg{cursor:pointer}
.game{position:fixed;top:50%;right:14px;z-index:200;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;padding:10px 10px 12px;background:#000;border:4px solid #e4e6eb;max-width:calc(100vw - 28px);animation:gin .45s steps(9) both}
@keyframes gin{from{transform:translate(120%,-50%)}to{transform:translate(0,-50%)}}
.game .gh{display:flex;justify-content:space-between;align-items:center;gap:14px;font-family:'Press Start 2P',monospace;font-size:10px;color:#e4e6eb}
.game .x{background:none;border:2px solid #e4e6eb;color:#e4e6eb;font:inherit;font-size:14px;width:30px;height:30px;line-height:1;padding:0}
.game .x:hover{background:#ff2a14;border-color:#ff2a14;color:#000}
.game .gwrap{position:relative;display:flex;align-self:center}
.game .gplay{position:absolute;left:50%;top:58%;transform:translate(-50%,-50%);font-family:'Press Start 2P',monospace;font-size:14px;background:#ff2a14;color:#000;border:3px solid #e4e6eb;padding:14px 20px;white-space:nowrap}
.game .gplay:hover{background:#e4e6eb}
.game canvas{display:block;align-self:center;height:min(52vh,480px);aspect-ratio:2/3;max-width:100%;image-rendering:pixelated;touch-action:none;background:#000}
.game p{align-self:center;max-width:300px;font-size:14px;color:#e4e6eb99;text-align:center}
.nf{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;text-align:center;padding:24px;background:#000;color:#e4e6eb}
.nf h1{font-family:'Press Start 2P',monospace;font-size:clamp(60px,22vw,300px);line-height:1;text-shadow:.05em .05em 0 #ff2a14;animation:nfb 1.2s steps(2) infinite}
@keyframes nfb{50%{text-shadow:-.05em .05em 0 #ff2a14}}
.nf p{font-size:20px;max-width:420px;color:#e4e6eb99}
.nfb{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.nfb a,.nfb button{font:inherit;font-size:16px;border:2px solid #e4e6eb;background:none;color:#e4e6eb;padding:12px 18px;cursor:pointer}
.nfb a:hover,.nfb button:hover{background:#e4e6eb;color:#000}
.burger{display:none;background:none;border:1px solid #fff;color:#fff;font:inherit;font-size:13px;padding:6px 16px;border-radius:99px;cursor:pointer}
.menu{position:fixed;inset:0;z-index:94;display:flex;flex-direction:column;justify-content:center;gap:2vh;padding:0 24px;background:rgba(20,0,0,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);opacity:0;pointer-events:none;transition:opacity .5s ease}
.menu.open{opacity:1;pointer-events:auto}
.menu a{font-size:clamp(44px,13vw,80px);letter-spacing:0;font-weight:500;color:#e4e6eb;opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease,color .3s}
.menu.open a{opacity:1;transform:none}
.menu a:hover{color:#ff2a14}
.menu small{position:absolute;left:24px;bottom:24px;font-size:12px;color:#e4e6eb99}
.mailrow{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.copy{font:inherit;font-size:16px;border:2px solid #e4e6eb;background:none;color:#e4e6eb;padding:10px 16px;transition:background .2s,color .2s}
.copy:hover{background:#e4e6eb;color:#000}
*{cursor:var(--cur,auto)}
a,button,.reg,.strike,[role="button"]{cursor:var(--cur-link,pointer)!important}
@media(max-width:760px){.top nav,.top .m{display:none}.burger{display:block}.studio .cols{grid-template-columns:1fr}.reg{display:none}.top{align-items:center}}
@media(prefers-reduced-motion:reduce){*{transition:none!important}.big .ch{animation:none!important}.big .strike{transform:none!important;animation:none!important}}
`;

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);

// tilts an element based on how far below the middle of the screen it sits
function Tilt({ children, deg = 9, className = "", style }) {
  const ref = useRef(null);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const t = clamp((el.getBoundingClientRect().top - window.innerHeight * 0.25) / window.innerHeight);
      el.style.transform = `rotate(${t * deg}deg) translateY(${t * 12}vh)`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [deg]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

// draws the video onto a tiny canvas and scales it up so it looks pixelated
function PixelVideo({ src, size = 160 }) {
  const v = useRef(null);
  const c = useRef(null);
  useEffect(() => {
    const video = v.current;
    const canvas = c.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const draw = () => {
      if (video.videoWidth) {
        const h = Math.round((size * video.videoHeight) / video.videoWidth);
        if (canvas.width !== size || canvas.height !== h) {
          canvas.width = size;
          canvas.height = h;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(draw);
    };
    video.play().catch(() => {});
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);
  return (
    <>
      <video ref={v} src={src} autoPlay muted loop playsInline style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
      <canvas ref={c} style={{ imageRendering: "pixelated" }} />
    </>
  );
}

// tiny catch-the-pixels game: catch yellow, dodge red
function Game({ onClose }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  startedRef.current = started;
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const W = 120, H = 180;
    cv.width = W;
    cv.height = H;
    let best = 0;
    try { best = Number(localStorage.getItem("louis-best")) || 0; } catch (e) {}
    const ROBOT = ["...#...", "...#...", ".#####.", ".#r#r#.", ".#####.", "..#.#..", ".##.##."];
    const keys = {};
    let st, raf, last = performance.now();
    const reset = () => { st = { x: W / 2, score: 0, lives: 3, spawn: 0, items: [], over: false }; };
    reset();
    const kd = (e) => {
      const k = e.key.toLowerCase();
      if ([" ", "arrowleft", "arrowright"].includes(k)) e.preventDefault();
      if (k === "escape") return closeRef.current();
      keys[k] = true;
      if (st.over && (k === "enter" || k === " ")) reset();
    };
    const ku = (e) => { keys[e.key.toLowerCase()] = false; };
    const pm = (e) => {
      if (!startedRef.current) return;
      const r = cv.getBoundingClientRect();
      st.x = Math.max(7, Math.min(W - 7, ((e.clientX - r.left) / r.width) * W));
    };
    const pd = (e) => { if (!startedRef.current) return; pm(e); if (st.over) reset(); };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    cv.addEventListener("pointermove", pm);
    cv.addEventListener("pointerdown", pd);
    const text = (t, x, y, c, a) => { ctx.fillStyle = c; ctx.textAlign = a; ctx.fillText(t, x, y); };
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (startedRef.current && !st.over) {
        if (keys["arrowleft"] || keys["a"]) st.x -= 90 * dt;
        if (keys["arrowright"] || keys["d"]) st.x += 90 * dt;
        st.x = Math.max(7, Math.min(W - 7, st.x));
        st.spawn -= dt;
        if (st.spawn <= 0) {
          st.spawn = Math.max(0.28, 0.75 - st.score * 0.012);
          st.items.push({ x: 6 + Math.random() * (W - 12), y: -6, bad: Math.random() < 0.3, v: 38 + Math.random() * 22 + st.score * 1.2 });
        }
        st.items.forEach((it) => { it.y += it.v * dt; });
        st.items = st.items.filter((it) => {
          if (it.y > H - 24 && it.y < H - 8 && Math.abs(it.x - st.x) < 9) {
            if (it.bad) st.lives -= 1; else st.score += 1;
            return false;
          }
          return it.y < H + 8;
        });
        if (st.lives <= 0) {
          st.over = true;
          if (st.score > best) {
            best = st.score;
            try { localStorage.setItem("louis-best", String(best)); } catch (e) {}
          }
        }
      }
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#161616";
      for (let i = 0; i < W; i += 12) ctx.fillRect(i, 0, 1, H);
      st.items.forEach((it) => {
        ctx.fillStyle = it.bad ? "#ff2a14" : "#f4b13a";
        ctx.fillRect(Math.round(it.x) - 3, Math.round(it.y) - 3, 6, 6);
        if (it.bad) { ctx.fillStyle = "#000"; ctx.fillRect(Math.round(it.x) - 1, Math.round(it.y) - 1, 2, 2); }
      });
      ROBOT.forEach((row, ry) => [...row].forEach((c, rx) => {
        if (c === ".") return;
        ctx.fillStyle = c === "r" ? "#ff2a14" : "#e4e6eb";
        ctx.fillRect(Math.round(st.x) - 7 + rx * 2, H - 22 + ry * 2, 2, 2);
      }));
      ctx.font = "6px 'Press Start 2P', monospace";
      text("SCORE " + st.score, 4, 10, "#e4e6eb", "left");
      text("BEST " + best, W - 4, 10, "#e4e6eb99", "right");
      for (let i = 0; i < st.lives; i++) { ctx.fillStyle = "#ff2a14"; ctx.fillRect(4 + i * 8, 15, 5, 5); }
      if (!startedRef.current) {
        ctx.fillStyle = "rgba(0,0,0,.7)";
        ctx.fillRect(0, 0, W, H);
        text("PIXEL CATCH", W / 2, H / 2 - 30, "#e4e6eb", "center");
      }
      if (st.over) {
        ctx.fillStyle = "rgba(0,0,0,.8)";
        ctx.fillRect(0, 0, W, H);
        text("GAME OVER", W / 2, H / 2 - 4, "#e4e6eb", "center");
        text("TAP / ENTER", W / 2, H / 2 + 12, "#f4b13a", "center");
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, []);
  return (
    <div className="game">
      <div className="gh">
        <span>▶ PIXEL CATCH</span>
        <button className="x" onClick={onClose} aria-label="Close game">✕</button>
      </div>
      <div className="gwrap">
        <canvas ref={ref} />
        {!started && <button className="gplay" onClick={() => setStarted(true)}>▶ PLAY</button>}
      </div>
      <p>Move with ← → or your finger / mouse. Catch yellow, dodge red.</p>
    </div>
  );
}

// shown for any address that isn't the home page
function NotFound() {
  const [game, setGame] = useState(false);
  return (
    <main className="nf">
      <h1>404</h1>
      <p>This page got lost in the pixels.</p>
      <div className="nfb">
        <a href="/">← BACK HOME</a>
        <button onClick={() => setGame(true)}>▶ PLAY WHILE YOU'RE HERE</button>
      </div>
      {game && <Game onClose={() => setGame(false)} />}
    </main>
  );
}

function Home() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [y, setY] = useState(0);
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  useEffect(() => {
    let buf = "";
    const on = (e) => {
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === "play") setGame(true);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(v + 1, 100)), 30);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (n === 100) setTimeout(() => setDone(true), 400);
  }, [n]);
  // on laptop-size screens (1024px and wider) the game popup opens by itself a few seconds after loading
  const gameSeen = useRef(false);
  useEffect(() => {
    if (game) gameSeen.current = true;
  }, [game]);
  useEffect(() => {
    if (!done || !window.matchMedia("(min-width: 1024px)").matches) return;
    const id = setTimeout(() => {
      if (!gameSeen.current) setGame(true);
    }, GAME_DELAY);
    return () => clearTimeout(id);
  }, [done]);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const p = clamp(y / window.innerHeight); // hero progress 0..1
  const go = (id) => {
    setOpen(false);
    document.body.style.overflow = "";
    document.getElementById(id)?.scrollIntoView();
  };
  const jump = (id) => (e) => {
    e.preventDefault();
    go(id);
  };

  return (
    <>

      <div className={`loader ${done ? "done" : ""}`}>
        <div className="count">{n}%</div>
        <div className="lbar"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
      </div>

      <div className="top">
        <div className="logo">{NAME.split(" ")[0]}</div>
        <div className="m">{HOURS}</div>
        <div className="m">{CITY}</div>
        <nav>
          {NAV.map((l, i) => (
            <span key={l}>
              <a href={`#${l.toLowerCase()}`} style={i === 0 && p < 1 ? { color: "#ff2a14" } : null} onClick={jump(l.toLowerCase())}>{l}</a>
              {i < NAV.length - 1 && " / "}
            </span>
          ))}
        </nav>
        <button className="burger" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </div>

      <div className={`menu ${open ? "open" : ""}`}>
        {NAV.map((l, i) => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }} onClick={jump(l.toLowerCase())}>{l}</a>
        ))}
        <small>{CITY} · {HOURS}</small>
      </div>

      {/* HERO: red-tinted background that turns to full colour while you scroll */}
      <section className="hero" id="home" style={{ transform: `scale(${1 - p * 0.04})` }}>
        {HERO_VIDEO ? <PixelVideo src={HERO_VIDEO} size={PIXEL_SIZE} /> : <div className="bg" />}
        <div className="tint" style={{ opacity: 1 - p }} />
        <div className="reg" title="?" onClick={() => setGame(true)}>R</div>
        <div
          className={`big ${done ? "go" : ""}`}
          style={{
            fontSize: `min(calc((100vw - 40px) / ${Math.max(...NAME.split(" ").map((w) => w.length))}), 320px)`,
            transform: `translateY(${-p * 45}vh) rotate(${-p * 9}deg)`,
          }}
        >
          {NAME.split(" ").map((w) => (
            <div key={w}>
              {[...w].map((c, i) => (
                <span key={i} className="ch" style={{ "--i": i }}>{c}</span>
              ))}
            </div>
          ))}
          <i className="strike" />
        </div>
      </section>

      <div className="sheet" id="work">
        <div className="pad" style={{ paddingTop: 30 }}>
          <Tilt deg={-4} className="h1">Highlights</Tilt>
          <div className="links">
            <a href="#work" onClick={jump("work")}>The Work<sup>[{PROJECTS.length}]</sup> →</a>
            <a href="#about" onClick={jump("about")}>About me →</a>
          </div>
        </div>

        <div className="redzone">
          {PROJECTS.map((pr) => (
            <Tilt key={pr.title} deg={10}>
              <article
                className="card"
                style={{ background: `rgb(${pr.rgb})`, color: pr.fg }}>
                <header><h3>{pr.title}</h3><a href={pr.url} target="_blank" rel="noreferrer">View project</a></header>
                <div className="f1">ROLE: {pr.role}
                  <div className="f2">STACK: {pr.stack}
                    <div className="f3">YEAR: {pr.year}
                      <a className="shot" href={pr.url} target="_blank" rel="noreferrer" style={{ background: pr.img ? `url(${pr.img}) center` : pr.color }}>VIEW PROJECT</a>
                    </div>
                  </div>
                </div>
              </article>
            </Tilt>
          ))}
        </div>

        <section className="studio" id="about">
          <Tilt deg={-3} className="h1">About me →</Tilt>
          <div className="cols">
            <div className="collage">
              {ABOUT_IMAGES.map((src, i) => (
                <div key={src} style={{ background: `#ccc url(${src}) center/cover`, left: `${i * 16}%`, top: `${i * 18}%`, transform: `rotate(${[-9, 5, -3][i]}deg)` }} />
              ))}
            </div>
            <div className="info">
              <p>{ABOUT}</p>
              <ul><li>Skills</li>{SKILLS.map((a) => <li key={a}>{a}</li>)}</ul>
              <ul><li>Tools</li>{TOOLS.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
          </div>
        </section>
      </div>
      <section className="sheet news" id="news">
        <Tilt deg={-3} className="h1">News</Tilt>
        <ul style={{ marginTop: 40 }}>{NEWS.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <footer id="contact" className="foot" style={{ position: "relative", zIndex: 2 }}>
        <div>
          <div className="tag">( CONTACT )</div>
          <h2>GET IN<br />TOUCH</h2>
          <p>For project inquiries and more information, get in touch at</p>
          <div className="mailrow">
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL} <span>↗</span></a>
            <button className="copy" onClick={copyEmail}>{copied ? "COPIED ✓" : "COPY EMAIL"}</button>
          </div>
        </div>
        <div className="bar">
          <span>© {new Date().getFullYear()} {NAME}</span>
          <button className="playbtn" onClick={() => setGame(true)}>▶ PRESS START</button>
          <span>{CITY}</span>
        </div>
      </footer>
      {game && <Game onClose={() => setGame(false)} />}
    </>
  );
}

// pixel-art cursors drawn from the grids below ("#" = pixel). Edit the shapes if you like.
const ARROW = ["#..........", "##.........", "###........", "####.......", "#####......", "######.....", "#######....", "########...", "#########..", "#####......", "##.##......", "#..###.....", "...###.....", "....###....", "....###....", ".....##...."];
const HAND = ["...##........", "..####.......", "..####.......", "..####.......", "..####.##....", "..#########..", "..##########.", ".###########.", ".###########.", ".###########.", "..##########.", "..##########.", "...########..", "...########.."];

function makeCursor(rows, fill, k = 2) {
  const h = rows.length, w = rows[0].length;
  const on = (x, y) => rows[y] && rows[y][x] === "#";
  const c = document.createElement("canvas");
  c.width = (w + 2) * k;
  c.height = (h + 2) * k;
  const ctx = c.getContext("2d");
  for (let y = -1; y <= h; y++) {
    for (let x = -1; x <= w; x++) {
      let col = null;
      if (on(x, y)) col = fill;
      else if (on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1) || on(x - 1, y - 1) || on(x + 1, y - 1) || on(x - 1, y + 1) || on(x + 1, y + 1)) col = "#000";
      if (col) {
        ctx.fillStyle = col;
        ctx.fillRect((x + 1) * k, (y + 1) * k, k, k);
      }
    }
  }
  return c.toDataURL();
}

export default function App() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement.style;
    root.setProperty("--cur", `url(${makeCursor(ARROW, "#fff")}) 2 2, auto`);
    root.setProperty("--cur-link", `url(${makeCursor(HAND, "#ff2a14")}) 8 2, pointer`);
  }, []);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHome = path === "/" || path === "/index.html";
  return (
    <>
      <style>{css}</style>
      {isHome ? <Home /> : <NotFound />}
    </>
  );
}