/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "whiny-primate-progeny.ngrok-free.dev",
  ],

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://timeaura_backend:5000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;


