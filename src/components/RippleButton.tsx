import {
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
}

export function RippleButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
  ...rest
}: Props) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const base =
    'relative overflow-hidden rounded-full font-semibold transition-transform active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100'

  const variants = {
    primary:
      'bg-gradient-to-r from-primary via-cyan-400 to-secondary text-[#050816] shadow-[0_0_28px_rgba(0,245,255,0.45)] hover:shadow-[0_0_40px_rgba(122,92,255,0.55)]',
    ghost:
      'border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md hover:border-primary/50 hover:bg-white/10 hover:text-primary',
    outline:
      'border border-primary/40 bg-[#0a0f24]/80 text-slate-100 hover:border-accent/60 hover:shadow-[0_0_24px_rgba(255,78,205,0.25)]',
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const id = Date.now()
      setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
      setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 600)
    }
    onClick?.(e)
  }

  return (
    <button
      ref={btnRef}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-10 w-10 animate-ripple rounded-full bg-white/35"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}
