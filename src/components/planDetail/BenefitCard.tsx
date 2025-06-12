'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface BenefitCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function BenefitCard({ imageSrc, title, description }: BenefitCardProps) {
  return (
    <Card className="w-[160px] h-[240px] rounded-xl shadow-md flex flex-col items-center justify-start p-4 bg-white">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
        <Image src={imageSrc} alt={title} width={96} height={96} className="object-cover" />
      </div>
      <h3 className="text-sm font-semibold text-center">{title}</h3>
      <p className="text-xs text-gray-600 text-center mt-1">{description}</p>
    </Card>
  );
}
