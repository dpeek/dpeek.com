"use server";

const endpoint = "https://stats.twitchy.workers.dev";

export async function trackView(pathname: string) {
  await fetch(endpoint + pathname, {
    method: "POST",
    cache: "no-store",
  }).catch(() => {});
}
