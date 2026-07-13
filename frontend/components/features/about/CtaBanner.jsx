"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="w-full bg-[#FAFAFA] pb-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#5c0016] px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-6 md:justify-between">
          <div className="flex items-center gap-5">
            {/* Two shopping bags illustration on the left */}
            <div className="relative w-24 h-24 hidden md:block shrink-0">
              <Image
                src="/images/time-products/perfume5.jpg"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover rounded-xl opacity-90"
                sizes="96px"
              />
            </div>
            <div className="text-white">
              <h3 className="font-serif text-2xl lg:text-3xl mb-1">
                Ready to Discover Something Amazing?
              </h3>
              <p className="text-xs md:text-sm text-white/80 max-w-md">
                Explore premium products from trusted brands and enjoy a
                shopping experience you can rely on.
              </p>
            </div>
          </div>

          <Link href="/#best-sellers">
            <Button className="h-12 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#5c0016] text-sm font-semibold gap-2">
              Explore Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
