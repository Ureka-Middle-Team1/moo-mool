import { client } from "@/lib/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
    }

    const requestData = {
      input: { text },
      voice: {
        languageCode: "ko-KR",
        name: "ko-KR-Chirp3-HD-Achernar",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };

    const res = await client.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = res.data;

    if (data.audioContent) {
      return NextResponse.json({ audioContent: data.audioContent });
    } else {
      return NextResponse.json({ error: "오디오 응답 없음" }, { status: 400 });
    }
  } catch (error) {
    console.error("TTS 서버 에러:", error);
    return NextResponse.json({ error: "TTS 요청 실패" }, { status: 500 });
  }
}
