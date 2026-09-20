import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function NodeScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [node, setNode] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    Promise.all([
      fetch(`http://localhost:8081/api/nodes/${id}`),
      fetch(`http://localhost:8081/api/nodes/${id}/related`),
    ])
      .then(async ([nodeResponse, relatedResponse]) => {
        if (!nodeResponse.ok) {
          throw new Error("Failed to load node");
        }

        if (!relatedResponse.ok) {
          throw new Error("Failed to load related concepts");
        }

        const nodeData = await nodeResponse.json();
        const relatedData = await relatedResponse.json();

        return { nodeData, relatedData };
      })
      .then(({ nodeData, relatedData }) => {
        setNode(nodeData);
        setRelated(relatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  if (error || !node) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Could not load this concept.
      </div>
    );
  }

  let mechanismSteps = [];

  if (node.mechanismStepsJson) {
    try {
      mechanismSteps = JSON.parse(node.mechanismStepsJson);
    } catch (err) {
      console.error("Could not parse mechanism steps:", err);
    }
  }

  return (
    <div
      style={{
        padding: "3rem 2rem",
        maxWidth: "850px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "48px",
          marginBottom: "1rem",
        }}
      >
        {node.title}
      </h1>

      {node.hookText && (
        <p
          style={{
            textAlign: "center",
            fontSize: "22px",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          {node.hookText}
        </p>
      )}

      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <button
          onClick={() => navigate(`/mechanism/${node.id}`)}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent-interactive)",
            fontSize: "18px",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          Begin →
        </button>
      </div>

      {mechanismSteps.length > 0 && (
        <section>
          <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "2rem" }}>
            Why this happens
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {mechanismSteps.map((step, index) => (
              <div
                key={index}
                style={{
                  padding: "1.2rem",
                  border: "1px solid #444",
                  borderRadius: "10px",
                  fontSize: "18px",
                  lineHeight: "1.5",
                }}
              >
                <strong>{index + 1}.</strong> {step}
              </div>
            ))}
          </div>
        </section>
      )}

      {node.realizationText && (
        <section style={{ marginTop: "4rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px" }}>The Realization</h2>
          <p style={{ textAlign: "center", fontSize: "20px", lineHeight: "1.6" }}>
            {node.realizationText}
          </p>
        </section>
      )}

      {node.depthText && (
        <section style={{ marginTop: "4rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px" }}>Go Deeper</h2>
          <p style={{ textAlign: "center", fontSize: "18px", lineHeight: "1.7" }}>
            {node.depthText}
          </p>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ marginTop: "5rem", paddingBottom: "3rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "2rem" }}>
            What connects to this?
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {related.map((concept) => (
              <button
                key={concept.id}
                onClick={() => navigate(`/node/${concept.id}`)}
                style={{
                  padding: "1.5rem",
                  border: "1px solid #444",
                  borderRadius: "10px",
                  background: "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "20px",
                }}
              >
                {concept.title}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
