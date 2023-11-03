import "server-only";

const endpoint = "https://stats.twitchy.workers.dev";

export async function getViews() {
  const res = await fetch(endpoint, {
    next: { revalidate: 5 },
  });
  const json = await res.json().catch(() => []);
  return json as { pathname: string; count: number }[];
}
