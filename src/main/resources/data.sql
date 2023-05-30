INSERT INTO shopping_dashboard.product (brand, price, product_name, weight,  quantity) VALUES('Bielmar',6.2, 'Margaryna palma', 0.4, 120);
INSERT INTO shopping_dashboard.product (brand, price, product_name, weight,  quantity) VALUES('Cola Co',8.6, 'Coca Cola', 1, 1500);
INSERT INTO shopping_dashboard.product (brand, price, product_name, weight,  quantity) VALUES('Piekarnia Grześ',4.5, 'Chleb', 0.6, 80);
INSERT INTO shopping_dashboard.product (brand, price, product_name, weight,  quantity) VALUES('Nestle',2.8, 'Snickers', 0.4, 120);
INSERT INTO shopping_dashboard.product (brand, price, product_name, weight,  quantity) VALUES('Kryniczanka',2.2, 'Woda mineralna gazowana', 1.5, 300);
INSERT INTO shopping_dashboard.product (brand, price, product_name, weight,  quantity) VALUES('Nestle',6.2, 'Płatki śniadaniowe', 5.5, 120);

INSERT IGNORE INTO shopping_dashboard.roles(id, name) VALUES (1, 'ROLE_ADMIN');
INSERT IGNORE INTO shopping_dashboard.roles(id, name) VALUES (2, 'ROLE_USER');

INSERT IGNORE INTO shopping_dashboard.users (email, name, password) VALUES('admin@gmail.com', 'ADMIN', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK');
INSERT IGNORE INTO shopping_dashboard.users (email, name, password) VALUES('justyna@gmail.com', 'Justyna', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK');

INSERT IGNORE INTO shopping_dashboard.users_roles (user_id, role_id) VALUES(1, 1);
INSERT IGNORE INTO shopping_dashboard.users_roles (user_id, role_id) VALUES(2, 2);


