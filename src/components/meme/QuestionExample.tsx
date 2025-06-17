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
      <div className="mb-6 flex items-center justify-center">
        <div className="flex w-[20rem] max-w-full items-center justify-center overflow-hidden rounded-lg border border-pink-400 bg-white">
          <SuspenseImage
            src={content}
            alt="예시 이미지"
            width={9999}
            height={9999}
            className="h-auto w-full object-contain"
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
