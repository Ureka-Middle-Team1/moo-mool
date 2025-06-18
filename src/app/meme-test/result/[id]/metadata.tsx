import { generateMemeMetadata } from "@/utils/generateMemeMetadata";
import { Metadata } from "next";

type Props = {
  searchParams?: { inviter?: string | string[] };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  return generateMemeMetadata(searchParams?.inviter);
}
