export default function LegalSection({ number, title, children }) {
  return (
    <section aria-labelledby={`section-${number}`}>
      <h2
        id={`section-${number}`}
        className="font-serif text-xl lg:text-2xl font-semibold text-[#5c0016] mb-3"
      >
        {number}. {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
