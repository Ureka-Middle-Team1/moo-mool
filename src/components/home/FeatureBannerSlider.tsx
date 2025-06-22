// components/FeatureBannerSlider.tsx

import { useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import FeatureBannerCard from "./FeatureBannerCard";

const featureBannerList = [
  {
    subtitle: "요금제 성향, 재미로 풀어봐요!",
    title: "당신은 ‘팝콘 무너’?\n테스트로 유형 확인!",
    description: "요금제 성향, 재미로 풀어봐요",
    image: "/assets/banner/meme-test.png",
    href: "/meme-test",
  },
  {
    subtitle: "이 근처, 나랑 비슷한 사람?",
    title: "근처 사용자와\n요금제 비교하기!",
    description: "이 근처, 나랑 비슷한 사람?",
    image: "/assets/banner/nearby.png",
    href: "/nearby",
  },
  {
    subtitle: "말로 하는 요금제 추천",
    title: "음성으로 말하고\n요금제 추천받기!",
    description: "STT/TTS 기반 음성 챗봇 제공",
    image: "/assets/banner/voice.png",
    href: "/chat",
  },
];

export default function FeatureBannerSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 자동 슬라이드
  const autoScroll = useCallback(() => {
    if (!emblaApi) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      autoScroll();
      emblaApi.on("pointerDown", () => clearInterval(intervalRef.current!)); // 사용자 조작 시 멈춤
      emblaApi.on("pointerUp", autoScroll); // 손 떼면 다시 자동
    }
    return () => clearInterval(intervalRef.current!);
  }, [emblaApi, autoScroll]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {featureBannerList.map((item, idx) => (
          <div key={idx} className="mb-2 min-w-full">
            <FeatureBannerCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
