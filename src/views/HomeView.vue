<template>
  <main>
    <n-h2 prefix="bar" align-text>Search</n-h2>
    <PageSearch />
    <n-h2 prefix="bar" align-text>Commands</n-h2>
    <BrowseCommands />
    <n-h2 prefix="bar" align-text>Statistics</n-h2>
    <DataStatistics />
  </main>
</template>

<script setup lang="ts">
import { NH2 } from "naive-ui";
import PageSearch from "@/components/search/auto-complete/PageSearch.vue";
import DataStatistics from "@/components/misc/DataStatistics.vue";
import BrowseCommands from "@/components/misc/BrowseCommands.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "TL;DR Manpages",
  meta: [
    {
      name: "description",
      content:
        "tldr InBrowser.App is an offline-capable PWA for tldr-pages. Fully runs in your browser. Zero API latency.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `https://man.notch1p.xyz/`,
    },
  ],
});
</script>
