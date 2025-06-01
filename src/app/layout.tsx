import "./globals.css";
import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white text-black antialiased flex justify-center">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
