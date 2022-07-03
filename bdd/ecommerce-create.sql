DROP TABLE IF EXISTS products;

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR (35) NOT NULL,
    description VARCHAR(50) NOT NULL,
    picture VARCHAR(250) DEFAULT 'https://www.objet-publicitaire-ecologique-pro.com/images/objets-ecologiques/produit/non-disponible.jpg' NOT NULL,
    price DECIMAL(9,2) DEFAULT 0.00,
    longdescription` VARCHAR(300),
    origin VARCHAR (35),
    quantity INT
);
