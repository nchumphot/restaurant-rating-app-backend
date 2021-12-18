INSERT INTO restaurants (name)
VALUES ('Thai Taste Restaurant'), ('On The Bab'), ('Ippudo'), ('Señor Ceviche');

INSERT INTO addresses (restaurant_id, street, city, postcode)
VALUES
((SELECT id FROM restaurants WHERE name = 'Thai Taste Restaurant'), '130 Cromwell Road', 'London', 'SW7 4ET'),
((SELECT id FROM restaurants WHERE name = 'On The Bab'), '305 Old Street', 'London', 'EC1V 9LA'),
((SELECT id FROM restaurants WHERE name = 'Ippudo'), '3 Central Saint Giles Piazza, St Giles High Street', 'London', 'WC2H 8AG'),
((SELECT id FROM restaurants WHERE name = 'Señor Ceviche'), 'Kingly Court, Carnaby', 'London', 'W1B 5PW')
;