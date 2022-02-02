DROP TABLE IF EXISTS menuitems CASCADE;

CREATE TABLE menuitems (
    id SERIAL PRIMARY KEY NOT NULL,
    keyingredient_id INTEGER REFERENCES keyingredients(id) ON DELETE CASCADE,
    ingredients TEXT NOT NULL,
    price INTEGER NOT NULL
)