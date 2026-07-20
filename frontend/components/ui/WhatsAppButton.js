"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "923127721817";
const WHATSAPP_MESSAGE = "Hello! I'm interested in buying your products.";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Don't show on any admin pages
  if (pathname?.startsWith("/admin")) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .wa-btn {
          animation: wa-pulse 2.2s infinite;
        }
        .wa-btn:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 8px 32px rgba(37, 211, 102, 0.45);
        }
        .wa-tooltip {
          opacity: 0;
          pointer-events: none;
          transform: translateX(8px);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .wa-wrapper:hover .wa-tooltip {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }
      `}</style>

      <div
        className="wa-wrapper"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Tooltip label */}
        <div
          className="wa-tooltip"
          style={{
            background: "#111827",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
            padding: "7px 13px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            fontFamily: "var(--font-inter, sans-serif)",
          }}
        >
          Chat with us
          {/* tail */}
          <span
            style={{
              position: "absolute",
              right: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "6px solid #111827",
            }}
          />
        </div>

        {/* WhatsApp button */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          aria-label="Chat with us on WhatsApp"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
            color: "#fff",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            transition: "transform 0.22s ease, box-shadow 0.22s ease",
            flexShrink: 0,
          }}
        >
          {/* Official WhatsApp SVG logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="#fff"
            aria-hidden="true"
          >
            <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.627 4.623 1.817 6.608L2.667 29.333l6.895-1.788A13.28 13.28 0 0 0 16.003 29.333C23.368 29.333 29.333 23.362 29.333 16S23.368 2.667 16.003 2.667zm0 24.267a11.02 11.02 0 0 1-5.613-1.533l-.402-.24-4.093 1.062 1.09-3.977-.263-.413A10.976 10.976 0 0 1 5.002 16c0-6.072 4.928-11 11.001-11C22.075 5 27 9.928 27 16s-4.928 10.934-10.997 10.934zm6.03-8.202c-.33-.165-1.955-.963-2.258-1.073-.303-.11-.524-.165-.745.165-.22.33-.853 1.073-1.046 1.293-.193.22-.385.248-.715.083-.33-.165-1.393-.513-2.652-1.636-.98-.874-1.643-1.953-1.836-2.283-.193-.33-.02-.508.146-.673.149-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.745-1.797-1.02-2.46-.268-.647-.54-.56-.745-.57l-.633-.01c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.327 3.553 5.64 4.985.789.34 1.404.543 1.883.695.79.252 1.51.216 2.077.131.634-.094 1.955-.8 2.23-1.572.275-.77.275-1.43.193-1.568-.083-.138-.302-.22-.633-.385z" />
          </svg>
        </a>
      </div>
    </>
  );
}
