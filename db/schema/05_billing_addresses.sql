DROP TABLE IF EXISTS billing_addresses CASCADE;

CREATE TABLE billing_addresses (
  id SERIAL PRIMARY KEY NOT NULL,
  street_address TEXT NOT NULL,
  unit_number VARCHAR(4),
  city VARCHAR(50) NOT NULL,
  province VARCHAR(2) NOT NULL,
  country VARCHAR(2) NOT NULL,
  postal_code VARCHAR(6) NOT NULL
);
