/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/post/:slug*",
        destination: "https://blog.footmundo.co.uk/post/:slug*",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "https://blog.footmundo.co.uk/:slug*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
