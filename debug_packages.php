<?php
require_once 'api/config/Database.php';
$db = new Database();
$conn = $db->getConnection();
if ($conn) {
    try {
        $stmt = $conn->query("SELECT id, destination, price FROM packages LIMIT 5");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_r($data);
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Connection Failed";
}
?>
