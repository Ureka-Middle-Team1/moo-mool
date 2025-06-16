import SuspenseImage from "@/components/meme/SuspenseImage";

interface QuestionExampleProps {
  type: "image" | "text" | null;
  content: string | null;
}

export default function QuestionExample({
  type,
  content,
}: QuestionExampleProps) {
  if (type === "image" && content) {
    return (
      <div className="mb-6 flex justify-center">
        <div className="flex h-[11rem] w-[20rem] items-center justify-center rounded-lg border border-pink-400 bg-white">
          <SuspenseImage
            src={content}
            alt="예시 이미지"
            width={300}
            height={160}
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  if (type === "text" && content) {
    return (
      <p className="mb-6 rounded border border-pink-400 bg-white p-4 text-center text-pink-700">
        {content}
      </p>
    );
  }

  return null;
}
