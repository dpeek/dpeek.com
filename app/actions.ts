"use server";

const endpoint = "https://stats.twitchy.workers.dev";

export async function trackView(pathname: string) {
  const res = await fetch(endpoint + pathname, {
    method: "POST",
    cache: "no-store",
  });
}

export async function getViews() {
  const res = await fetch(endpoint, { next: { revalidate: 5 } });
  const json = await res.json();
  return json as { pathname: string; count: number }[];
}
