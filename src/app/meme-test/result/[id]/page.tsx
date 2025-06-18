import ResultPage from "./resultPage";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <ResultPage encryptedId={params.id} />;
}
