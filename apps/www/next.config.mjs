import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components",
        permanent: false,
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*",
        permanent: false,
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
