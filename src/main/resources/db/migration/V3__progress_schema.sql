CREATE TABLE exploration_records (
                                     id UUID PRIMARY KEY,
                                     user_id UUID NOT NULL,
                                     node_id UUID NOT NULL,
                                     first_viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                     last_viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                     UNIQUE(user_id, node_id)
);

CREATE TABLE ai_interaction_records (
                                        id UUID PRIMARY KEY,
                                        user_id UUID NOT NULL,
                                        question TEXT NOT NULL,
                                        answer_text TEXT,
                                        grounded BOOLEAN NOT NULL,
                                        occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ai_interaction_cited_nodes (
                                            interaction_id UUID NOT NULL REFERENCES ai_interaction_records(id),
                                            node_id UUID NOT NULL
);