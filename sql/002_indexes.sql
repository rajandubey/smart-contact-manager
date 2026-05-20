CREATE INDEX IF NOT EXISTS idx_contacts_full_name
ON contacts(full_name);

CREATE INDEX IF NOT EXISTS idx_contacts_phone_number
ON contacts(phone_number);