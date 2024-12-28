/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vttcabs.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.36",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
// ['192.168.29.208', 'api.vttcabs.com',]