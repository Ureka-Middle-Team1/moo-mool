'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TendencyRadarChart from '@/components/chart/TendencyRadarChart';

export default function PlanDetailPage() {
  const { id } = useParams();
  const [chartData, setChartData] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isRounded = id === '3'; // 예시: 3번은 둥근 그래프, 4번은 각진

  useEffect(() => {
    const fetchTendency = async () => {
      try {
        const res = await fetch(`/api/tendency/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setChartData(json.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    if (id) fetchTendency();
  }, [id]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!chartData) return <div className="p-4 text-gray-500">그래프 데이터를 불러오는 중입니다...</div>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 통신 성향 레이더 차트</h1>
      <TendencyRadarChart isRounded={isRounded} data={chartData} />
    </main>
  );
}
