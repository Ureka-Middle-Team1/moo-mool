import { generateMemeMetadata } from "@/utils/generateMemeMetadata";

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
