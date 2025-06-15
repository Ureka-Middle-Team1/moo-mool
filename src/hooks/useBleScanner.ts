import { useEffect } from "react";

function estimateDistanceFromRSSI(rssi: number, txPower = -59, n = 2): number {
  return Math.pow(10, (txPower - rssi) / (10 * n));
}

export function useBleScanner(socket: WebSocket | null) {
  useEffect(() => {
    if (!navigator.bluetooth || !navigator.bluetooth.requestLEScan) {
      console.warn("Web Bluetooth API not supported.");
      return;
    }

    navigator.bluetooth
      .requestLEScan({ acceptAllAdvertisements: true })
      .then(() => {
        console.log("📡 BLE scan started");
      })
      .catch((err) => console.error("BLE scan error:", err));

    navigator.bluetooth.addEventListener(
      "advertisementreceived",
      (event: any) => {
        const deviceId = event.device.name || event.device.id || "unknown";
        const rssi = event.rssi;

        const distance = estimateDistanceFromRSSI(rssi);
        console.log(`📍 ${deviceId} at ${distance.toFixed(2)}m`);

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              userId: deviceId,
              distance: Number(distance.toFixed(2)),
            })
          );
        }
      }
    );
  }, [socket]);
}
