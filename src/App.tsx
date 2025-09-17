import { useMemo, useState } from "react";
import { RSVPForm } from "./components/RSVPForm";
import { Countdown } from "./components/Countdown";
import { Gallery } from "./components/Gallery";
import { QuickRSVP } from "./components/QuickRSVP";
import { FloatingPetals } from "./components/FloatingPetals";

const ceremonyDate = new Date("2025-11-20T17:00:00-03:00");
const speechDate = new Date("2025-11-21T12:00:00-03:00");
const partyDate = new Date("2025-11-21T21:00:00-03:00");

const CIVIL_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26200.720280748734!2d-58.27765373592045!3d-34.828828727879674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32966b89ed721%3A0xa5c5ad6a11f5955a!2sRegistro%20Civil%20Florencio%20Varela!5e0!3m2!1ses-419!2sar!4v1757352486737!5m2!1ses-419!2sar";
const SPEECH_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.2567689605426!2d-58.28083604072226!3d-34.842598039150104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3294af5890c8d%3A0x41ca58e79794f67e!2sSal%C3%B3n%20del%20Reino%20de%20los%20Testigos%20de%20Jehov%C3%A1!5e0!3m2!1ses-419!2sar!4v1757353022520!5m2!1ses-419!2sar";
const PARTY_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d649.7463747510438!2d-58.27897337815385!3d-34.843254141845065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3298a5b91a24f%3A0x6e2d226884afa15a!2sSalon%20Monserrat!5e0!3m2!1ses-419!2sar!4v1757353962620!5m2!1ses-419!2sar";

export default function App() {
  const apiUrl =
    (import.meta.env as any).VITE_API_GUEST ||
    ((import.meta.env as any).VITE_API_URL as string | undefined);
  const alias = import.meta.env.VITE_GIFT_ALIAS as string | undefined;
  const cbu = import.meta.env.VITE_GIFT_CBU as string | undefined;
  const songUrl = import.meta.env.VITE_API_SONGS as string | undefined;
  const hasApi = useMemo(() => Boolean(apiUrl && apiUrl.length > 0), [apiUrl]);

  const [song, setSong] = useState<string>("");
  const [songSent, setSongSent] = useState<"idle" | "ok" | "error">("idle");

  async function sendSongSuggestion() {
    if (!song.trim() || !hasApi) return;
    console.log(`${songUrl}`);
    try {
      await fetch(`${songUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song }),
      });
      setSong("");
      setSongSent("ok");
    } catch {
      setSongSent("error");
    }
  }

  return (
    <div>
      <FloatingPetals />
      <header className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1>Mariana & Alexis</h1>
          <p className="hero__subtitle">20—21 Noviembre 2025</p>
        </div>
      </header>

      <section className="section section--light">
        <h2>⏰ Cuenta regresiva</h2>
        <p className="lead">
          Falta muy poco para celebrar juntos y queremos que seas parte del
          comienzo de nuestra historia💕
        </p>
        <br />
        <Countdown targetDate={ceremonyDate} label="Ceremonia civil" />
      </section>

      <div className="divider"></div>

      <section className="section">
        <h2>📅 Agenda</h2>
        <ul className="timeline">
          <li>
            <h3>Ceremonia civil</h3>
            <p>20/11/2025 · Horario a Confirmar</p>
          </li>
          <li>
            <h3>Discurso</h3>
            <p>21/11/2025 · 17:30</p>
          </li>
          <li>
            <h3>Fiesta</h3>
            <p>21/11/2025 · 18:30</p>
          </li>
        </ul>
      </section>

      <div className="divider"></div>

      <section className="section section--light">
        <h2>📍 Ubicaciones</h2>
        <div className="map-grid">
          <div className="card">
            <iframe
              title="Registro Civil"
              loading="lazy"
              allowFullScreen
              src={CIVIL_MAP}
            ></iframe>
            <div className="card__body">
              <h3 className="card__title">Registro Civil</h3>
              <p className="card__meta">
                Bartolomé Mitre 253, Florencio Varela
              </p>
              <p className="card__time">Jueves 20 de Noviembre· 13:00</p>
              <a
                className="link"
                href="https://maps.app.goo.gl/syA3ASZ6rhkXH9YB9"
                target="_blank"
                rel="noreferrer"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
          <div className="card">
            <iframe
              title="Salón de Conferencias"
              loading="lazy"
              allowFullScreen
              src={SPEECH_MAP}
            ></iframe>
            <div className="card__body">
              <h3 className="card__title">Salón de Conferencias</h3>
              <p className="card__meta">Av. Carioboni 935, Florencio Varela</p>
              <p className="card__time">Viernes 21 de Noviembre · 17:00</p>
              <a
                className="link"
                href="https://maps.app.goo.gl/3eH2GtEvvks45h3r6"
                target="_blank"
                rel="noreferrer"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
          <div className="card">
            <iframe
              title="Salón de Fiestas"
              loading="lazy"
              allowFullScreen
              src={PARTY_MAP}
            ></iframe>
            <div className="card__body">
              <h3 className="card__title">Salón de Fiestas</h3>
              <p className="card__meta">Av. Eva Perón 6824, Florencio Varela</p>
              <p className="card__time">Viernes 21 de noviembre · 21:00</p>
              <a
                className="link"
                href="https://maps.app.goo.gl/nYkJMCPhZM7GNgBK6"
                target="_blank "
                rel="noreferrer"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <h2>💌 Confirmá tu asistencia</h2>
        {hasApi ? (
          <>
            <RSVPForm
              apiUrl={apiUrl!}
              ceremonyDate={ceremonyDate}
              speechDate={speechDate}
              partyDate={partyDate}
            />
          </>
        ) : (
          <p className="hint">Configura VITE_API_URL en tu archivo .env</p>
        )}
      </section>

      <div className="divider"></div>

      <section className="section section--light">
        <h2>🎵 Recomendá una canción</h2>
        <p className="lead">
          Queremos que la pista sea de todos. ¡Sugerí tu tema! 🎶
        </p>
        <div className="rsvp">
          <label>
            <span>Tema o artista</span>
            <input
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Ej: Coldplay - Yellow"
            />
          </label>
          <div className="actions">
            <button
              onClick={sendSongSuggestion}
              disabled={!hasApi || !song.trim()}
            >
              Enviar
            </button>
            {songSent === "ok" && (
              <span className="success">¡Gracias por tu sugerencia! 🎉</span>
            )}
            {songSent === "error" && (
              <span className="error">No pudimos guardar tu sugerencia 😔</span>
            )}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <h2>👗 Dress code 👔</h2>
        <div className="info">
          <p>Elegante, formal, modesto ✨</p>
          <p>
            <span className="badge">Tip</span> Traé zapatos cómodos, vas a
            bailar 🕺💃
          </p>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section section--light">
        <h2>📸 Nuestras fotos</h2>
        <Gallery />
      </section>

      <div className="divider"></div>

      <section className="section section--light">
        <h2>🎁 Regalos</h2>
        <p className="lead">
          Tu presencia es el mejor obsequio, pero si deseas colaborar con el
          inicio de nuestro hogar y/o nuestra luna de miel, te lo
          agradereceremos infinitamente 💝
        </p>
        <div className="info">
          <p>
            Alias: <strong>{alias ?? "mariana.alexis.boda"}</strong>
          </p>
          <p>
            CBU: <strong>{cbu ?? "0000000000000000000000"}</strong>
          </p>
        </div>
      </section>

      <footer className="footer"> ❤️ Con cariño, M & A ❤️</footer>
    </div>
  );
}
