CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  barber TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  cancel_token TEXT NOT NULL,
  ref TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_date_time ON bookings(date, time);
