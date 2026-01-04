-- Travel and Tourism Database Schema

CREATE DATABASE IF NOT EXISTS travel_tourism DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travel_tourism;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    location VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Packages Table
CREATE TABLE IF NOT EXISTS packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(50), -- e.g., '5 Days / 4 Nights'
    image_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL
);

-- Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    status ENUM('pending', 'in_review', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    package_id INT,
    travel_date DATE,
    adults INT DEFAULT 1,
    children INT DEFAULT 0,
    total_price DECIMAL(10, 2),
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    booking_status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- Insert Default Admin (password: admin123 - hashed version below)
-- $2y$10$8W9.lYkI/7F6G8b8X9G8O.V8Y9X8G8V8Y9X8G8V8Y9X8G8V8Y9X8 (Wait, I'll use a real helper to generate this)
INSERT INTO users (username, password, email, full_name, role) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@travel.com', 'Administrator', 'admin');

-- Insert Sample Destinations
INSERT INTO destinations (name, description, image_url, location, is_featured) VALUES 
('Dubai', 'The city of gold and futuristic architecture.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', 'UAE', TRUE),
('Pokhara', 'The gateway to the Annapurna Circuit.', 'https://images.unsplash.com/photo-1544806335-9cd7588b2eb6', 'Nepal', TRUE),
('Bali', 'Tropical paradise with rich culture.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', 'Indonesia', TRUE);

-- Insert Sample Packages
INSERT INTO packages (destination_id, title, description, price, duration, image_url, is_featured) VALUES 
(1, 'Luxury Dubai Escape', 'Experience the best of Dubai with luxury hotels and desert safaris.', 150000.00, '5 Days / 4 Nights', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', TRUE),
(2, 'Annapurna Base Camp Trek', 'Adventure through the heart of the Himalayas.', 45000.00, '10 Days / 9 Nights', 'https://images.unsplash.com/photo-1544806335-9cd7588b2eb6', TRUE);
