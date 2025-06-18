import TestHomePage from "./TestHomePage";
import { generateMemeMetadata } from "@/utils/generateMemeMetadata";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return generateMemeMetadata(); // inviter 없음
}

export default function Page() {
  return <TestHomePage />;
}
