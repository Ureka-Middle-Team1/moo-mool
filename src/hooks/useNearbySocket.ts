import { useEffect, useRef } from "react";
import { NearbyUser } from "@/types/Nearby";

export function useNearbySocket(
  onNearbyUsers: (users: NearbyUser[]) => void,
  userId?: string
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) {
      console.warn("❗ userId가 undefined입니다.");
      return;
    }

    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSS_SERVER_URL!);
    wsRef.current = socket;

    let intervalId: NodeJS.Timeout;

    socket.onopen = () => {
      console.log("✅ WebSocket 연결됨");

      const sendLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current.send(
                JSON.stringify({
                  type: "location_update",
                  userId,
                  lat: latitude,
                  lng: longitude,
                })
              );
            }
          },
          (error) => {
            console.error("📍 위치 정보 가져오기 실패:", error.message);
          }
        );
      };

      sendLocation(); // 초기 1회
      intervalId = setInterval(sendLocation, 5000); // 주기 전송
    };
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // ✅ 전체 메시지 콘솔 출력
        console.log("📥 서버에서 수신된 메시지:", message);

        // ✅ nearby_users일 경우만 처리
        if (message.type === "nearby_users" && Array.isArray(message.users)) {
          console.log("📡 감지된 주변 사용자 목록:", message.users); // ✅ 사용자 목록 출력
          onNearbyUsers(message.users);
        }
      } catch (err) {
        console.error("❌ WebSocket 메시지 파싱 실패:", err);
      }
    };

    // ✅ 여기서 useEffect 클린업 정의 (WebSocket 종료 + interval 제거)
    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      clearInterval(intervalId);
    };
  }, [userId]);

  return wsRef;
}
