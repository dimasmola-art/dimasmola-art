import { useState, useEffect, useRef } from "react";

// ── DATOS REALES DEL DOSSIER ──────────────────────────────
const WORKS = [
  {
    id: "sinapsis",
    title: "Sinapsis",
    titleEn: "Synapse",
    year: "2025",
    available: true,
    price: "5.000€",
    technique: "Relieve escultórico · Resina epoxy",
    techniqueEn: "Sculptural relief · Epoxy resin",
    finish: "Gris mate · Craquelado · Marco blanco",
    finishEn: "Matte grey · Craquelure · White frame",
    descEs: "Una red de formas que se ramifican y conectan como impulsos viajando entre neuronas. El craquelado recorre toda la superficie como electricidad detenida en el tiempo — sobre las formas, como si la materia misma estuviera transmitiendo. Gris mate, silencioso, poderoso. Una obra que no se ve. Se lee.",
    descEn: "A network of forms branching and connecting like impulses travelling between neurons. The craquelure runs across the entire surface like electricity frozen in time — as if the matter itself were transmitting. Matte grey, silent, powerful. A work you don't see. You read it.",
    accent: "#8a8a8a",
    imgs: [
      "/mnt/user-data/uploads/1000035658.jpg",
      "/mnt/user-data/uploads/1000035643.jpg",
      "/mnt/user-data/uploads/1000035652.jpg",
    ],
  },
  {
    id: "colapso",
    title: "Colapso",
    titleEn: "Collapse",
    year: "2025",
    available: true,
    price: "5.000€",
    technique: "Relieve escultórico · Resina epoxy",
    techniqueEn: "Sculptural relief · Epoxy resin",
    finish: "Camaleón violeta · Craquelado",
    finishEn: "Violet chameleon · Craquelure",
    descEs: "Masas de relieve que evocan un glaciar en el momento exacto de su deshielo. Las grietas del craquelado blanco avanzan entre las formas como fracturas de hielo. El acabado camaleón violeta muta entre el morado intenso y el lila suave según la luz. Una obra que captura un instante imposible: el colapso detenido en el tiempo.",
    descEn: "Relief masses evoking a glacier at the exact moment of its thaw. The white craquelure cracks advance between forms like ice fractures. The violet chameleon finish shifts between deep purple and soft lilac with the light. A work capturing an impossible instant: collapse frozen in time.",
    accent: "#7b4fa6",
    imgs: [
      "/mnt/user-data/uploads/1000035675.jpg",
      "/mnt/user-data/uploads/1000035670.jpg",
      "/mnt/user-data/uploads/1000035664.jpg",
    ],
  },
  {
    id: "cobre",
    title: "Sin título",
    titleEn: "Untitled",
    year: "2025",
    available: true,
    price: "5.000€",
    technique: "Relieve escultórico · Resina epoxy",
    techniqueEn: "Sculptural relief · Epoxy resin",
    finish: "Acabado cobre · Formas cóncavas · Marco negro",
    finishEn: "Copper finish · Concave forms · Black frame",
    descEs: "Formas cóncavas que emergen de un fondo negro profundo, bañadas en cobre vivo. Cada forma atrapa la luz como un cuenco de metal antiguo. Una obra de presencia mineral e imponente.",
    descEn: "Concave forms emerging from a deep black background, bathed in living copper. Each form captures light like a vessel of ancient metal. A work of mineral, imposing presence.",
    accent: "#b87333",
    imgs: [
      "/mnt/user-data/uploads/1000035682.jpg",
      "/mnt/user-data/uploads/1000035681.jpg",
      "/mnt/user-data/uploads/1000035680.jpg",
    ],
  },
  {
    id: "duna",
    title: "Duna",
    titleEn: "Dune",
    year: "2025",
    available: true,
    price: "5.000€",
    technique: "Relieve escultórico · Resina epoxy",
    techniqueEn: "Sculptural relief · Epoxy resin",
    finish: "Camaleón perla · Marco blanco",
    finishEn: "Pearl chameleon · White frame",
    descEs: "Líneas que fluyen en perfecta armonía, organizadas y libres a la vez, como el mapa de un desierto visto desde el cielo. El acabado camaleón perla muta con cada cambio de luz — blanco nacarado, azul celeste, destellos dorados y rosados. Una superficie que el viento podría haber trazado.",
    descEn: "Lines flowing in perfect harmony, organised and free at once, like the map of a desert seen from above. The pearl chameleon finish shifts with every change of light — nacre white, sky blue, gold and rose glints. A surface the wind might have drawn.",
    accent: "#c9a96e",
    imgs: [
      "/mnt/user-data/uploads/1000035696.jpg",
      "/mnt/user-data/uploads/1000035689.jpg",
      "/mnt/user-data/uploads/1000035686.jpg",
    ],
  },
];

const PROCESS = [
  { num: "01", es: "Base estructural", en: "Structural base", dEs: "Base de madera con panel rígido de alta densidad adherido y trabajado a mano.", dEn: "Wooden base with rigid high-density panel adhered and hand-worked." },
  { num: "02", es: "Tallado y forma", en: "Carving & form", dEs: "Tallado y lijado manual para crear las formas orgánicas únicas de cada pieza.", dEn: "Manual carving and sanding to create the unique organic forms of each piece." },
  { num: "03", es: "Fibra y resina", en: "Fiber & resin", dEs: "Capas sucesivas de masilla de fibra y resina epoxy para solidez y textura extraordinarias.", dEn: "Successive layers of fiber filler and epoxy resin for extraordinary solidity and texture." },
  { num: "04", es: "Acabado final", en: "Final finish", dEs: "Pintura camaleón de alta gama o acabado mate con craquelure. Resultado único e irrepetible.", dEn: "Premium chameleon paint or matte finish with craquelure. Unique and unrepeatable result." },
];

// ── COLORES ───────────────────────────────────────────────
const C = {
  bg: "#080808",
  surface: "#111",
  border: "rgba(201,169,110,0.12)",
  gold: "#c9a96e",
  goldL: "#e8d5b0",
  white: "#f0ede8",
  grey: "#5a5a5a",
  greyL: "#888",
};

// ── LOGO ─────────────────────────────────────────────────
const Logo = ({ onClick }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "baseline", gap: 1 }}>
    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, fontStyle: "italic", color: C.white, letterSpacing: "0.01em" }}>D.</span>
    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 400, color: C.white, letterSpacing: "0.22em", textTransform: "uppercase" }}>Smola</span>
  </button>
);

// ── HAMBURGER ─────────────────────────────────────────────
const Hamburger = ({ onClick }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: "6px 0" }}>
    <span style={{ display: "block", width: 26, height: 1.5, background: C.white }} />
    <span style={{ display: "block", width: 18, height: 1.5, background: C.white }} />
    <span style={{ display: "block", width: 22, height: 1.5, background: C.white }} />
  </button>
);

export default function DimaSmola() {
  const [lang, setLang] = useState("es");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(null);
  const [activeImg, setActiveImg] = useState({});
  const es = lang === "es";

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&display=swap";
    document.head.appendChild(link);
  }, []);

  const go = (p) => { setPage(p); setMenuOpen(false); setActiveWork(null); };
  const lBtn = (a) => ({ background: "none", border: "none", color: a ? C.gold : C.grey, fontFamily: "'Tenor Sans',sans-serif", fontSize: 11, letterSpacing: "0.2em", cursor: "pointer", padding: "2px 4px" });
  const label = { fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: 28, paddingBottom: 14, borderBottom: `1px solid ${C.border}` };

  // ── MENU OVERLAY ─────────────────────────────────────────
  const Menu = () => (
    <div style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 300, display: "flex", flexDirection: "column", padding: "0 28px", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <Logo onClick={() => go("home")} />
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            <button style={lBtn(lang === "es")} onClick={() => setLang("es")}>ES</button>
            <span style={{ color: "#222", fontSize: 12 }}>|</span>
            <button style={lBtn(lang === "en")} onClick={() => setLang("en")}>EN</button>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: C.white, fontSize: 34, cursor: "pointer", lineHeight: 1, padding: 0, marginTop: -4 }}>×</button>
        </div>
      </div>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {[
          { id: "home", es: "Inicio", en: "Home" },
          { id: "works", es: "Obras", en: "Works" },
          { id: "about", es: "Sobre mí", en: "About" },
          { id: "process", es: "Proceso", en: "Process" },
          { id: "contact", es: "Contacto", en: "Contact" },
        ].map((item) => (
          <button key={item.id} onClick={() => go(item.id)} style={{
            background: "none", border: "none", textAlign: "left",
            fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 300, lineHeight: 1.25,
            color: page === item.id ? C.gold : C.white,
            cursor: "pointer", padding: "4px 0",
            borderBottom: `1px solid rgba(201,169,110,0.06)`,
            letterSpacing: "-0.01em",
          }}>
            {es ? item.es : item.en}
          </button>
        ))}
      </nav>
      <div style={{ padding: "20px 0", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <a href="https://instagram.com/dimasmola_art" target="_blank" style={{ color: C.greyL, fontSize: 11, letterSpacing: "0.2em", textDecoration: "none" }}>@dimasmola_art</a>
        <span style={{ fontSize: 10, color: C.grey, letterSpacing: "0.2em" }}>Costa Blanca · España</span>
      </div>
    </div>
  );

  // ── NAV ──────────────────────────────────────────────────
  const Nav = () => (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,8,0.97)", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
      <Logo onClick={() => go("home")} />
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={lBtn(lang === "es")} onClick={() => setLang("es")}>ES</button>
          <span style={{ color: "#1e1e1e", fontSize: 12 }}>|</span>
          <button style={lBtn(lang === "en")} onClick={() => setLang("en")}>EN</button>
        </div>
        <Hamburger onClick={() => setMenuOpen(true)} />
      </div>
    </div>
  );

  // ── HOME ─────────────────────────────────────────────────
  const Home = () => (
    <div>
      {/* Hero */}
      <div style={{ minHeight: "84vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 24px 56px", position: "relative", background: `radial-gradient(ellipse at 80% 10%, rgba(201,169,110,0.05) 0%, transparent 55%), ${C.bg}` }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 24, width: 1, background: "linear-gradient(to bottom,transparent,rgba(201,169,110,0.15) 20%,rgba(201,169,110,0.15) 80%,transparent)" }} />
        <div style={{ position: "relative" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold, marginBottom: 20 }}>
            Arte Mural Escultórico — Costa Blanca
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 58, fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: 28, color: C.white }}>
            {es ? <>Relieve<br /><em style={{ fontStyle: "italic", color: C.goldL }}>hecho a mano</em></> : <>Sculptural<br /><em style={{ fontStyle: "italic", color: C.goldL }}>relief art</em></>}
          </h1>
          <p style={{ color: C.greyL, fontSize: 12, lineHeight: 2.1, letterSpacing: "0.07em", maxWidth: 300, marginBottom: 36 }}>
            {es ? "Obra original hecha a mano. Colección disponible para coleccionistas privados, proyectos de hospitality y espacios corporativos." : "Original handmade work. Collection available to private collectors, hospitality projects and corporate spaces."}
          </p>
          <button onClick={() => go("works")} style={{ background: "none", border: `1px solid rgba(201,169,110,0.45)`, color: C.gold, fontFamily: "'Tenor Sans',sans-serif", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 28px", cursor: "pointer" }}>
            {es ? "Ver colección" : "View collection"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        {[{ n: "4", l: es ? "Obras" : "Works" }, { n: "1/1", l: es ? "Originales" : "Originals" }, { n: "5.000€", l: es ? "Precio" : "Price" }].map((s, i) => (
          <div key={i} style={{ padding: "24px 12px", textAlign: "center", borderRight: i < 2 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: i === 2 ? 22 : 36, fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.grey }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Works preview */}
      <div style={{ padding: "40px 24px 16px" }}>
        <span style={label}>{es ? "Colección 2025" : "2025 Collection"}</span>
        {WORKS.map((w) => (
          <div key={w.id} onClick={() => { go("works"); setTimeout(() => setActiveWork(w.id), 100); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: `1px solid rgba(201,169,110,0.07)`, cursor: "pointer" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: C.white }}>{es ? w.title : w.titleEn}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, fontStyle: "italic", color: C.goldL, marginTop: 2 }}>{es ? w.titleEn : w.title} · {w.year}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: C.gold, letterSpacing: "0.1em" }}>{w.price}</div>
              <div style={{ fontSize: 18, color: C.grey, marginTop: 4 }}>›</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div style={{ margin: "32px 24px", padding: "24px", borderLeft: `2px solid ${C.gold}`, background: "rgba(201,169,110,0.03)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 15, color: C.greyL, lineHeight: 1.8, letterSpacing: "0.04em" }}>
          {es ? "\"Cuando estoy trabajando en una pieza, me desconecto de todo. Solo existe la materia, las manos y el silencio. Es mi terapia.\"" : "\"When I'm working on a piece, I disconnect from everything. Only the matter, the hands and the silence exist. It's my therapy.\""}
        </p>
        <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, marginTop: 16 }}>— Dima Smola</p>
      </div>
    </div>
  );

  // ── WORKS ────────────────────────────────────────────────
  const Works = () => (
    <div style={{ padding: "40px 24px" }}>
      <span style={label}>{es ? "Colección 2025" : "2025 Collection"} — {WORKS.length} {es ? "obras" : "works"}</span>
      {WORKS.map((w, i) => {
        const open = activeWork === w.id;
        const imgIdx = activeImg[w.id] || 0;
        return (
          <div key={w.id} style={{ background: open ? C.surface : "transparent", border: `1px solid ${open ? "rgba(201,169,110,0.3)" : "rgba(201,169,110,0.08)"}`, marginBottom: 2, transition: "all 0.3s" }}>
            {/* Header */}
            <div onClick={() => setActiveWork(open ? null : w.id)} style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: 10, color: C.grey, letterSpacing: "0.2em", marginBottom: 4 }}>0{i + 1} · {w.year}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: C.white }}>{es ? w.title : w.titleEn}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontStyle: "italic", color: C.goldL, marginTop: 2 }}>{es ? w.titleEn : w.title}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: C.gold, letterSpacing: "0.1em", marginBottom: 8 }}>{w.price}</div>
                <div style={{ fontSize: 22, color: open ? C.gold : C.grey, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none", display: "inline-block" }}>+</div>
              </div>
            </div>

            {/* Expanded */}
            {open && (
              <div style={{ padding: "0 20px 28px", borderTop: `1px solid rgba(201,169,110,0.08)` }}>
                {/* Images */}
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <img src={w.imgs[imgIdx]} alt={w.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = "none"; }} />
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {w.imgs.map((img, idx) => (
                      <div key={idx} onClick={() => setActiveImg({ ...activeImg, [w.id]: idx })} style={{ flex: 1, height: 4, background: imgIdx === idx ? C.gold : "rgba(201,169,110,0.2)", cursor: "pointer", transition: "background 0.2s" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {w.imgs.map((img, idx) => (
                      <img key={idx} src={img} alt="" onClick={() => setActiveImg({ ...activeImg, [w.id]: idx })} style={{ flex: 1, height: 52, objectFit: "cover", cursor: "pointer", opacity: imgIdx === idx ? 1 : 0.45, transition: "opacity 0.2s" }} onError={(e) => { e.target.style.display = "none"; }} />
                    ))}
                  </div>
                </div>

                {/* Badge */}
                <div style={{ display: "inline-block", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", padding: "5px 12px", border: `1px solid rgba(201,169,110,0.35)`, color: C.gold, marginBottom: 16 }}>
                  {es ? "Pieza única · Disponible" : "Unique piece · Available"}
                </div>

                {/* Description */}
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 14, color: C.greyL, lineHeight: 1.9, letterSpacing: "0.04em", marginBottom: 20 }}>
                  {es ? w.descEs : w.descEn}
                </p>

                {/* Meta */}
                <div style={{ borderTop: `1px solid rgba(201,169,110,0.08)`, paddingTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[
                    { k: es ? "Técnica" : "Technique", v: es ? w.technique : w.techniqueEn },
                    { k: es ? "Acabado" : "Finish", v: es ? w.finish : w.finishEn },
                    { k: es ? "Edición" : "Edition", v: es ? "Pieza única" : "Unique piece" },
                    { k: es ? "Precio" : "Price", v: w.price },
                  ].map((r) => (
                    <div key={r.k}>
                      <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.grey, marginBottom: 4 }}>{r.k}</div>
                      <div style={{ fontSize: 12, color: C.white, letterSpacing: "0.04em" }}>{r.v}</div>
                    </div>
                  ))}
                </div>

                {/* Color bar */}
                <div style={{ height: 2, background: `linear-gradient(to right,transparent,${w.accent},transparent)`, opacity: 0.6, marginBottom: 20 }} />

                {/* CTA */}
                <button onClick={() => go("contact")} style={{ width: "100%", padding: "14px", background: "none", border: `1px solid rgba(201,169,110,0.35)`, color: C.gold, fontFamily: "'Tenor Sans',sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}>
                  {es ? "Consultar esta obra" : "Inquire about this work"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── ABOUT ────────────────────────────────────────────────
  const About = () => (
    <div style={{ padding: "40px 24px" }}>
      <span style={label}>{es ? "Sobre el artista" : "About the artist"}</span>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 300, lineHeight: 1.05, marginBottom: 28, color: C.white }}>
        {es ? <>Cada obra nace<br /><em style={{ fontStyle: "italic", color: C.goldL }}>de las manos</em></> : <>Every work<br /><em style={{ fontStyle: "italic", color: C.goldL }}>born from hands</em></>}
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 14, color: C.greyL, lineHeight: 1.9, marginBottom: 20 }}>
        {es ? "Dima Smola es un artista ucraniano afincado en la Costa Blanca, especializado en escultura mural contemporánea de alto relieve. Su trabajo combina una técnica de construcción manual por capas con acabados de alto brillo y efecto camaleón, creando obras que transforman la luz en materia viva." : "Dima Smola is a Ukrainian artist based on the Costa Blanca, specialising in contemporary high-relief mural sculpture. His work combines a manual layered construction technique with high-gloss and chameleon finishes, creating works that transform light into living matter."}
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 14, color: C.greyL, lineHeight: 1.9, marginBottom: 20 }}>
        {es ? "Su historia con el arte comienza en la infancia en Ucrania, donde descubrió el poder de trabajar con las manos. Años más tarde, como carpintero, perfeccionó las técnicas de acabado en alto brillo — conocimientos que hoy son la firma visual de su obra." : "His relationship with art began in childhood in Ukraine, where he discovered the power of working with his hands. Years later, as a carpenter, he perfected high-gloss finishing techniques — knowledge that today is the visual signature of his work."}
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 14, color: C.greyL, lineHeight: 1.9, marginBottom: 32 }}>
        {es ? "Cada obra nace de semanas de trabajo manual intenso — construyendo el relieve capa a capa, lijando, corrigiendo, aplicando el acabado final con precisión obsesiva." : "Each work is born from weeks of intensive manual work — building the relief layer by layer, sanding, correcting, applying the final finish with obsessive precision."}
      </p>

      {/* Quote */}
      <div style={{ padding: "20px 20px", borderLeft: `2px solid ${C.gold}`, background: "rgba(201,169,110,0.03)", marginBottom: 36 }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 15, color: C.greyL, lineHeight: 1.8 }}>
          {es ? "\"Cuando estoy trabajando en una pieza, me desconecto de todo. Solo existe la materia, las manos y el silencio. Es mi terapia.\"" : "\"When I'm working on a piece, I disconnect from everything. Only the matter, the hands and the silence exist. It's my therapy.\""}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 36, paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
        {[{ n: "4+", l: es ? "Obras creadas" : "Works created" }, { n: "1/1", l: es ? "Originales únicos" : "Unique originals" }, { n: "∞", l: es ? "Horas por pieza" : "Hours per piece" }].map((s) => (
          <div key={s.l}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: C.grey }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PROCESS ──────────────────────────────────────────────
  const Process = () => (
    <div style={{ padding: "40px 24px" }}>
      <span style={label}>{es ? "La técnica" : "The technique"}</span>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: 14, color: C.greyL, lineHeight: 1.9, marginBottom: 32 }}>
        {es ? "Cada obra se construye sobre una base de madera a la que se adhiere un panel rígido de alta densidad, tallado y lijado a mano. Sobre esta estructura se aplican sucesivas capas de masilla de fibra y resina epoxy, creando una superficie de extraordinaria solidez, lista para el acabado final." : "Each work is built on a wooden base to which a rigid high-density panel is adhered, carved and sanded by hand. Over this structure, successive layers of fiber filler and epoxy resin are applied, creating a surface of extraordinary solidity, ready for the final finish."}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {PROCESS.map((p) => (
          <div key={p.num} style={{ background: C.surface, padding: "22px 18px", border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: "rgba(201,169,110,0.1)", lineHeight: 1, marginBottom: 14 }}>{p.num}</div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.white, marginBottom: 8 }}>{es ? p.es : p.en}</div>
            <div style={{ fontSize: 11, color: C.greyL, lineHeight: 1.85 }}>{es ? p.dEs : p.dEn}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── CONTACT ──────────────────────────────────────────────
  const Contact = () => (
    <div style={{ padding: "40px 24px" }}>
      <span style={label}>{es ? "Contacto" : "Contact"}</span>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 300, lineHeight: 1.05, marginBottom: 16, color: C.white }}>
        {es ? <><em style={{ fontStyle: "italic", color: C.goldL }}>Adquirir</em><br />una obra</> : <><em style={{ fontStyle: "italic", color: C.goldL }}>Acquire</em><br />a work</>}
      </h2>
      <p style={{ color: C.greyL, fontSize: 13, lineHeight: 2, marginBottom: 32 }}>
        {es ? "Cada obra es única e irrepetible, acompañada de certificado de autenticidad. Envío asegurado a toda España. Disponible para proyectos de hospitality, espacios corporativos y coleccionistas privados." : "Each work is unique and unrepeatable, accompanied by a certificate of authenticity. Insured shipping throughout Spain. Available for hospitality projects, corporate spaces and private collectors."}
      </p>

      {/* Links */}
      {[
        { icon: "IG", label: "@dimasmola_art", href: "https://instagram.com/dimasmola_art" },
        { icon: "@", label: "dmytrosmola.art@gmail.com", href: "mailto:dmytrosmola.art@gmail.com" },
      ].map((l) => (
        <a key={l.href} href={l.href} target="_blank" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: `1px solid rgba(201,169,110,0.1)`, color: C.white, textDecoration: "none", fontSize: 12, letterSpacing: "0.1em" }}>
          <div style={{ width: 32, height: 32, border: `1px solid rgba(201,169,110,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{l.icon}</div>
          {l.label}
        </a>
      ))}

      {/* Terms */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "24px 20px", marginTop: 28 }}>
        <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold, marginBottom: 18 }}>{es ? "Condiciones" : "Terms"}</p>
        {[
          { k: es ? "Precio por obra" : "Price per work", v: "5.000€" },
          { k: es ? "Formato" : "Format", v: es ? "Original único, firmado" : "Unique original, signed" },
          { k: es ? "Certificado" : "Certificate", v: es ? "De autenticidad incluido" : "Of authenticity included" },
          { k: es ? "Envío" : "Shipping", v: es ? "Asegurado · España incluido" : "Insured · Spain included" },
          { k: es ? "Disponibilidad" : "Availability", v: es ? "Coleccionistas, hospitality, corporate" : "Collectors, hospitality, corporate" },
        ].map((r) => (
          <div key={r.k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid rgba(201,169,110,0.06)`, fontSize: 12 }}>
            <span style={{ color: C.greyL }}>{r.k}</span>
            <span style={{ color: C.gold, letterSpacing: "0.06em", textAlign: "right", maxWidth: "55%" }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── FOOTER ───────────────────────────────────────────────
  const Footer = () => (
    <div style={{ padding: "24px 20px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
      <span style={{ fontSize: 10, color: "rgba(90,90,90,0.5)", letterSpacing: "0.15em" }}>© 2025 Dima Smola · Arte Mural Escultórico</span>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: "rgba(201,169,110,0.25)", letterSpacing: "0.3em" }}>DS</span>
    </div>
  );

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: "'Tenor Sans',sans-serif", minHeight: "100vh", fontSize: 13, letterSpacing: "0.05em" }}>
      {menuOpen && <Menu />}
      <Nav />
      {page === "home" && <Home />}
      {page === "works" && <Works />}
      {page === "about" && <About />}
      {page === "process" && <Process />}
      {page === "contact" && <Contact />}
      <Footer />
    </div>
  );
}
