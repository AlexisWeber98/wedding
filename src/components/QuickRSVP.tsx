import { useEffect, useMemo, useState } from "react";
import { callLambda } from "../lib/api";

type QuickRSVPProps = {
	apiUrl: string;
};

type Status = "idle" | "sending" | "ok" | "error";

export function QuickRSVP({ apiUrl }: QuickRSVPProps) {
	const [name, setName] = useState("");
	const [status, setStatus] = useState<Status>("idle");
	const [error, setError] = useState<string | null>(null);
	const showCelebration = status === "ok";

	const confetti = useMemo(() => {
		return Array.from({ length: 120 }).map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 1.5,
			duration: 3.5 + Math.random() * 2,
			bg:
				["#f472b6", "#f9a8d4", "#ec4899", "#fde68a", "#93c5fd"][i % 5],
			rotate: Math.random() * 360,
			translateX: (Math.random() - 0.5) * 40,
		}))
	}, [])

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") closeModal()
		}
		if (showCelebration) window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [showCelebration])

	async function submit() {
		if (!name.trim()) return;
		setStatus("sending");
		setError(null);
		try {
			await callLambda(apiUrl, "addGuest", {
				guest: {
					name,
					guests: 1,
					attendsCeremony: "si",
					attendsSpeech: "si",
					attendsParty: "si",
				},
			});
			setStatus("ok");
			setName("");
		} catch (e: any) {
			setError(e?.message ?? "No se pudo confirmar");
			setStatus("error");
		}
	}

	function closeModal() {
		setStatus("idle")
	}

	return (
		<div className="rsvp">
			<label>
				<span>Nombre y apellido</span>
				<input
					placeholder="Ej: Mariana García"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<div className="actions">
				<button onClick={submit} disabled={!name.trim() || status === "sending"}>
					{status === "sending" ? "Enviando..." : "Confirmar asistencia"}
				</button>
				{status === "error" && <span className="error">{error}</span>}
			</div>

			{showCelebration && (
				<>
					<div className="confetti-container">
						{confetti.map((c) => (
							<div
								key={c.id}
								className="confetti-piece"
								style={{
									left: `${c.left}%`,
									background: c.bg,
									transform: `translateX(${c.translateX}px) rotate(${c.rotate}deg)`,
									animation: `confettiFall ${c.duration}s linear ${c.delay}s both`,
								}}
							/>
						))}
					</div>
					<div className="modal-overlay" onClick={closeModal}>
						<div className="modal" onClick={(e) => e.stopPropagation()}>
							<h3>¡Gracias por confirmar!</h3>
							<p>Nos vemos para celebrar juntos. ✨</p>
							<div className="actions">
								<button onClick={closeModal}>Cerrar</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
} 