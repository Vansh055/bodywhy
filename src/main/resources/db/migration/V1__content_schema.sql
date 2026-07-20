CREATE TABLE concept_nodes (
                               id              UUID PRIMARY KEY,
                               type            VARCHAR(20)  NOT NULL CHECK (type IN ('SYSTEM','PROCESS','HABIT','CONDITION')),
                               title           VARCHAR(200) NOT NULL,

                               hook_text            TEXT,
                               mechanism_steps_json TEXT,
                               realization_text     TEXT,
                               thread_text          TEXT,
                               thread_node_id        UUID,
                               depth_text            TEXT,

                               review_status   VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
                                   CHECK (review_status IN ('DRAFT','IN_REVIEW','APPROVED','NEEDS_UPDATE')),
                               reviewed_by     UUID,
                               reviewed_at     TIMESTAMPTZ,

                               created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
                               updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
                               version         INTEGER     NOT NULL DEFAULT 0
);

CREATE INDEX idx_concept_nodes_review_status ON concept_nodes(review_status);

CREATE TABLE causal_relationships (
                                      id                  UUID PRIMARY KEY,
                                      source_node_id      UUID NOT NULL,
                                      target_node_id      UUID NOT NULL,
                                      relationship_type   VARCHAR(30) NOT NULL
                                          CHECK (relationship_type IN ('INFLUENCES','REGULATES','INCREASES_RISK_OF','IS_REGULATED_BY','DEPLETES','REPLENISHES')),
                                      strength            VARCHAR(20) NOT NULL
                                          CHECK (strength IN ('WELL_ESTABLISHED','MODERATE_EVIDENCE','EMERGING')),

                                      review_status       VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
                                          CHECK (review_status IN ('DRAFT','IN_REVIEW','APPROVED','NEEDS_UPDATE')),
                                      reviewed_by         UUID,
                                      reviewed_at         TIMESTAMPTZ,

                                      created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
                                      version              INTEGER     NOT NULL DEFAULT 0,

                                      CONSTRAINT chk_edge_distinct_nodes CHECK (source_node_id <> target_node_id)
);

CREATE INDEX idx_causal_rel_source ON causal_relationships(source_node_id);
CREATE INDEX idx_causal_rel_target ON causal_relationships(target_node_id);

CREATE TABLE sources (
                         id                  UUID PRIMARY KEY,
                         citation_text       TEXT NOT NULL,
                         url_or_reference     VARCHAR(500),
                         publication_type    VARCHAR(30) NOT NULL
                             CHECK (publication_type IN ('PEER_REVIEWED','CLINICAL_GUIDELINE','TEXTBOOK')),
                         added_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE node_sources (
                              id         UUID PRIMARY KEY,
                              node_id    UUID NOT NULL REFERENCES concept_nodes(id),
                              source_id  UUID NOT NULL REFERENCES sources(id)
);

CREATE TABLE edge_sources (
                              id         UUID PRIMARY KEY,
                              edge_id    UUID NOT NULL REFERENCES causal_relationships(id),
                              source_id  UUID NOT NULL REFERENCES sources(id)
);