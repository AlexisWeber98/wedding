import { useState } from "react";
import { callLambda } from "../lib/api";

type RSVPFormProps = {
  apiUrl: string;
  ceremonyDate: Date;
  speechDate: Date;
  partyDate: Date;
};

type RSVPStatus = "si" | "no" | "talvez";

type RSVPBody = {
  name: string;
  guests: number;
  attendsSpeech: RSVPStatus;
  attendsParty: RSVPStatus;
};

export function RSVPForm({ apiUrl }: RSVPFormProps) {
  const [form, setForm] = useState<RSVPBody>({
    name: "",
    guests: 1,
    attendsSpeech: "si",
    attendsParty: "si",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await callLambda(apiUrl!, "addGuest", {
        guest: {
          name: form.name,
          guests: form.guests,
          attendsSpeech: form.attendsSpeech,
          attendsParty: form.attendsParty,
        },
      });
      setStatus("ok");
    } catch (err: any) {
      setError(err?.message ?? "No se pudo enviar la confirmación");
      setStatus("error");
    }
  }

  return (
    <form className="rsvp" onSubmit={onSubmit}>
      <div className="grid">
        <label>
          <span>Nombre y apellido</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ej: Mariana García"
          />
        </label>
      </div>

      <fieldset className="grid">
        <legend>¿Participás de...?</legend>
        <label>
          <span>Discurso</span>
          <select
            value={form.attendsSpeech}
            onChange={(e) =>
              setForm({ ...form, attendsSpeech: e.target.value as RSVPStatus })
            }
          >
            <option value="si">Sí</option>
            <option value="no">No</option>
            <option value="talvez">Tal vez</option>
          </select>
        </label>
        <label>
          <span>Fiesta</span>
          <select
            value={form.attendsParty}
            onChange={(e) =>
              setForm({ ...form, attendsParty: e.target.value as RSVPStatus })
            }
          >
            <option value="si">Sí</option>
            <option value="no">No</option>
            <option value="talvez">Tal vez</option>
          </select>
        </label>
      </fieldset>

      <div className="actions">
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Confirmar"}
        </button>
        {status === "ok" && (
          <span className="success">¡Gracias! Recibimos tu confirmación.</span>
        )}
        {status === "error" && <span className="error">{error}</span>}
      </div>
    </form>
  );
}

