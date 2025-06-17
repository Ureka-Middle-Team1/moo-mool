import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";

type Props = {
  userId: string;
  angle: number;
  distance: number;
  isMe?: boolean; // ✅ 추가
};

export default function NearbyUserAvatar({
  userId,
  angle,
  distance,
  isMe = false,
}: Props) {
  const { data: profile } = useGetUserCharacterProfile(userId);

  const boundedDistance = Math.min(distance * 80, 180);
  const x = Math.cos((angle * Math.PI) / 180) * boundedDistance;
  const y = Math.sin((angle * Math.PI) / 180) * boundedDistance;

  return (
    <div
      className="absolute flex flex-col items-center text-center"
      style={{
        left: "50%",
        top: "50%",
        transform: isMe
          ? "translate(-50%, -50%)" // ✅ 정중앙
          : `translate(${x}px, ${y}px)`,
      }}>
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-yellow-200 text-xl shadow">
        <img
          src={
            profile?.type
              ? `/assets/moono/${profile.type.toLowerCase()}-moono.png`
              : "/assets/moono/default-moono.png"
          }
          alt="user"
          className="h-full w-full object-contain"
          onError={(e) =>
            (e.currentTarget.src = "/assets/moono/default-moono.png")
          }
        />
      </div>
      <span className="mt-1 max-w-[80px] text-xs break-all text-gray-400">
        {userId}
      </span>
    </div>
  );
}
