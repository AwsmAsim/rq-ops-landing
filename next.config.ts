import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives alongside the Express backend, which has its own
  // lockfile one level up. Pin the root so Turbopack doesn't infer
  // the parent directory as the workspace root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
