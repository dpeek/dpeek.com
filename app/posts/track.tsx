"use client";

import { usePathname } from "next/navigation";
import { use } from "react";

async function track(action: string, pathname) {
  try {
    const res = await fetch(
      `https://stats.twitchy.workers.dev/${action}?pathname=${pathname}`,
    );
    const data = await res.text();
    return parseInt(data ?? "0", 10);
  } catch (e) {
    return 0;
  }
}

export function TrackCount({ pathname }: { pathname: string }) {
  const count = use(track("count", pathname));
  return <>{Intl.NumberFormat().format(count)} views</>;
}

export function TrackView() {
  const pathname = usePathname();
  const count = use(track("view", pathname));
  return <>{Intl.NumberFormat().format(count)} views</>;
}
