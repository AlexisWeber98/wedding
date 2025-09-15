import { useEffect, useState } from 'react'

function formatTime(msRemaining: number) {
	const totalSeconds = Math.max(0, Math.floor(msRemaining / 1000))
	const days = Math.floor(totalSeconds / (3600 * 24))
	const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return { days, hours, minutes, seconds }
}

export function Countdown({ targetDate, label }: { targetDate: Date; label?: string }) {
	const [now, setNow] = useState<Date>(new Date())

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	const remaining = targetDate.getTime() - now.getTime()
	const { days, hours, minutes, seconds } = formatTime(remaining)

	return (
		<div className="countdown">
			{label && <p className="countdown__label">{label}</p>}
			<div className="countdown__grid">
				<div className="countdown__item"><span>{days}</span><small>días</small></div>
				<div className="countdown__item"><span>{hours}</span><small>horas</small></div>
				<div className="countdown__item"><span>{minutes}</span><small>min</small></div>
				<div className="countdown__item"><span>{seconds}</span><small>seg</small></div>
			</div>
		</div>
	)
} 