-- Unique constraint to prevent double-bookings
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_slot
  ON bookings(barber, date, time) WHERE status = 'confirmed';

-- Unique constraint on booking reference
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_ref ON bookings(ref);

-- Unique constraint on cancel token
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_token ON bookings(cancel_token);

-- Composite index for common query pattern
CREATE INDEX IF NOT EXISTS idx_bookings_barber_date_status ON bookings(barber, date, status);

-- Index on barbers status for active filtering
CREATE INDEX IF NOT EXISTS idx_barbers_status ON barbers(status);
