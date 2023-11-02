"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackView } from "./actions";

type Props = {
  pathname?: string;
  track?: boolean;
  views: { pathname: string; count: number }[];
};

export function Counter(props: Props) {
  const current = usePathname();
  const pathname = props.pathname ?? current;
  const views = props.views.find((views) => views.pathname === pathname);

  useEffect(() => {
    if (props.track) {
      trackView(pathname);
    }
  }, [pathname, props.track]);

  return Intl.NumberFormat().format(views?.count ?? 0) + " views";
}
