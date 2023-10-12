INSERT IGNORE INTO shopping_dashboard.shop (id, name, city) VALUES (1, "LIDL", "Nowy Sącz");
INSERT IGNORE INTO shopping_dashboard.shop (id, name, city) VALUES (2, "BIEDRONKA", "Nowy Sącz");
INSERT IGNORE INTO shopping_dashboard.shop (id, name, city) VALUES (3, "AUCHAN", "Nowy Sącz");
INSERT IGNORE INTO shopping_dashboard.shop (id, name, city) VALUES (4, "CAREFOUR", "Nowy Sącz");
INSERT IGNORE INTO shopping_dashboard.shop (id, name, city) VALUES (5, "LIDL", "KRAKÓW");
INSERT IGNORE INTO shopping_dashboard.shop (id, name, city) VALUES (6, "BIEDRONKA", "KRAKÓW");

INSERT IGNORE INTO shopping_dashboard.product (product_id, brand, product_name, weight) VALUES(1, 'Bielmar', 'Margaryna palma', 0.4);
INSERT IGNORE INTO shopping_dashboard.product (product_id, brand, product_name, weight) VALUES(2, 'Cola Co', 'Coca Cola', 1);
INSERT IGNORE INTO shopping_dashboard.product (product_id, brand, product_name, weight) VALUES(3, 'Piekarnia Grześ', 'Chleb', 0.6);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Nestle', 'Snickers', 0.4);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Kryniczanka', 'Woda mineralna gazowana', 1.5);
INSERT INTO shopping_dashboard.product (brand, product_name, weight) VALUES('Nestle', 'Płatki śniadaniowe', 5.5);

INSERT IGNORE INTO shopping_dashboard.roles(id, name) VALUES (1, 'ROLE_ADMIN');
INSERT IGNORE INTO shopping_dashboard.roles(id, name) VALUES (2, 'ROLE_USER');

INSERT IGNORE INTO shopping_dashboard.users (email, name, password) VALUES('admin@gmail.com', 'ADMIN', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK');
INSERT IGNORE INTO shopping_dashboard.users (email, name, password) VALUES('justyna@gmail.com', 'Justyna', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK');

INSERT IGNORE INTO shopping_dashboard.users_roles (user_id, role_id) VALUES(1, 1);
INSERT IGNORE INTO shopping_dashboard.users_roles (user_id, role_id) VALUES(2, 2);


INSERT IGNORE INTO shopping_dashboard.shopping_list (id, created_at, list_name, user_id, shop_id)
VALUES(1, now(), 'testowa lista 1', (select id from users where email = 'justyna@gmail.com'), 1);

INSERT IGNORE INTO shopping_dashboard.shopping_list (id, created_at, list_name, user_id, shop_id)
VALUES(2, now(), 'testowa lista 2', (select id from users where email = 'justyna@gmail.com'), 2);

INSERT IGNORE INTO shopping_dashboard.shopping_list (id, created_at, list_name, user_id, shop_id)
VALUES(3, now(), 'Zakupy lidlowe', (select id from users where email = 'justyna@gmail.com'), 5);

INSERT IGNORE INTO shopping_dashboard.purchase(price, shopping_list_id, user_id, product_id) VALUES(4.25, 1, 2, 1);
INSERT IGNORE INTO shopping_dashboard.purchase(price, shopping_list_id, user_id, product_id) VALUES(6.15, 1, 2, 2);
INSERT IGNORE INTO shopping_dashboard.purchase(price, shopping_list_id, user_id, product_id) VALUES(2.99, 1, 2, 3);


