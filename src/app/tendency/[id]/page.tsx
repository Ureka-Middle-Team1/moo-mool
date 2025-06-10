'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TendencyRadarChart from '@/components/chart/TendencyRadarChart';
import TendencyBarChart from '@/components/chart/TendencyBarChart';
import { ArrowLeft } from 'lucide-react';

export default function PlanDetailPage() {
  const { id } = useParams();
  const [radarData, setRadarData] = useState<number[] | null>(null);
  const [barData, setBarData] = useState<number[] | null>(null);
  const [planName, setPlanName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isRounded = id === '3';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tendency/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setRadarData(json.radar);
        setBarData(json.bar);
        setPlanName(json.name);
        setPrice(json.price);
        setTags(json.tags);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!radarData || !barData)
    return <div className="p-4 text-gray-500"> 데이터 로딩 중...</div>;

  return (
    <main className="flex flex-col items-center px-4 py-8 space-y-8 bg-[#fff6d8] min-h-screen">
      
      <section className="w-full max-w-md">
        
        <div className="flex items-center gap-2 mb-3 bg-[#ffffff]">
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold">요금제 상세 정보</span>
        </div>

        
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">
          {planName}
        </h1>
        <p className="text-[20px] font-semibold text-gray-900">{price}</p>

        
        <div className="flex flex-wrap gap-2 my-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${index === 0 ? 'bg-red-100 text-red-500'
                : index === 1 ? 'bg-indigo-100 text-indigo-500'
                : 'bg-gray-100 text-gray-600'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        
        <div className="flex space-x-2 bg-gray-400 p-1 rounded-full shadow-sm">
          <button className="flex-1 py-1 rounded-full bg-white text-black font-semibold text-sm">
            기본
          </button>
          <button className="flex-1 py-1 rounded-full text-black text-sm hover:text-gray-700">
            내 요금제와 비교
          </button>
        </div>
      </section>

      
      <div className="w-full max-w-md space-y-8">
        <div className="w-full h-[320px] bg-white rounded-xl shadow p-4">
          <TendencyRadarChart
            isRounded={isRounded}
            data={radarData}
            name={planName}
          />
        </div>
        <div className="w-full bg-white rounded-xl shadow p-4">
          <TendencyBarChart data={barData} name={planName} />
        </div>
      </div>
    </main>
  );
}
