import { defineConfig } from "astro/config";

import inspectUrls from "@jsdevtools/rehype-url-inspector";
import preact from "@astrojs/preact";
import tailwind from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ethandenny.dev",
  vite: {
    plugins: [
      tailwind(),
    ],
  },
  integrations: [
    preact(),
  ],
  markdown: {
    rehypePlugins: [
      [
        inspectUrls,
        {
          selectors: ["a[href]"],
          inspectEach(url) {
            url.node.properties.target = "_blank";
            url.node.properties.rel = "noopener noreferrer";
          },
        },
      ],
    ],
  },
});
