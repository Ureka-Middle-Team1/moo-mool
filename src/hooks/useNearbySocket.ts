import { useEffect, useRef } from "react";
import { NearbyUser } from "@/types/Nearby";

interface UseNearbySocketProps {
  userId?: string;
  userName?: string;
  onNearbyUsers: (users: NearbyUser[]) => void;
  onClickNotice?: (
    fromName: string,
    toName: string,
    fromUserId: string
  ) => void;
  onUserJoin?: () => void;
}

export function useNearbySocket({
  userId,
  userName,
  onNearbyUsers,
  onClickNotice,
  onUserJoin,
}: UseNearbySocketProps) {
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
      // ✅ 접속 알림 전송
      socket.send(
        JSON.stringify({
          type: "user_join",
          userId,
        })
      );

      // 최초 1회 위치 전송
      const sendLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current.send(
                JSON.stringify({
                  type: "location_update",
                  userId,
                  userName,
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

      // 즉시 1회 추가 위치 전송으로 최초 위치 전송 보장
      setTimeout(sendLocation, 100);
      intervalId = setInterval(sendLocation, 1000);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (
          message.type === "nearby_users" &&
          Array.isArray(message.nearbyUsers)
        ) {
          onNearbyUsers(message.nearbyUsers);
        }

        if (message.type === "click_notice") {
          const from = message.fromUserName || message.fromUserId;
          const to = message.toUserName || message.toUserId;
          const fromId = message.fromUserId;

          if (onClickNotice && from && to && fromId) {
            onClickNotice(from, to, fromId);
          }
        }

        if (message.type === "user_join") {
          if (onUserJoin) onUserJoin();
        }
      } catch (err) {
        console.error("❌ WebSocket 메시지 파싱 실패:", err);
      }
    };

    socket.onerror = (e) => {
      console.error("❌ WebSocket 에러:", e);
    };

    socket.onclose = () => {};

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      clearInterval(intervalId);
    };
  }, [userId, userName]);

  return wsRef;
}
