DROP TABLE IF EXISTS menuitems CASCADE;

CREATE TABLE menuitems (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(25) NOT NULL,
    keyingredient_id INTEGER REFERENCES keyingredients(id) ON DELETE CASCADE,
    ingredients TEXT,
    price INTEGER NOT NULL,
    image TEXT
)
