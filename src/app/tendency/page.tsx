'use client';

import { useEffect, useState } from 'react';
import TendencyRadarChart from '@/components/chart/TendencyRadarChart';
import TendencyBarChart from '@/components/chart/TendencyBarChart';
import { ChevronLeft } from 'lucide-react';
import TagBadge from '@/components/common/TagBadge';
import PlanModeToggle from '@/components/planDetail/PlanModeToggle';
import BenefitCard from '@/components/benefit/BenefitCard';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function PlanDetailPage() {
  const [radarData, setRadarData] = useState<number[]>([]);
  const [barData, setBarData] = useState<number[]>([]);
  const [compareData, setCompareData] = useState<number[]>([]);
  const [planName, setPlanName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<{ imageSrc: string; title: string; description: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'basic' | 'compare'>('basic');

  const isRounded = true;

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.5, //한 페이지에 카드가 1.5개 들어감.
      spacing: 15,  //카드 여백 간격임.
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tendency`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message);

        setRadarData(json.radar);
        setBarData(json.bar);
        setCompareData(json.compare);
        setPlanName(json.name);
        setPrice(json.price);
        setTags(json.tags);
        setBenefits(json.benefits);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!radarData.length || !barData.length)
    return <div className="p-4 text-gray-500"> 데이터 로딩 중...</div>;

  return (
    <main className="flex flex-col items-center space-y-8 min-h-screen bg-gradient-to-b from-[#fff6d8] to-white">
      <section className="w-full max-w-md">
        <div className="relative w-full flex items-center h-12 bg-[#ffffff] mb-3">
          <div className="flex items-center px-4">
            <ChevronLeft className="h-10 w-6" />
          </div>

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
            요금제 상세 정보
          </span>
        </div>

        <div className="px-8">
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight mt-[20px]">{planName}</h1>
          <p className="text-[17px] font-semibold text-gray-900">{price}</p>

          <div className="flex flex-wrap gap-1 my-1 mb-[20px]">
            {tags.map((tag, index) => (
              <TagBadge key={index} tag={tag} index={index} />
            ))}
          </div>

          <PlanModeToggle mode={mode} onChange={setMode} />

          <div className="w-full max-w-md space-y-8">
            <div className="w-full h-[320px]">
              <TendencyRadarChart
                isRounded={isRounded}
                data={mode === 'basic' ? radarData : [radarData, compareData]}
                name={planName}
              />
            </div>

            <div className="w-full h-[320px]">
              <TendencyBarChart
                data={mode === 'basic' ? barData : [barData, compareData]}
                name={planName}
              />
            </div>

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
          </div>
        </div>
      </section>
    </main>
  );
}
