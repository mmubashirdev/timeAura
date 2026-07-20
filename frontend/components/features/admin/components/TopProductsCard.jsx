import SectionCard from "./SectionCard";
import { topProducts as mockProducts } from "../data/dashboardData";

export default function TopProductsCard({ data }) {
  const products = data && data.length > 0 ? data : mockProducts;

  return (
    <SectionCard title="Top Products" action="View All" actionHref="/admin/products">
      <div className="divide-y divide-border">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            {/* Thumbnail */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream-muted">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=P&background=F3ECE3&color=7A1F2E&size=40";
                }}
              />
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-900">
                {product.name}
              </p>
              <p className="text-[11px] text-ink-400">{product.category}</p>
            </div>

            {/* Sales */}
            <p className="text-sm font-bold text-ink-900">
              {product.sales}{" "}
              <span className="font-normal text-ink-400">Sales</span>
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}