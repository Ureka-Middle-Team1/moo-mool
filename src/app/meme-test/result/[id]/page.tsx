import ResultPage from "./resultPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ResultPage encryptedId={id} />;
}
