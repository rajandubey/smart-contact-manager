-- Create database (Run this manually in psql or pgAdmin first)
-- CREATE DATABASE phone_directory;

-- Connect to the phone_directory database and run the following:

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for searching
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(full_name);
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone_number);

-- Seed data
INSERT INTO contacts (full_name, phone_number, email, address) VALUES
('Tony Stark', '+1-555-0101', 'tony@starkindustries.com', '10880 Malibu Point, Malibu, CA'),
('Steve Rogers', '+1-555-0102', 'steve.rogers@avengers.org', '569 Leaman Place, Brooklyn, NY'),
('Bruce Banner', '+1-555-0103', 'bruce.banner@avengers.org', 'Dayton, Ohio')
ON CONFLICT (phone_number) DO NOTHING;
