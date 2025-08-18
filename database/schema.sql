CREATE DATABASE IF NOT EXISTS lost_and_found;
USE lost_and_found;


DROP TABLE IF exists users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    index_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF exists items;

CREATE TABLE found_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  location_found VARCHAR(255),
  date_found DATE,
  reporter_name VARCHAR(255),
  reporter_index VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE items ADD COLUMN item_image LONGBLOB;

ALTER TABLE items MODIFY COLUMN item_image VARCHAR(255);

ALTER TABLE items ADD COLUMN claimed BOOLEAN DEFAULT false;

CREATE TABLE claimed_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  claimant_name VARCHAR(100) NOT NULL,
  index_number VARCHAR(20) NOT NULL,
  phone_contact VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  level VARCHAR(20),
  course_of_study VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES found_items(id)
);

CREATE TABLE lost_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  lost_location VARCHAR(255),
  lost_date DATE,
  reporter_name VARCHAR(255) NOT NULL,
  reporter_index VARCHAR(20) NOT NULL,
  reporter_contact VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);