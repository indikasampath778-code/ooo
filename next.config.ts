import type { NextConfig } from "next";

// Tunnels that share the app running on this PC (VS Code port forwarding, ngrok,
// Cloudflare). Without them, forms such as the login are rejected through the shared link.
const TUNNEL_HOSTS = ["**.devtunnels.ms", "*.ngrok-free.app", "*.trycloudflare.com"];

const nextConfig: NextConfig = {
  allowedDevOrigins: TUNNEL_HOSTS,
  experimental: {
    serverActions: { allowedOrigins: TUNNEL_HOSTS },
  },
  // The shop system shows live database data on every screen, so pages are
  // rendered per request (the classic model) instead of using Cache Components.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
