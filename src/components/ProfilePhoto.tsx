import { motion } from 'framer-motion'
import { useState } from 'react'
import Tilt from 'react-parallax-tilt'

const PROFILE_SRC = '/profile.jpeg'

/**
 * Premium circular profile: centered crop, inner padding, neon gradient ring,
 * floating + pulse glow, stronger glow on hover.
 */
export function ProfilePhoto({ className = '' }: { className?: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Outer blurred glow (blue → purple) — intensifies on hover */}
      <div
        className={`pointer-events-none absolute -inset-6 rounded-full blur-2xl sm:-inset-8 sm:blur-3xl ${
          hovered ? 'profile-avatar-aura--hover' : 'profile-avatar-aura'
        }`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/25 blur-xl"
        style={{
          opacity: hovered ? 1 : 0.65,
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
        aria-hidden
      />

      <motion.div
        className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48 lg:w-48"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Tilt
          glareEnable
          glareMaxOpacity={0.25}
          glareColor="#00f5ff"
          glarePosition="all"
          scale={1.03}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          transitionSpeed={1400}
          className="h-full w-full rounded-full"
        >
          {/* Soft blue + purple gradient ring (perfect circle) */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan-300/70 to-secondary p-[2px] ${
              hovered ? '' : 'profile-avatar-ring-pulse'
            }`}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            style={
              hovered
                ? {
                    filter:
                      'drop-shadow(0 0 16px rgba(0,245,255,0.85)) drop-shadow(0 0 36px rgba(122,92,255,0.65))',
                  }
                : undefined
            }
          >
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <img
                src={PROFILE_SRC}
                alt="Farheen Shaikh"
                width={256}
                height={256}
                decoding="async"
                className="h-full w-full rounded-full object-cover object-top transition duration-300 hover:scale-[1.18]"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 18%',
                  transform: 'scale(1.16)',
                }}
                loading="eager"
              />
            </div>
          </motion.div>
        </Tilt>

        {/* Extra pulse halo (behind ring, same footprint) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-full"
          style={{
            animation: hovered ? 'none' : 'neon-pulse-ring 3s ease-in-out infinite',
            opacity: hovered ? 1 : undefined,
            boxShadow: hovered
              ? '0 0 50px rgba(0,245,255,0.5), 0 0 90px rgba(122,92,255,0.4), 0 0 40px rgba(255,78,205,0.15)'
              : undefined,
            transition: 'box-shadow 0.35s ease, opacity 0.35s ease',
          }}
          aria-hidden
        />
      </motion.div>
    </div>
  )
}
