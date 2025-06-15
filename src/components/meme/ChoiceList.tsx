import { Button } from "@/components/ui/button";
import { Choice } from "@/types/question";

export default function ChoiceList({
  choices,
  onSelect,
}: {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}) {
  return (
    <div className="item-center mx-auto flex max-w-xs flex-col gap-5">
      {choices.map((choice) => (
        <Button
          key={choice.id}
          variant="outline"
          className="h-[60px] w-[320px] rounded-full border-1 border-pink-400 bg-white font-[17px] hover:bg-pink-300"
          onClick={() => onSelect(choice)}>
          {choice.text}
        </Button>
      ))}
    </div>
  );
}
