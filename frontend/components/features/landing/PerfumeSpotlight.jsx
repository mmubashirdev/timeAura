'use client';

import Image from 'next/image';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const CARDS = [
  {
    id: 'perfume',
    label: 'SIGNATURE FRAGRANCES',
    heading: 'Scents That Tell\nYour Story',
    body: 'Handcrafted Oud and floral blends that linger — from first spray to last memory.',
    cta: 'Explore Perfumes',
    href: '/collections?category=perfume',
    image: '/images/products/perfume.png',
    imageAlt: 'Time Aura perfume bottle',
    accent: '#800020',
    bg: 'linear-gradient(135deg, #1a0008 0%, #2d0012 60%, #3d0018 100%)',
    imageSide: 'right',
  },
  {
    id: 'watch',
    label: 'HERITAGE TIMEPIECES',
    heading: 'Crafted to Mark\nEvery Moment',
    body: 'Swiss-inspired precision, timeless design — a watch that speaks before you do.',
    cta: 'Shop Watches',
    href: '/collections?category=watch',
    image: '/images/products/watch.png',
    imageAlt: 'Time Aura Heritage watch',
    accent: '#C9A14A',
    bg: 'linear-gradient(135deg, #0d0a00 0%, #1a1400 60%, #252000 100%)',
    imageSide: 'left',
  },
  {
    id: 'wallet',
    label: 'PREMIUM LEATHER GOODS',
    heading: 'Luxury You Carry\nEvery Day',
    body: 'Full-grain leather wallets built to age beautifully — refined, slim, and always ready.',
    cta: 'View Wallets',
    href: '/collections?category=wallet',
    image: '/images/products/wallet.png',
    imageAlt: 'Time Aura leather wallet',
    accent: '#800020',
    bg: 'linear-gradient(135deg, #080808 0%, #111111 60%, #181818 100%)',
    imageSide: 'right',
  },
];

export default function PerfumeSpotlight() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#efdfd6] to-[#FAFAFA]">

      {/* section label — sits above the scroller in the stacking area */}
    

      {/*
       * useWindowScroll={true}  ← the critical fix:
       *   - Ties the stack animation to the page (window) scroll instead of
       *     an isolated inner div, so the page continues normally after the
       *     section is done and there is no white-screen trap.
       * blurAmount={0}          ← removes the GPU flicker on stacked cards.
       * The Lenis instance created here also smooths the entire page scroll
       * as a bonus while this component is mounted.
       */}
      <ScrollStack
        useWindowScroll={true}
        itemDistance={110}
        itemScale={0.03}
        itemStackDistance={28}
        stackPosition="20%"
        scaleEndPosition="10%"
        baseScale={0.87}
        rotationAmount={0}
        blurAmount={0}
        className="spotlight-scroller"
      >
        {CARDS.map((card) => (
          <ScrollStackItem key={card.id} itemClassName="spotlight-card">
            <div
              className="spotlight-card-inner"
              style={{ background: card.bg }}
            >
              {/* ── Text ── */}
              <div
                className={`spotlight-text${
                  card.imageSide === 'left' ? ' spotlight-text--right' : ''
                }`}
              >
                <p className="spotlight-eyebrow" style={{ color: card.accent }}>
                  {card.label}
                </p>
                <h2 className="spotlight-heading">
                  {card.heading.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < card.heading.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="spotlight-body">{card.body}</p>
                <a
                  href={card.href}
                  className="spotlight-cta"
                  style={{
                    background: card.accent,
                    boxShadow: `0 4px 24px ${card.accent}55`,
                  }}
                >
                  {card.cta} →
                </a>
              </div>

              {/* ── Image ── */}
              <div
                className={`spotlight-image-wrap${
                  card.imageSide === 'left' ? ' spotlight-image-wrap--left' : ''
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="spotlight-img"
                  priority={card.id === 'perfume'}
                />
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <style>{`
        /* ── label ── */
        .spotlight-label {
          position: absolute;
          top: 1.25rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          font-weight: 700;
          color: #800020;
          white-space: nowrap;
          pointer-events: none;
        }

        /*
         * Override the ScrollStack scroller so it does NOT create its own
         * scroll container — window scroll handles everything.
         */
        .spotlight-scroller {
          overflow: visible !important;
          height: auto !important;
          overscroll-behavior: auto !important;
          will-change: auto !important;
        }

        /*
         * Reduce the default 50rem bottom padding to something tighter so
         * the next section appears sooner after the last card unpins.
         */
        .spotlight-scroller .scroll-stack-inner {
          padding: 12vh 1.5rem 28rem !important;
        }

        /* ── card shell ── */
        .spotlight-card {
          height: 70vh !important;
          max-height: 560px !important;
          padding: 0 !important;
          border-radius: 24px !important;
          overflow: hidden !important;
          max-width: 980px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          /* Prevent sub-pixel rendering glitches on transform */
          isolation: isolate;
        }

        .spotlight-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* ── text block ── */
        .spotlight-text {
          position: relative;
          z-index: 2;
          flex: 0 0 50%;
          padding: 3rem 2.5rem 3rem 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .spotlight-text--right {
          order: 2;
          margin-left: auto;
          padding: 3rem 3.5rem 3rem 2.5rem;
        }

        .spotlight-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 0.25em;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
        }

        .spotlight-heading {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(1.5rem, 2.4vw, 2.2rem);
          font-weight: 700;
          color: #f5f0eb;
          line-height: 1.2;
          margin: 0;
          white-space: pre-line;
        }

        .spotlight-body {
          font-size: 0.88rem;
          color: rgba(245,240,235,0.58);
          line-height: 1.75;
          margin: 0;
          max-width: 320px;
        }

        .spotlight-cta {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          margin-top: 0.5rem;
          transition: opacity 0.2s, transform 0.2s;
        }

        .spotlight-cta:hover {
          opacity: 0.85;
          transform: translateX(4px);
        }

        /* ── image block ── */
        .spotlight-image-wrap {
          position: absolute;
          right: -2%;
          top: 50%;
          transform: translateY(-50%);
          width: 52%;
          height: 115%;
          z-index: 1;
          pointer-events: none;
        }

        .spotlight-image-wrap--left {
          right: auto;
          left: -2%;
        }

        .spotlight-img {
          object-fit: contain !important;
          object-position: center !important;
          filter: drop-shadow(0 24px 64px rgba(0,0,0,0.6));
        }

        /* ── mobile ── */
        @media (max-width: 640px) {
          .spotlight-card {
            height: 78vh !important;
            max-height: none !important;
          }

          .spotlight-card-inner {
            flex-direction: column;
            justify-content: flex-end;
          }

          .spotlight-text,
          .spotlight-text--right {
            order: 2;
            flex: none;
            width: 100%;
            padding: 1.5rem;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
          }

          .spotlight-body {
            max-width: 100%;
          }

          .spotlight-image-wrap,
          .spotlight-image-wrap--left {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 62%;
            transform: none;
          }

          .spotlight-scroller .scroll-stack-inner {
            padding: 8vh 0.75rem 22rem !important;
          }
        }
      `}</style>
    </section>
  );
}
