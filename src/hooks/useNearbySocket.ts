import { useEffect, useRef } from "react";

export function useNearbySocket(
  onMessage: (data: any) => void,
  userId: string
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSS_SERVER_URL!);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");

      socket.send(
        JSON.stringify({
          userId,
          distance: Math.random() * 2 + 0.5, // 이후 BLE 거리로 교체 가능
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    socket.onclose = () => {
      console.log("❌ Disconnected from WebSocket");
    };

    return () => socket.close();
  }, [userId]);

  return wsRef;
}
