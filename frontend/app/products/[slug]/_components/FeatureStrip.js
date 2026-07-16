import { Truck, Shield, Package, Lock } from "lucide-react";

const items = [
  { icon: Truck, title: "Free Worldwide Shipping", subtitle: "On all orders" },
  { icon: Shield, title: "2 Year Warranty", subtitle: "Premium coverage" },
  { icon: Package, title: "Easy Returns", subtitle: "Hassle free" },
  { icon: Lock, title: "Secure Payments", subtitle: "100% safe & secure" },
];

export default function FeatureStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-neutral-100 rounded-2xl p-6 my-10">
      {items.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-neutral-50 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#800020]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 leading-tight">
              {title}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
