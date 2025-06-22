"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface BenefitCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function BenefitCard({
  imageSrc,
  title,
  description,
}: BenefitCardProps) {
  return (
    <Card className="mb-4 flex h-60 w-40 flex-col items-center justify-start rounded-xl border border-gray-200 bg-white px-4 py-5">
      <div className="border-black-500 relative mb-3 aspect-square w-24 overflow-hidden rounded-full border-1 shadow">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>

      <h3 className="text-center text-sm font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-1 text-center text-xs leading-tight text-gray-700">
        {description}
      </p>
    </Card>
  );
}
