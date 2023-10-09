INSERT INTO  shopping_dashboard.shop (name, city) VALUES ("LIDL", "Nowy Sącz");
INSERT INTO  shopping_dashboard.shop (name, city) VALUES ("BIEDRONKA", "Nowy Sącz");
INSERT INTO  shopping_dashboard.shop (name, city) VALUES ("AUCHAN", "Nowy Sącz");
INSERT INTO  shopping_dashboard.shop (name, city) VALUES ("CAREFOUR", "Nowy Sącz");
INSERT INTO  shopping_dashboard.shop (name, city) VALUES ("LIDL", "KRAKÓW");
INSERT INTO  shopping_dashboard.shop (name, city) VALUES ("BIEDRONKA", "KRAKÓW");

INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Bielmar', 'Margaryna palma', 0.4);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Cola Co', 'Coca Cola', 1);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Piekarnia Grześ', 'Chleb', 0.6);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Nestle', 'Snickers', 0.4);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Kryniczanka', 'Woda mineralna gazowana', 1.5);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Nestle', 'Płatki śniadaniowe', 5.5);

INSERT IGNORE INTO shopping_dashboard.roles(id, name) VALUES (1, 'ROLE_ADMIN');
INSERT IGNORE INTO shopping_dashboard.roles(id, name) VALUES (2, 'ROLE_USER');

INSERT IGNORE INTO shopping_dashboard.users (email, name, password) VALUES('admin@gmail.com', 'ADMIN', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK');
INSERT IGNORE INTO shopping_dashboard.users (email, name, password) VALUES('justyna@gmail.com', 'Justyna', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK');

INSERT IGNORE INTO shopping_dashboard.users_roles (user_id, role_id) VALUES(1, 1);
INSERT IGNORE INTO shopping_dashboard.users_roles (user_id, role_id) VALUES(2, 2);


