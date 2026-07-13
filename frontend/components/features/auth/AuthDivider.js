export default function AuthDivider({ label = "OR" }) {
  return (
    <div
      className="flex items-center gap-4"
      role="separator"
      aria-label={label}
    >
      <div className="flex-1 h-px bg-neutral-200" />
      <span className="text-xs text-neutral-500 tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-neutral-200" />
    </div>
  );
}
