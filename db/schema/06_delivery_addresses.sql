DROP TABLE IF EXISTS delivery_addresses CASCADE;

CREATE TABLE delivery_addresses (
  id SERIAL PRIMARY KEY NOT NULL,
  street_address TEXT NOT NULL,
  unit_number VARCHAR(4),
  province VARCHAR(2) NOT NULL,
  country VARCHAR(2) NOT NULL,
  postal_code VARCHAR(6) NOT NULL
);
