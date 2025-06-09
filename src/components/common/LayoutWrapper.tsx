export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen w-full max-w-[420px]">{children}</div>;
}
