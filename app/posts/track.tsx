"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useCount(action: string, pathname: string) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(`https://stats.twitchy.workers.dev/${action}?pathname=${pathname}`)
      .then((res) => res.text())
      .then((text) => setCount(parseInt(text, 10)))
      .catch(() => {});
  }, [action, pathname]);
  return count;
}

export function TrackCount({ pathname }: { pathname: string }) {
  const count = useCount("count", pathname);
  return <>{Intl.NumberFormat().format(count)} views</>;
}

export function TrackView() {
  const count = useCount("view", usePathname());
  return <>{Intl.NumberFormat().format(count)} views</>;
}
