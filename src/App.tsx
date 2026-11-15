import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

/* ---------- reloj en vivo (actualizaciones automáticas) ---------- */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const fmt = (d: Date) =>
  d.toLocaleString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

/* ---------- datos: estándares ---------- */
const ISO25010 = [
  { n: "Adecuación funcional", d: "El producto cubre las funciones declaradas y las hace correctamente." },
  { n: "Eficiencia de desempeño", d: "Tiempo de respuesta, rendimiento y uso de recursos medidos." },
  { n: "Compatibilidad", d: "Coexistencia e interoperabilidad con otros sistemas." },
  { n: "Usabilidad", d: "Reconocibilidad, apreensibilidad, operabilidad y accesibilidad." },
  { n: "Fiabilidad", d: "Madurez, disponibilidad, tolerancia a fallos y recuperabilidad." },
  { n: "Seguridad", d: "Confidencialidad, integridad, no repudio, autenticidad y responsabilidad." },
  { n: "Mantenibilidad", d: "Modularidad, reusabilidad, analizabilidad, modificabilidad y testabilidad." },
  { n: "Portabilidad", d: "Adaptabilidad, instalabilidad, reemplazabilidad y capacidad de sustitución." },
] as const;

const STANDARDS = [
  {
    code: "ISO/IEC 25010",
    title: "Calidad del Producto de Software",
    body: "Ocho características del producto, verificadas en cada entrega. Es el estándar principal de esta declaración.",
    points: ["Funcionalidad", "Eficiencia", "Compatibilidad", "Usabilidad", "Fiabilidad", "Seguridad", "Mantenibilidad", "Portabilidad"],
  },
  {
    code: "ISO/IEC 25012",
    title: "Calidad de los Datos",
    body: "Los datos que maneja el software deben ser exactos, completos, consistentes, actuales y creíbles.",
    points: ["Exactos", "Completos", "Consistentes", "Actuales", "Creíbles"],
  },
  {
    code: "ISO/IEC/IEEE 12207",
    title: "Ciclo de Vida del Software",
    body: "Análisis, diseño, construcción, pruebas, entrega y mantenimiento, con evidencia por etapa.",
    points: ["Análisis", "Diseño", "Construcción", "Pruebas", "Entrega", "Mantenimiento"],
  },
  {
    code: "ISO/IEC 27001",
    title: "Seguridad de la Información",
    body: "Control de accesos, respaldos, cifrado y manejo seguro de datos.",
    points: ["Accesos", "Respaldos", "Cifrado", "Datos"],
  },
  {
    code: "OWASP ASVS",
    title: "Verificación de Seguridad en Aplicaciones",
    body: "Estándar de verificación de seguridad aplicado a cada aplicación.",
    points: ["Autenticación", "Sesiones", "Validación", "Criptografía"],
  },
  {
    code: "OWASP Top 10",
    title: "Vulnerabilidades Más Comunes",
    body: "Prevención de las diez vulnerabilidades más comunes en aplicaciones.",
    points: ["Inyección", "Broken Access", "Cripto", "Configuración"],
  },
] as const;

const TONE = ["text-gold", "text-teal", "text-navy-2"] as const;

function Badge({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "teal" | "navy" }) {
  const map = {
    gold: "border-gold-line/45 bg-gold-line/10 text-gold",
    teal: "border-teal/30 bg-teal/10 text-teal",
    navy: "border-navy/20 bg-navy/5 text-navy-2",
  } as const;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${map[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function StandardCard({ s, i }: { s: (typeof STANDARDS)[number]; i: number }) {
  const tone = TONE[i % TONE.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: i * 0.06 }}
      className="group relative rounded-3xl border border-line bg-white p-6 shadow-[0_18px_50px_-32px_rgba(10,31,51,0.35)] transition-shadow hover:shadow-[0_28px_70px_-28px_rgba(10,31,51,0.45)]"
    >
      <div className={`font-mono text-[11px] font-semibold tracking-[0.18em] ${tone}`}>{s.code}</div>
      <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {s.points.map((p) => (
          <li key={p} className="rounded-full border border-line bg-ivory px-2.5 py-1 text-[11px] font-medium text-muted">
            {p}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function App() {
  const now = useClock();
  const fecha = useMemo(() => fmt(now), [now]);

  return (
    <div className="min-h-full">
      {/* barra superior */}
      <motion.header
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="sticky top-0 z-20 border-b border-line/80 bg-paper/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-gold-line/50 bg-white">
            <span className="font-serif text-lg font-bold text-navy">T</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-navy">TAPIA COMPUTACIÓN</div>
            <div className="text-[11px] italic text-muted">Desarrollo de Software</div>
          </div>
          <div className="flex-1" />
          <div className="hidden items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 sm:flex">
            <motion.span
              className="h-2 w-2 rounded-full bg-teal"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[11px] font-medium text-muted">Declaración vigente</span>
          </div>
          <span className="hidden font-mono text-[11px] text-muted md:inline">{fecha}</span>
        </div>
      </motion.header>

      <main className="mx-auto max-w-5xl px-5 pb-20">
        {/* hero */}
        <section className="pt-14 pb-10 text-center md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge tone="gold">DECLARACIÓN DE</Badge>
            <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
              Estándares de Calidad <span className="text-gold">de Software</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Se hace constar que todo el software que desarrolla <strong className="text-ink">Tapia Computación</strong> se
              construye conforme a los siguientes estándares internacionales, garantizando calidad, seguridad y confiabilidad
              para nuestros clientes.
            </p>
          </motion.div>

          {/* reloj en vivo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-line bg-white px-5 py-3"
          >
            <span className="text-[11px] font-semibold tracking-[0.18em] text-gold">EN VIVO</span>
            <span className="font-mono text-sm tabular-nums text-ink">{fecha}</span>
          </motion.div>
        </section>

        {/* ISO 25010 — estándar principal */}
        <section className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="rounded-[2rem] border border-navy/15 bg-navy p-7 text-white shadow-[0_30px_80px_-36px_rgba(10,31,51,0.6)] md:p-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] font-semibold tracking-[0.22em] text-gold-line">I · ISO/IEC 25010</div>
                <h2 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">Calidad del Producto de Software</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
                  Las ocho características de calidad se verifican en cada entrega. Es la norma principal de esta declaración.
                </p>
              </div>
              <div className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-[11px] text-gold-line">
                8 / 8 características
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ISO25010.map((c, i) => (
                <motion.div
                  key={c.n}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                >
                  <div className="font-mono text-[10px] tracking-[0.16em] text-gold-line">0{i + 1}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{c.n}</div>
                  <div className="mt-1 text-[11px] leading-snug text-white/65">{c.d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* grid de estándares */}
        <section className="grid gap-4 md:grid-cols-2">
          {STANDARDS.map((s, i) => (
            <StandardCard key={s.code} s={s} i={i} />
          ))}
        </section>

        {/* pie de declaración */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-[2rem] border border-line bg-white p-7 md:p-10"
        >
          <p className="text-sm leading-relaxed text-muted">
            Cada desarrollo se documenta con evidencia —qué se implementó, cómo se probó y el resultado obtenido— conforme a
            la norma. Además, nuestros desarrollos siguen una <strong className="text-ink">ruta de certificación Microsoft en proceso</strong>.
          </p>

          <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <div className="border-b border-navy/30 pb-1 font-serif text-lg font-semibold text-ink">Ing. Adrián Peña Tapia</div>
              <div className="mt-1 text-xs italic text-muted">Tapia Computación</div>
            </div>
            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-gold-line/60">
                <span className="text-[9px] font-semibold tracking-[0.2em] text-gold">SELLO</span>
              </div>
            </div>
            <div>
              <div className="border-b border-navy/30 pb-1 font-mono text-sm text-ink">{fecha.split(",")[0]}</div>
              <div className="mt-1 text-xs tracking-[0.18em] text-muted">FECHA</div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-line/70 py-8 text-center">
        <p className="text-xs text-muted">
          © {now.getFullYear()} Tapia Computación · Obra y diseño de Adrian Peña Tapia
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted/70">
          ISO/IEC 25010 · 25012 · 12207 · 27001 · OWASP ASVS · OWASP Top 10
        </p>
      </footer>
    </div>
  );
}
