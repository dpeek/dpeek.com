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

  if (count) {
    return Intl.NumberFormat().format(count) + " views";
  }

  return <>&nbsp;</>;
}

export function TrackCount({ pathname }: { pathname: string }) {
  const count = useCount("count", pathname);
  return <>{count}</>;
}

export function TrackView() {
  const count = useCount("view", usePathname());
  return <>{count}</>;
}
