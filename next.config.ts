import type {NextConfig} from "next";

import "./src/env";

const nextConfig: NextConfig = {
  appDir: true,
  images: {
    remotePatterns: [{hostname: "ik.imagekit.io"}],
  },
};

export default nextConfig;
