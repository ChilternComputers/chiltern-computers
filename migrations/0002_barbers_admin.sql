-- Barbers table
CREATE TABLE IF NOT EXISTS barbers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Barber',
  status TEXT DEFAULT 'active',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Seed existing barbers
INSERT OR IGNORE INTO barbers (id, name, role, status, sort_order) VALUES ('marcus', 'Marcus', 'Senior Barber', 'active', 1);
INSERT OR IGNORE INTO barbers (id, name, role, status, sort_order) VALUES ('jay', 'Jay', 'Barber', 'active', 2);
INSERT OR IGNORE INTO barbers (id, name, role, status, sort_order) VALUES ('reece', 'Reece', 'Junior Barber', 'active', 3);

-- Admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);
