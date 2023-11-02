"use server";

import { Suspense } from "react";
import { getViews } from "./actions";
import { Counter } from "./counter";

const fallback = (
  <p className="h-4 w-12 rounded-full bg-gray-700 animate-pulse" />
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
