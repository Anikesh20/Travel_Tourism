<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    try {
        // 1. Create Settings Table
        $query = "CREATE TABLE IF NOT EXISTS settings (
            setting_key VARCHAR(50) PRIMARY KEY,
            setting_value TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        $db->exec($query);
        echo "Table 'settings' checked/created.\n";

        // Insert default SMTP settings if not exist
        $defaults = [
            'smtp_email' => '',
            'smtp_password' => '',
            'smtp_host' => 'smtp.gmail.com',
            'smtp_port' => '587'
        ];

        foreach ($defaults as $key => $val) {
            $check = "SELECT setting_key FROM settings WHERE setting_key = :key";
            $stmt = $db->prepare($check);
            $stmt->bindParam(':key', $key);
            $stmt->execute();
            
            if ($stmt->rowCount() == 0) {
                $ins = "INSERT INTO settings (setting_key, setting_value) VALUES (:key, :val)";
                $stmtIns = $db->prepare($ins);
                $stmtIns->bindParam(':key', $key);
                $stmtIns->bindParam(':val', $val);
                $stmtIns->execute();
            }
        }
        echo "Default settings initialized.\n";
        
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Database connection failed.";
}
?>
