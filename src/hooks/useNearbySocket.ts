import { useEffect, useRef } from "react";

export function useNearbySocket(onMessage: (data: any) => void) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSS_SERVER_URL!);

    wsRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket server");

      // 예: 유저 초기 정보 전송
      const initMessage = {
        userId: "user-" + Math.floor(Math.random() * 1000),
        distance: Math.random() * 2 + 0.5, // 테스트용 거리
      };
      socket.send(JSON.stringify(initMessage));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);
      onMessage(data);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      socket.close();
    };
  }, []);

  return wsRef;
}
