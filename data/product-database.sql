-- database: c:\Users\User\Desktop\FreakyFashion-Backend 1\data\product-database.db

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    brand TEXT,
    sku TEXT UNIQUE,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert sample products
INSERT OR IGNORE INTO products (name, description, price, brand, sku, image_url) VALUES 
('Svart T-Shirt', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 199, 'Levis', 'SVA123', '/images/products/black-tshirt.jpg'),

('Vit T-Shirt', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 199, 'Levis', 'VIT123', '/images/products/white-tshirt.jpg'),

('Blå Jeans', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 599, 'Levis', 'BLA456', '/images/products/blue-jeans.jpg'),

('Röd Hoodie', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 399, 'Levis', 'ROD789', '/images/products/red-hoodie.jpg'),

('Grön Jacka', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 799, 'Levis', 'GRO101', '/images/products/green-jacket.jpg'),

('Svart Byxor', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 299, 'Levis', 'SVB112', '/images/products/black-pants.jpg'),

('Vit Skjorta', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 349, 'Levis', 'VIS131', '/images/products/white-shirt.jpg'),

('Blå T-Shirt', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 199, 'Levis', 'BLT415', '/images/products/blue-tshirt.jpg');

--hero_content table
CREATE TABLE IF NOT EXISTS hero_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    button_text TEXT,
    button_link TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO hero_content (title, description, image_url, button_text, button_link) VALUES 
('Lorem ipsum dolor', 
 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
 '/placeholder.svg?height=500&width=800',
 'Shopping',
 '#'
);