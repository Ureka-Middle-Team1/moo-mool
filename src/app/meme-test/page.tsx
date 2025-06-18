import TestHomePage from "./TestHomePage";
import { generateMemeMetadata } from "@/utils/generateMemeMetadata";

export function generateMetadata({
  searchParams,
}: {
  searchParams?: { inviter?: string | string[] };
}) {
  return generateMemeMetadata(searchParams?.inviter);
}

export default function Page() {
  return <TestHomePage />;
}
