export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[420px] min-h-screen px-4 bg-white">
      {children}
    </div>
  );
}
