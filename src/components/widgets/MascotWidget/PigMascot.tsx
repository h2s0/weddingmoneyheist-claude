import type { MascotMood } from './constants'

interface PigMascotProps {
  mood: MascotMood
}

export function PigMascot({ mood }: PigMascotProps) {
  const eyeY = mood === 'happy' ? 38 : 40
  const mouthD =
    mood === 'happy'
      ? 'M 38 58 Q 48 66 58 58'
      : 'M 38 64 Q 48 56 58 64'

  return (
    <svg width="72" height="72" viewBox="0 0 96 96" aria-hidden>
      <ellipse cx="48" cy="56" rx="34" ry="32" fill="var(--pink)" />
      <ellipse cx="28" cy="30" rx="14" ry="16" fill="var(--pink)" />
      <ellipse cx="68" cy="30" rx="14" ry="16" fill="var(--pink)" />
      <ellipse cx="28" cy="32" rx="8" ry="10" fill="var(--pink-deep)" />
      <ellipse cx="68" cy="32" rx="8" ry="10" fill="var(--pink-deep)" />
      <ellipse cx="48" cy="56" rx="34" ry="32" fill="var(--pink)" />
      <ellipse cx="41" cy={eyeY} rx="4" ry="4.5" fill="var(--ink)" />
      <ellipse cx="55" cy={eyeY} rx="4" ry="4.5" fill="var(--ink)" />
      <ellipse cx="42" cy={eyeY - 1} rx="1.5" ry="1.5" fill="white" />
      <ellipse cx="56" cy={eyeY - 1} rx="1.5" ry="1.5" fill="white" />
      <ellipse cx="48" cy="66" rx="12" ry="8" fill="var(--pink-deep)" opacity="0.6" />
      <ellipse cx="44" cy="66" rx="3.5" ry="2.5" fill="var(--coral-deep)" opacity="0.5" />
      <ellipse cx="52" cy="66" rx="3.5" ry="2.5" fill="var(--coral-deep)" opacity="0.5" />
      <path d={mouthD} stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
