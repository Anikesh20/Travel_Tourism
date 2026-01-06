<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    try {
        // 1. Add description column to packages if it doesn't exist
        $checkCol = "SHOW COLUMNS FROM packages LIKE 'description'";
        $stmt = $db->query($checkCol);
        if ($stmt->rowCount() == 0) {
            $db->exec("ALTER TABLE packages ADD description TEXT");
            echo "Added 'description' column to packages table.<br>";
        }

        // 2. Create bookings table
        $bookingQuery = "CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            package_id INT NOT NULL,
            user_name VARCHAR(255) NOT NULL,
            user_email VARCHAR(255) NOT NULL,
            user_phone VARCHAR(50) NOT NULL,
            booking_date DATE NOT NULL,
            travelers INT DEFAULT 1,
            total_price VARCHAR(100),
            status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
        )";
        $db->exec($bookingQuery);
        echo "Table 'bookings' checked/created.<br>";

        echo "Migration completed successfully.";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Database connection failed.";
}
?>
