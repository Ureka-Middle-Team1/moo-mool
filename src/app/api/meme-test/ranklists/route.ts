import { NextResponse } from "next/server";

export async function GET() {
  const mockData = {
    participantCount: 520,
    shareCount: 150,
    moonos: [
      { label: "팝콘 무너", image: "youtube-moono", score: 95 },
      { label: "투머치 톡커 무너", image: "chat-moono", score: 88 },
      { label: "인싸 무너", image: "sns-moono", score: 70 },
      { label: "꽁돈 무너", image: "saving-moono", score: 50 },
      { label: "여보세무너", image: "calling-moono", score: 65 },
      { label: "꼬꼬무너", image: "books-moono", score: 72 },
    ],
  };

  return NextResponse.json(mockData);
}
