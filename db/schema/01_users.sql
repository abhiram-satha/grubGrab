DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  admin BOOLEAN NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone_number INTEGER NOT NULL,
  billing_address_id INTEGER REFERENCES billing_addresses(id) ON DELETE CASCADE,
  username VARCHAR(10) NOT NULL
);

