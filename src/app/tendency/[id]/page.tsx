'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TendencyRadarChart from '@/components/chart/TendencyRadarChart';
import TendencyBarChart from '@/components/chart/TendencyBarChart';

export default function PlanDetailPage() {
  const { id } = useParams();
  const [radarData, setRadarData] = useState<number[] | null>(null);
  const [barData, setBarData] = useState<number[] | null>(null);
  const [planName, setPlanName] = useState<string>('');
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
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!radarData || !barData)
    return <div className="p-4 text-gray-500">📡 데이터 로딩 중...</div>;

  return (
    <main className="flex flex-col items-center px-4 py-8 space-y-8 bg-[#fff6d8] min-h-screen">
      {/* 상단 요금제 정보 */}
      <section className="text-center space-y-2">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">{planName}</h1>
        <p className="text-[20px] font-semibold text-pink-600">월 10,500원</p>
        <div className="flex justify-center space-x-2 text-[14px] font-medium">
          <span className="px-3 py-1 rounded-full bg-pink-200 text-pink-800">OTT 구독 포함</span>
          <span className="px-3 py-1 rounded-full bg-pink-200 text-pink-800">통화 무제한</span>
          <span className="px-3 py-1 rounded-full bg-pink-200 text-pink-800">데이터 쉐어 1000GB</span>
        </div>
      </section>

      {/* 탭 버튼 */}
      <div className="flex space-x-2 bg-white p-1 rounded-full shadow-sm">
        <button className="px-4 py-1 rounded-full bg-yellow-300 text-yellow-900 font-semibold text-sm">
          기본
        </button>
        <button className="px-4 py-1 rounded-full text-gray-500 text-sm hover:text-gray-700">
          내 요금제와 비교
        </button>
      </div>

      {/* 차트 영역 */}
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
