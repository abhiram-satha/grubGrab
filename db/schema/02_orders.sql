DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    menuitems_id INTEGER REFERENCES menuitems(id) ON DELETE CASCADE,
    customers_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    delivery_address_id INTEGER REFERENCES delivery_addresses(id) ON DELETE CASCADE,
    date_ordered TIMESTAMP NOT NULL,
    fulfilled BOOLEAN NOT NULL
)