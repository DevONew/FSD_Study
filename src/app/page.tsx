import { Suspense } from "react";
import { FeedPage } from "@/views/feed";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedPage />
    </Suspense>
  );
}
