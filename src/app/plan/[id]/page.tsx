'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TendencyRadarChart from '@/components/chart/TendencyRadarChart';
import Image from 'next/image';

interface PlanDetail {
  planId: number;
  carrier: string;
  price: number;
  displayPrice: string;
  name: string;
  voice: string;
  data: string;
  sms: string;
  networkType: string;
}

export default function PlanDetailPage() {
  const { id } = useParams();
  const [plan, setPlan] = useState<PlanDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`/api/plan/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.error.message);
        setPlan(json.response);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    if (id) fetchPlan();
  }, [id]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!plan) return <div className="p-4 text-gray-500">로딩 중...</div>;

  return (
    <main className="p-6 space-y-6 bg-[#FFF8F2] min-h-screen">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">{plan.name}</h1>
        <p className="text-lg font-medium">월 {plan.displayPrice}</p>
        <div className="text-sm text-[#EB453F] flex gap-2">
          <span>OTT 구독 포함</span>
          <span>통화 무제한</span>
          <span>데이터 100GB</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="bg-[#f2e6da] px-3 py-1 rounded-full text-sm">기본</button>
          <button className="bg-[#ddd2f6] px-3 py-1 rounded-full text-sm">내 요금제와 비교</button>
        </div>
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <div className="text-center font-medium mb-2">통신 성향 분석</div>
        <TendencyRadarChart />
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <div className="text-center font-medium mb-2">요금제 항목</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>📶 데이터: {plan.data}</p>
          <p>🗣 통화: {plan.voice}</p>
          <p>✉ 문자: {plan.sms}</p>
          <p>📡 망: {plan.networkType}</p>
        </div>
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <div className="font-semibold mb-2">📦 포함 혜택</div>
        <div className="flex gap-4">
          <div className="text-center">
            <Image src="/images/netflix.png" alt="넷플릭스" width={64} height={64} className="mx-auto rounded-full" />
            <p className="text-sm mt-1">넷플릭스 3개월</p>
          </div>
          <div className="text-center">
            <Image src="/images/netflix.png" alt="넷플릭스" width={64} height={64} className="mx-auto rounded-full" />
            <p className="text-sm mt-1">넷플릭스 3개월</p>
          </div>
        </div>
      </section>
    </main>
  );
}
