import { useMemo } from 'react'
import { usePortfolioSummary } from '../../api'
import { WidgetCard, WidgetSkeleton } from '../common'

const HAPPY_MESSAGES = [
  '아빠 오늘 잘 버셨어요! 치킨 사주세요 🍗',
  '주식이 올랐어요! 역시 아빠가 최고야 💪',
  '오늘 수익 좋네요! 딸 용돈도 올려주세요 😆',
  '아빠 포트폴리오 파이팅! 응원해요 📣',
]

const SAD_MESSAGES = [
  '아빠 오늘 조금 힘드셨죠? 괜찮아요 💪',
  '주식은 오를 때도 있고 내릴 때도 있어요. 화이팅!',
  '내일은 더 좋을 거예요! 아빠 믿어요 🌟',
  '잠깐의 하락이에요. 장기투자 믿어요! 💎',
]

interface PigMascotProps {
  mood: 'happy' | 'sad'
}

function PigMascot({ mood }: PigMascotProps) {
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

export function MascotWidget() {
  const { data, isLoading } = usePortfolioSummary()

  const { mood, message } = useMemo(() => {
    const happy = !data || data.todayGain >= 0
    const pool = happy ? HAPPY_MESSAGES : SAD_MESSAGES
    const msg = pool[Math.floor(Math.random() * pool.length)]
    return { mood: happy ? 'happy' as const : 'sad' as const, message: msg }
  }, [data])

  return (
    <WidgetCard title="딸 한마디" emoji="💌">
      {isLoading && <WidgetSkeleton />}
      {data !== undefined && (
        <div className="flex items-center gap-4 px-[22px] py-4 h-full">
          <div className="flex-shrink-0">
            <PigMascot mood={mood} />
          </div>
          <div
            className="relative flex-1 bg-bg-soft rounded-[var(--radius-sm)] px-4 py-3 text-sm text-ink"
            style={{ fontFamily: "'Gaegu', cursive", fontSize: '15px', lineHeight: 1.6 }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '10px solid var(--bg-soft)',
              }}
            />
            {message}
          </div>
        </div>
      )}
    </WidgetCard>
  )
}
