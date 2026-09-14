import { useEffect, useState } from "react";

export function TodayScreen() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [recommendation, setRecommendation] = useState<{
    nodeId: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    // Temporary recommendation until backend recommendation API exists
    setTimeout(() => {
      setRecommendation({
        nodeId: "f7acb7dc-32fb-4aec-9e99-beb9e1c5489b",
        title: "Why you crave sugar after a bad night",
      });

      setStatus("ready");
    }, 400);
  }, []);

  if (status === "loading") {
    return (
      <div
        aria-busy="true"
        style={{
          padding: "2rem",
          textAlign: "center",
        }}
      >
        Loading today's recommendation...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
        }}
      >
        Couldn't load today's recommendation.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>Today's Recommendation</h1>

      <a
        href={`/node/${recommendation!.nodeId}`}
        style={{
          fontSize: "24px",
          textDecoration: "none",
        }}
      >
        {recommendation!.title}
      </a>
    </div>
  );
}