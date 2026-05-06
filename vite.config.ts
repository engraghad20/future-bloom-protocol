import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tsr: {
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});
