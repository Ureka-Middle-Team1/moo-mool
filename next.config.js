/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone", // ✅ 명시적으로 SSR임을 선언
};

module.exports = nextConfig;
