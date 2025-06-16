"use client";
// 이미지 로딩 시 들어가는 원형 스피너 컴포넌트
export default function Spinner() {
  return (
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-400 border-t-transparent"></div>
  );
}
