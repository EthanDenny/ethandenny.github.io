import { defineConfig } from "astro/config";

import inspectUrls from "@jsdevtools/rehype-url-inspector";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://ethandenny.dev",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
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
