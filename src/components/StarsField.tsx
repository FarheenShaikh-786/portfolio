import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/** Subtle animated star field + parallax on scroll */
export function StarsField() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 80])
  const y2 = useTransform(scrollY, [0, 500], [0, 40])

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + (i % 7) * 13) % 100}%`,
        top: `${(i * 23 + (i % 5) * 11) % 100}%`,
        size: 1 + (i % 3),
        delay: (i % 10) * 0.15,
        duration: 2.5 + (i % 5) * 0.4,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,245,255,0.12),transparent)]" />
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 6px rgba(0,245,255,0.6)',
            }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
