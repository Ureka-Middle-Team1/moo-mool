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

    // 위치 정보 가져오기 → 연결 후 서버로 전송
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        socket.onopen = () => {
          console.log("✅ WebSocket 연결됨");
          socket.send(
            JSON.stringify({
              type: "location_update",
              userId,
              lat: latitude,
              lng: longitude,
            })
          );
        };
      },
      (error) => {
        console.error("📍 위치 정보 가져오기 실패:", error.message);
      }
    );

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "nearby_users" && Array.isArray(message.users)) {
          onNearbyUsers(message.users);
        }
      } catch (err) {
        console.error("❌ WebSocket 메시지 파싱 실패:", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket 연결 종료");
    };

    return () => socket.close();
  }, [userId]);

  return wsRef;
}
