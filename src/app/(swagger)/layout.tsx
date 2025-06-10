export const metadata = {
  title: "Swagger UI",
};

export default function SwaggerGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="w-full bg-white text-black">
        <div className="min-h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
