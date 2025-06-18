"use client";

type ChatHistoryItem = {
  id: string; // 챗봇 대화 내역 id
  title: string; // 챗봇 대화 요약본
};

const dummyData: ChatHistoryItem[] = [
  {
    id: "1",
    title: "무제한 요금제에 대해 이야기했어요.",
  },
  {
    id: "2",
    title: "통화가 많은 사용자에게 적합한 요금제를 추천했어요.",
  },
];

// 챗봇 대화 내역을 보는 페이지
export default function ChatbotHistoryPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-pink-100 p-4">
      <div className="flex flex-col gap-6">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer rounded-md px-4 py-3 text-sm text-gray-800 transition hover:bg-gray-200">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
