DROP TABLE IF EXISTS keyingredients CASCADE;

CREATE TABLE keyingredients (
    id SERIAL PRIMARY KEY NOT NULL,
    main_ingredient VARCHAR(15) NOT NULL,
    available BOOLEAN NOT NULL
)
