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

INSERT INTO "users" (email, name, password) VALUES('admin@gmail.com', 'ADMIN', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK') ON CONFLICT (email) DO NOTHING;
INSERT INTO "users" (email, name, password) VALUES('justyna@gmail.com', 'Justyna', '$2a$10$bYbrEoMdvkh/ToEXBbn6p.C0tiRBz/iqy4HZaG1/8gtif23VA4peK') ON CONFLICT (email) DO NOTHING;

INSERT INTO "users_roles" (user_id, role_id) VALUES(1, 1) ON CONFLICT (user_id, role_id) DO NOTHING;
INSERT INTO "users_roles" (user_id, role_id) VALUES(2, 2) ON CONFLICT (user_id, role_id) DO NOTHING;

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

