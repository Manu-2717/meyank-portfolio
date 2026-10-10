// Adapted from UFC Website's ransom.tsx (Apache-2.0).
// See NOTICE and licenses/UFC-LICENSE.txt for attribution and terms.
import type { CSSProperties } from 'react'

type Face = 'display' | 'serif' | 'pixel' | 'hand' | 'code'
const faces: Record<Face, CSSProperties> = {
  display: { fontFamily: 'Manrope, sans-serif', fontWeight: 800, letterSpacing: '-.05em' },
  serif: { fontFamily: 'Georgia, serif', fontStyle: 'italic' },
  pixel: { fontFamily: 'DM Mono, monospace', fontWeight: 700 },
  hand: { fontFamily: 'Comic Sans MS, cursive', fontWeight: 700 },
  code: { fontFamily: 'DM Mono, monospace', fontWeight: 700, letterSpacing: '-.08em' },
}
const clips = [
  'polygon(2% 6%,18% 0,40% 4%,64% 0,98% 3%,100% 36%,96% 68%,100% 96%,70% 100%,38% 96%,6% 100%,0 70%,3% 34%)',
  'polygon(0 4%,30% 0,58% 5%,100% 0,97% 30%,100% 62%,95% 100%,62% 96%,30% 100%,3% 95%,6% 60%,0 32%)',
  'polygon(4% 0,36% 5%,70% 0,100% 6%,96% 38%,100% 70%,97% 100%,66% 95%,34% 100%,0 96%,4% 64%,0 30%)',
]
const colors = ['#f7f2e4', '#ffe36e', '#ffb3cf', '#9af2c6', '#c7b3ff', '#9bd7ff', '#ffffff', '#ff9d7a']
const faceOrder: Face[] = ['display', 'serif', 'pixel', 'hand', 'code', 'serif', 'display']

/** Each character is a different paper cutout, deterministically varied. */
export function Ransom({ text, seed = 0 }: { text: string; seed?: number }) {
  return <span className="ransom" role="text" aria-label={text}>{[...text].map((letter, index) => {
    const n = (index * 7 + seed * 5) % 17
    const space = letter === ' '
    return <span key={index} className="ransom-tile" aria-hidden="true" style={{
      ...faces[faceOrder[(index + seed) % faceOrder.length]],
      background: space ? 'transparent' : colors[(index * 3 + seed) % colors.length],
      clipPath: space ? undefined : clips[(index + seed) % clips.length],
      padding: space ? '0 .14em' : /[gjpqy]/.test(letter) ? '.02em .1em .24em' : '.02em .1em .06em',
      transform: `translateY(${((n % 5) - 2) * .035}em) rotate(${((n % 7) - 3) * 1.7}deg)`,
      animationDelay: `${index * 65}ms`,
    }}>{space ? '\u00a0' : letter}</span>
  })}</span>
}
