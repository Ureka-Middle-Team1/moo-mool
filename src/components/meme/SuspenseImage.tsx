"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Spinner } from "@/components/ui/spinner";

interface SuspenseImageProps extends Omit<ImageProps, "onLoad"> {
  alt: string;
  className?: string;
}

export default function SuspenseImage({
  alt,
  className = "",
  ...props
}: SuspenseImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
      <Image
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
