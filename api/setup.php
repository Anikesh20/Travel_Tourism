<?php
$host = "localhost";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $dbname = "travel_tourism";
    $dbname = "`" . str_replace("`", "``", $dbname) . "`";
    $pdo->query("CREATE DATABASE IF NOT EXISTS $dbname");
    $pdo->query("use $dbname");
    
    echo "Database '$dbname' checked/created successfully.<br>";
    
    // Now create tables
    $query = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($query);
    echo "Table 'users' checked/created successfully.<br>";

    // Enquiries Table
    $enquiryQuery = "CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        date DATE,
        message TEXT,
        status ENUM('new', 'read', 'responded') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($enquiryQuery);
    echo "Table 'enquiries' checked/created successfully.<br>";

    // Newsletters Table
    $newsletterQuery = "CREATE TABLE IF NOT EXISTS newsletters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($newsletterQuery);
    echo "Table 'newsletters' checked/created successfully.<br>";

    // Check if admin exists
    $check = "SELECT * FROM users WHERE username = 'admin'";
    $stmt = $pdo->prepare($check);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        $user = 'admin';
        $pass = password_hash('admin', PASSWORD_DEFAULT);
        
        $insert = "INSERT INTO users (username, password, role) VALUES (:u, :p, 'admin')";
        $stmt = $pdo->prepare($insert);
        $stmt->bindParam(':u', $user);
        $stmt->bindParam(':p', $pass);
        
        if($stmt->execute()){
            echo "Admin user created.<br>";
        } else {
            echo "Failed to create admin user.<br>";
        }
    } else {
        echo "Admin user already exists.<br>";
    }

} catch (PDOException $e) {
    die("DB ERROR: " . $e->getMessage());
}
?>
