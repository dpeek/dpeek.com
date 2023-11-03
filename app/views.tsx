"use server";

import { Suspense } from "react";
import { Counter } from "./counter";
import { getViews } from "./stats";

const fallback = (
  <p className="rounded bg-gray-700 text-gray-700 animate-pulse">X views</p>
);

type Props = {
  pathname?: string;
  track?: boolean;
};

export async function Views(props: Props) {
  const views = await getViews();
  return (
    <Suspense fallback={fallback}>
      <Counter {...props} views={views} />
    </Suspense>
  );
}
