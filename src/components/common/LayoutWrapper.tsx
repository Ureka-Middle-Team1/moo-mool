export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="relative min-h-[852px] w-full max-w-[393px] bg-gray-500">
        {children}
      </div>
    </div>
  );
}
