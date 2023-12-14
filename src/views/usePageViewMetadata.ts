import type { Ref } from "vue";
import type { Page } from "@/data/tldr-pages/page";
import { computed } from "vue";
import { useHead } from "@vueuse/head";
import { computedAsync } from "@vueuse/core";
import { usePageOptionalCommand } from "@/data/tldr-pages/composables/usePageCommand";
import { useRoute } from "vue-router";
import { useRouteParams } from "@vueuse/router";

export function usePageViewMetadata(page: Ref<Page | undefined | null>) {
  const pageParams = useRouteParams<string>("page");
  const route = useRoute();

  const titlePrefix = usePageOptionalCommand(page, pageParams).command;
  const title = computed(() => `${titlePrefix.value} | tldr`);

  const description = computedAsync<string | undefined>(async () => {
    if (page.value?.description) {
      return await page.value.description;
    }
  }, undefined);

  const metas = computed(() => {
    if (description.value) {
      return [{ name: "description", content: description.value }];
    } else {
      return [];
    }
  });

  const head = computed(() => {
    return {
      title,
      meta: metas.value,
      link: [
        {
          rel: "canonical",
          href: `https://tldr.inbrowser.app${route.path}`,
        },
      ],
    };
  });

  useHead(head);
}
