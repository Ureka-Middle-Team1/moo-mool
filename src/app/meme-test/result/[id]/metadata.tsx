import { generateMemeMetadata } from "@/utils/generateMemeMetadata";
import { Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { inviter?: string };
};

export function generateMetadata({
  searchParams,
}: {
  searchParams?: { inviter?: string | string[] };
}) {
  return generateMemeMetadata(searchParams?.inviter);
}
