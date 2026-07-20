CREATE TABLE users (
                       id            UUID PRIMARY KEY,
                       email         VARCHAR(255) NOT NULL UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       status        VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','DEACTIVATED')),
                       created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);