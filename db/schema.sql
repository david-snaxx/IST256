-- this SQL file can be executed in a query within MySQL/MySQL Workbench to
-- quickly create a schema and all necessary tables for this application
-- api/models.js is the reference for the shape of these tables

CREATE DATABASE IF NOT EXISTS nittanyconf;
USE nittanyconf;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    age INT,
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS conferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    format VARCHAR(100),
    entryPrice DECIMAL(10, 2),
    additionalInfo TEXT,
    approved TINYINT(1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    category VARCHAR(100),
    specifications TEXT,
    price DECIMAL(10, 2),
    additionalInfo TEXT
);

CREATE TABLE IF NOT EXISTS conference_signups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    conferenceId INT NOT NULL,
    participationType VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (conferenceId) REFERENCES conferences(id) ON DELETE CASCADE
);
