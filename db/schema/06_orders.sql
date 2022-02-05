DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    delivery_address_id INTEGER REFERENCES delivery_addresses(id) ON DELETE CASCADE,
    date_ordered TIMESTAMP NOT NULL,
    fulfilled BOOLEAN NOT NULL
)