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
    <div className="item-center mx-auto mb-20 flex max-w-xs flex-col gap-5">
      {choices.map((choice) => (
        <Button
          key={choice.id}
          variant="outline"
          className="h-[3.75rem] w-[20rem] rounded-full border-1 border-pink-400 bg-white font-[17px] hover:bg-pink-300"
          onClick={() => onSelect(choice)}>
          {choice.text}
        </Button>
      ))}
    </div>
  );
}
