CREATE TABLE IF NOT EXISTS discovery_data (
  slug       TEXT      NOT NULL,
  data_type  TEXT      NOT NULL CHECK (data_type IN ('snapshot', 'mapper')),
  payload    JSONB     NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (slug, data_type)
);
