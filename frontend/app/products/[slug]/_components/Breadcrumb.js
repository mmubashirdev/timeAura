import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center flex-wrap text-sm text-neutral-500 py-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          {i > 0 && (
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-neutral-400" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#800020] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#800020] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
