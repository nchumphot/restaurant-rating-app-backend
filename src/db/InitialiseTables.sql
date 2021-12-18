DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE addresses (
    restaurant_id INT PRIMARY KEY,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(30) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE reviews (
    restaurant_id INT PRIMARY KEY,
    comment VARCHAR(300),
    score INT NOT NULL,
    submission_date TIMESTAMP NOT NULL DEFAULT NOW(),
    last_edited_date TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);