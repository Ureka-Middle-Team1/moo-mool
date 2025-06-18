import { generateMemeMetadat0a } from "./memeMetadata";
import TestHomePage from "./TestHomePage";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return generateMemeMetadat0a(); // inviter 없음
}

export default function Page() {
  return <TestHomePage />;
}
