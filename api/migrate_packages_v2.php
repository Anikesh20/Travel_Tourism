<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

try {
    $sql = "ALTER TABLE packages 
            ADD COLUMN itinerary TEXT NULL,
            ADD COLUMN included TEXT NULL,
            ADD COLUMN excluded TEXT NULL,
            ADD COLUMN visa_requirements TEXT NULL";
    
    $db->exec($sql);
    echo "Successfully updated packages table with new columns.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
