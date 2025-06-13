export function useWebShare({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("공유 실패:", error);
        alert("공유에 실패했습니다.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("브라우저가 공유를 지원하지 않아 링크를 복사했습니다.");
      } catch {
        alert("공유와 복사 기능 모두 사용할 수 없습니다.");
      }
    }
  };

  return share;
}
