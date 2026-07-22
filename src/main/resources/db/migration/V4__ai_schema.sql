CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE node_embeddings (
                                 node_id UUID PRIMARY KEY,
                                 embedding vector(1536)
);