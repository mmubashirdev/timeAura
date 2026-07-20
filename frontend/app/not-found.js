'use client';

import Link from 'next/link';
import FuzzyText from '@/components/ui/FuzzyText';

export default function NotFound() {
  return (
    <div style={styles.page}>
      {/* Ambient background blobs */}
      <div style={styles.blobMaroon} />
      <div style={styles.blobGold} />

      <div style={styles.content}>
        {/* Fuzzy 404 */}
        <div style={styles.fuzzyWrap}>
          <FuzzyText
            fontSize="clamp(6rem, 20vw, 14rem)"
            fontWeight={900}
            color="#800020"
            baseIntensity={0.15}
            hoverIntensity={0.55}
            enableHover={true}
            glitchMode={true}
            glitchInterval={3000}
            glitchDuration={180}
            transitionDuration={8}
            clickEffect={true}
            gradient={['#800020', '#C9A14A', '#800020']}
          >
            404
          </FuzzyText>
        </div>

        {/* Text content */}
        <h1 style={styles.heading}>Page Not Found</h1>
        <p style={styles.subtext}>
          The page you&apos;re looking for has drifted into the void.
          <br />
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div style={styles.actions}>
          <Link href="/" style={styles.btnPrimary}>
            Back to Home
          </Link>
          <Link href="/collections" style={styles.btnSecondary}>
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    background: '#0d0008',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
  },
  blobMaroon: {
    position: 'absolute',
    top: '-10%',
    left: '-15%',
    width: '60vw',
    height: '60vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(128,0,32,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },
  blobGold: {
    position: 'absolute',
    bottom: '-10%',
    right: '-15%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,161,74,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    gap: '1rem',
  },
  fuzzyWrap: {
    lineHeight: 1,
    userSelect: 'none',
  },
  heading: {
    margin: '0.5rem 0 0',
    fontSize: 'clamp(1.25rem, 3vw, 2rem)',
    fontWeight: 600,
    color: '#f5f0eb',
    letterSpacing: '0.02em',
    fontFamily: 'var(--font-playfair), Georgia, serif',
  },
  subtext: {
    margin: '0.25rem 0 1.5rem',
    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
    color: 'rgba(245,240,235,0.55)',
    lineHeight: 1.7,
    maxWidth: '420px',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    borderRadius: '9999px',
    background: 'linear-gradient(135deg, #800020 0%, #9a3b49 100%)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'opacity 0.2s, transform 0.2s',
    boxShadow: '0 4px 24px rgba(128,0,32,0.35)',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    borderRadius: '9999px',
    background: 'transparent',
    color: '#C9A14A',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    border: '1.5px solid rgba(201,161,74,0.45)',
    transition: 'border-color 0.2s, background 0.2s',
  },
};
