import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [256, 640, 1080, 2048],
      domains: [],
      minimumCacheTTL: 60,
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "img.vietqr.io",
          pathname: "image/**",
        },
      ],
    },
  }),
});
