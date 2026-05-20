INSERT INTO contacts (
    full_name,
    phone_number,
    email,
    address
)
VALUES
(
    'John Doe',
    '+919876543210',
    'john@example.com',
    'Mumbai, Maharashtra'
),
(
    'Jane Smith',
    '+919812345678',
    'jane@example.com',
    'Pune, Maharashtra'
),
(
    'Alex Johnson',
    '+919998887776',
    'alex@example.com',
    'Bengaluru, Karnataka'
)
ON CONFLICT (phone_number) DO NOTHING;