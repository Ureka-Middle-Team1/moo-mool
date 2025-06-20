type Props = {
  invitedCount: number;
  typeName: string | null;
};

export default function TypeLevel({ invitedCount, typeName }: Props) {
  const level = invitedCount >= 10 ? 3 : invitedCount >= 5 ? 2 : 1;

  return (
    <div className="mb-2 flex items-center gap-2 pt-4">
      <p className="text-lg">{typeName ?? "무너"}</p>
      <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-sm text-indigo-600">
        LV {level}
      </span>
    </div>
  );
}
