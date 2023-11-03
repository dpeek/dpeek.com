"use server";

import { unstable_cache } from "next/cache";

const endpoint = "https://stats.twitchy.workers.dev";

export async function trackView(pathname: string) {
  await fetch(endpoint + pathname, {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}

export const getViews = unstable_cache(
  async () => {
    const res = await fetch(endpoint);
    const json = await res.json().catch(() => []);
    return json as { pathname: string; count: number }[];
  },
  ["views"],
  { revalidate: 5 },
);
