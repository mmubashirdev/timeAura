export default function SectionCard({ title, action, actionHref = "#", children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-cream-panel p-5 shadow-[0_2px_12px_rgba(43,33,29,0.06)] ${className}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
          {title}
        </h3>
        {action && (
          <a
            href={actionHref}
            className="text-xs font-medium text-maroon hover:underline"
          >
            {action} →
          </a>
        )}
      </div>
      {children}
    </div>
  );
}