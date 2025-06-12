"use client";

export default function TopGradient() {
  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        height: "200px",
        background: "linear-gradient(to bottom, #fff6d8, transparent)",
        zIndex: -1,
      }}
    />
  );
}
