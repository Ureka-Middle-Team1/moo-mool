"use client";

import { useBleScanner } from "@/hooks/useBleScanner";
import { useNearbySocket } from "@/hooks/useNearbySocket";
import { useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState<any[]>([]);
  const wsRef = useNearbySocket((data) => {
    setLogs((prev) => [...prev, data]);
  });
  useBleScanner(wsRef.current); //WebSocket에 BLE 거리 전송
  return (
    <div className="h-screen w-full">
      <main>
        <div className="p-4">
          <h1 className="text-xl font-bold">Nearby User Logs</h1>
          <ul className="mt-4">
            {logs.map((log, idx) => (
              <li key={idx}>
                🛰️ {log.userId} | 거리: {log.distance}m
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
