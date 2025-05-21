/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,
        missingSuspenseWithCSRBailout: false,

  },
};

export default nextConfig;
