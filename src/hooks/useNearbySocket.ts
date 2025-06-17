import { useEffect, useRef } from "react";

export function useNearbySocket(
  onMessage: (data: any) => void,
  userId?: string
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) {
      console.warn(
        "❗ userId가 undefined 상태에서 WebSocket 연결을 시도했습니다."
      );
      return;
    }

    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSS_SERVER_URL!);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");

      socket.send(
        JSON.stringify({
          userId,
          distance: Math.random() * 2 + 0.5,
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // 유효성 검사
        if (!data.userId || typeof data.userId !== "string") {
          console.warn("🚫 잘못된 데이터 수신됨:", data);
          return;
        }

        onMessage(data);
      } catch (err) {
        console.error("❌ 메시지 파싱 실패:", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ Disconnected from WebSocket");
    };

    return () => socket.close();
  }, [userId]);

  return wsRef;
}
