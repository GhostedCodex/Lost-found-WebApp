CREATE DATABASE IF NOT EXISTS lost_and_found;
USE lost_and_found;

DROP TABLE IF exists items;
DROP TABLE IF exists users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    index_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    status ENUM('lost', 'found') NOT NULL,
    user_id INT,
    reported_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);