'use client';

import Link from 'next/link';
import FuzzyText from '@/components/ui/FuzzyText';

export default function AdminNotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        {/* Fuzzy 404 — maroon on cream, admin palette */}
        <div style={styles.fuzzyWrap}>
          <FuzzyText
            fontSize="clamp(4rem, 14vw, 10rem)"
            fontWeight={900}
            color="#7a1f2e"
            baseIntensity={0.12}
            hoverIntensity={0.45}
            enableHover={true}
            glitchMode={true}
            glitchInterval={3500}
            glitchDuration={160}
            transitionDuration={6}
            clickEffect={true}
          >
            404
          </FuzzyText>
        </div>

        <h1 style={styles.heading}>Page Not Found</h1>
        <p style={styles.subtext}>
          This admin page doesn&apos;t exist or has been moved.
        </p>

        <div style={styles.actions}>
          <Link href="/admin" style={styles.btnPrimary}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    background: 'transparent',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0.75rem',
    padding: '2rem',
  },
  fuzzyWrap: {
    lineHeight: 1,
    userSelect: 'none',
  },
  heading: {
    margin: '0.25rem 0 0',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    fontWeight: 600,
    color: '#2b211d',
    letterSpacing: '0.01em',
  },
  subtext: {
    margin: '0 0 1.25rem',
    fontSize: '0.95rem',
    color: '#6b6058',
    lineHeight: 1.6,
    maxWidth: '340px',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.65rem 1.75rem',
    borderRadius: '8px',
    background: '#7a1f2e',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.9rem',
    textDecoration: 'none',
    letterSpacing: '0.01em',
    transition: 'background 0.2s',
    boxShadow: '0 2px 12px rgba(122,31,46,0.25)',
  },
};
