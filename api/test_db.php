<?php
include_once __DIR__ . '/config/Database.php';
$db = new Database();
$conn = $db->getConnection();
if ($conn) {
    echo "Connected successfully\n";
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables: " . implode(", ", $tables) . "\n";
} else {
    echo "Connection failed\n";
}
?>
