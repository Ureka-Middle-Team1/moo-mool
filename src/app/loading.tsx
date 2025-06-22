"use client";

import { PulseLoader } from "react-spinners";

export default function GlobalLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <PulseLoader color="#FDCF56" size={12} margin={4} />
    </div>
  );
}
