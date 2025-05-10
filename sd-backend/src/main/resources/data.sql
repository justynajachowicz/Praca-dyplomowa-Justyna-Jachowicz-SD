INSERT INTO "shop" (id, name, city) VALUES (1, 'LIDL', 'Nowy Sącz') ON CONFLICT (id) DO NOTHING;
INSERT INTO "shop" (id, name, city) VALUES (2, 'BIEDRONKA', 'Nowy Sącz') ON CONFLICT (id) DO NOTHING;
INSERT INTO "shop" (id, name, city) VALUES (3, 'AUCHAN', 'Nowy Sącz') ON CONFLICT (id) DO NOTHING;
INSERT INTO "shop" (id, name, city) VALUES (4, 'CAREFOUR', 'Nowy Sącz') ON CONFLICT (id) DO NOTHING;
INSERT INTO "shop" (id, name, city) VALUES (5, 'LIDL', 'KRAKÓW') ON CONFLICT (id) DO NOTHING;
INSERT INTO "shop" (id, name, city) VALUES (6, 'BIEDRONKA', 'KRAKÓW') ON CONFLICT (id) DO NOTHING;

INSERT INTO "product" (product_id, brand, product_name, weight) VALUES(1, 'Bielmar', 'Margaryna palma', 0.4) ON CONFLICT (product_id) DO NOTHING;
INSERT INTO "product" (product_id, brand, product_name, weight) VALUES(2, 'Cola Co', 'Coca Cola', 1) ON CONFLICT (product_id) DO NOTHING;
INSERT INTO "product" (product_id, brand, product_name, weight) VALUES(3, 'Piekarnia Grześ', 'Chleb', 0.6) ON CONFLICT (product_id) DO NOTHING;
INSERT INTO "product" (product_id, brand, product_name, weight) VALUES(4, 'Nestle', 'Snickers', 0.4) ON CONFLICT (product_id) DO NOTHING;
INSERT INTO "product" (product_id, brand, product_name, weight) VALUES(5, 'Kryniczanka', 'Woda mineralna gazowana', 1.5) ON CONFLICT (product_id) DO NOTHING;
INSERT INTO "product" (product_id, brand, product_name, weight) VALUES(6, 'Nestle', 'Płatki śniadaniowe', 5.5) ON CONFLICT (product_id) DO NOTHING;

INSERT INTO "roles" (id, name) VALUES (1, 'ROLE_ADMIN') ON CONFLICT (id) DO NOTHING;
INSERT INTO "roles" (id, name) VALUES (2, 'ROLE_USER') ON CONFLICT (id) DO NOTHING;

INSERT INTO "users" (id, email, name, password) VALUES(1,'admin@gmail.com', 'ADMIN', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK') ON CONFLICT (email) DO NOTHING;
INSERT INTO "users" (id, email, name, password) VALUES(2, 'justyna@gmail.com', 'Justyna', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK') ON CONFLICT (email) DO NOTHING;
INSERT INTO "users" (id, email, name, password) VALUES(3, 'adminj@gmail.com', 'ADMINJ', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK') ON CONFLICT (email) DO NOTHING;

INSERT INTO "users_roles" (user_id, role_id) VALUES(1, 1) ON CONFLICT (user_id, role_id) DO NOTHING;
INSERT INTO "users_roles" (user_id, role_id) VALUES(2, 2) ON CONFLICT (user_id, role_id) DO NOTHING;
INSERT INTO "users_roles" (user_id, role_id) VALUES(3, 1) ON CONFLICT (user_id, role_id) DO NOTHING;

INSERT INTO "shopping_list" (id, created_at, list_name, user_id, shop_id)
VALUES(1, now(), 'testowa lista 1', (select id from users where email = 'justyna@gmail.com'), 1) ON CONFLICT (id) DO NOTHING;

INSERT INTO "shopping_list" (id, created_at, list_name, user_id, shop_id)
VALUES(2, now(), 'testowa biedronkowe', (select id from users where email = 'justyna@gmail.com'), 2) ON CONFLICT (id) DO NOTHING;

INSERT INTO "shopping_list" (id, created_at, list_name, user_id, shop_id)
VALUES(3, now(), 'Zakupy lidlowe', (select id from users where email = 'justyna@gmail.com'), 5) ON CONFLICT (id) DO NOTHING;

INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(4.25, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(6.15, 1, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(2.99, 1, 3) ON CONFLICT (id) DO NOTHING;

INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(4.25, 2, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(6.15, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(2.99, 2, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(4.25, 2, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(6.15, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase" (price, shopping_list_id, product_id) VALUES(2.99, 2, 3) ON CONFLICT (id) DO NOTHING;

INSERT INTO "purchase"(price, shopping_list_id, product_id) VALUES(3.25, 3, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase"(price, shopping_list_id, product_id) VALUES(1.15, 3, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase"(price, shopping_list_id, product_id) VALUES(2.99, 3, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase"(price, shopping_list_id, product_id) VALUES(8.25, 3, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase"(price, shopping_list_id, product_id) VALUES(6.15, 3, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO "purchase"(price, shopping_list_id, product_id) VALUES(1.99, 3, 3) ON CONFLICT (id) DO NOTHING;

-- Insert receipts from the issue description
INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (1, '2025-03-20', 'path/to/receipt.jpg', 'SuperMarket', 99.99, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (2, '2025-03-20', 'path/to/receipt.jpg', 'SuperMarket', 99.99, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (3, '2025-03-20', 'path/to/receipt.jpg', 'SuperMarket', 99.99, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (4, '2025-03-20', 'path/to/receipt.jpg', 'SuperMarket', 99.99, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (5, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (6, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (7, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (8, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (9, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (10, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (11, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (12, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (13, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (14, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (15, '2025-05-03', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (16, '2025-05-05', NULL, 'Biedronka', 7.7, NULL, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (17, '2025-05-05', NULL, 'Biedronka', 7.7, 'Kraków', NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (18, '2025-05-05', NULL, 'Biedronka', 7.7, 'Gdańsk', NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (19, '2025-05-05', NULL, 'Biedronka', 7.7, 'Gdańsk', NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (20, '2025-05-05', NULL, 'Biedronka', 7.7, 'Wrocław', NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (21, '2025-05-05', NULL, 'Biedronka', 7.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (22, '2025-05-05', NULL, 'Biedronka', 7.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (23, '2025-05-05', NULL, 'Biedronka', 7.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (24, '2025-05-05', NULL, 'Biedronka', 7.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (25, '2025-05-05', NULL, 'Biedronka', 7.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (26, '2025-05-05', NULL, 'Biedronka', 8.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (27, '2025-05-05', NULL, 'Biedronka', 8.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (28, '2025-05-05', NULL, 'Biedronka', 8.7, 'Wrocław', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (29, '2025-05-05', NULL, 'Biedronka', 8.7, 'Gdańsk', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (30, '2025-05-05', NULL, 'Biedronka', 8.7, 'Poznań', 'ul. Lwowska 1') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (31, '2025-05-06', NULL, 'Biedronka', 8.7, 'Nowy Sącz', 'Biedronka, ul. Zielona 64, 33-300 Nowy Sącz') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (32, '2025-05-06', NULL, 'Biedronka', 7.7, 'Nowy Sącz', 'pl. J. H, plac Dąbrowskiego 1a · 800 080 010') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (33, '2025-05-06', NULL, 'Biedronka', 7.7, 'Nowy Sącz', 'Dojazdowa 7') ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipts" (id, date, image_path, shop_name, total_price, city, street) 
VALUES (34, '2025-05-06', NULL, 'Biedronka', 7.7, 'Nowy Sącz', 'pl. J. H, plac Dąbrowskiego 1a · 800 080 010') ON CONFLICT (id) DO NOTHING;

-- Add some receipt items for the receipts
INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Mleko', 3.99, 1, 21) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Chleb', 4.50, 1, 21) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Masło', 6.99, 1, 22) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Ser', 12.99, 1, 22) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Jogurt', 2.49, 1, 23) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Jabłka', 3.99, 1, 23) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Banany', 5.99, 1, 24) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Pomidory', 7.99, 1, 24) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Ogórki', 4.99, 1, 25) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Papryka', 8.99, 1, 25) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Woda', 1.99, 1, 26) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Sok', 4.99, 1, 26) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Herbata', 6.99, 1, 27) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Kawa', 15.99, 1, 27) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Cukier', 3.99, 1, 28) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Mąka', 2.99, 1, 28) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Ryż', 4.99, 1, 29) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Makaron', 3.99, 1, 29) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Olej', 7.99, 1, 30) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Ocet', 2.99, 1, 30) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Sól', 1.99, 1, 31) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Pieprz', 3.99, 1, 31) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Czosnek', 2.49, 1, 32) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Cebula', 1.99, 1, 32) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Ziemniaki', 3.99, 1, 33) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Marchew', 2.99, 1, 33) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Szynka', 12.99, 1, 34) ON CONFLICT (id) DO NOTHING;

INSERT INTO "receipt_items" (product_name, price, quantity, receipt_id) 
VALUES ('Kiełbasa', 9.99, 1, 34) ON CONFLICT (id) DO NOTHING;
