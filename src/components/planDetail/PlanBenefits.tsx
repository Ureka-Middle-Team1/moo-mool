"use client";

import { useKeenSlider } from "keen-slider/react";
import BenefitCard from "@/components/benefit/BenefitCard";

interface Benefit {
  imageSrc: string;
  title: string;
  description: string;
}

interface PlanBenefitsProps {
  benefits: Benefit[];
}

export default function PlanBenefits({ benefits }: PlanBenefitsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.5,
      spacing: 15,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider py-2">
      {benefits.map((item, index) => (
        <div key={index} className="keen-slider__slide">
          <BenefitCard
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
}
