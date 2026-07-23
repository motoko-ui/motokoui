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
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
