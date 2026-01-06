<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    try {
        // 1. Add 2FA columns to users table
        $columns = [
            'two_factor_enabled' => "INT DEFAULT 0",
            'otp_code' => "VARCHAR(10) NULL",
            'otp_expiry' => "DATETIME NULL"
        ];

        foreach ($columns as $column => $type) {
            $check = "SHOW COLUMNS FROM users LIKE '$column'";
            $stmt = $db->query($check);
            if ($stmt->rowCount() == 0) {
                $db->exec("ALTER TABLE users ADD $column $type");
                echo "Added column '$column' to users table.\n";
            }
        }

        // 2. Add SMTP settings to settings table
        $smtp_settings = [
            'smtp_user' => 'sajilosahayog@gmail.com',
            'smtp_pass' => 'ftsrixymhtyfdtbm',
            'smtp_host' => 'smtp.gmail.com',
            'smtp_port' => '587',
            'two_factor_system_enabled' => '0'
        ];

        foreach ($smtp_settings as $key => $val) {
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
                echo "Added setting '$key'.\n";
            } else {
                // Update existing settings with user provided values for SMTP
                if (in_array($key, ['smtp_user', 'smtp_pass'])) {
                    $upd = "UPDATE settings SET setting_value = :val WHERE setting_key = :key";
                    $stmtUpd = $db->prepare($upd);
                    $stmtUpd->bindParam(':key', $key);
                    $stmtUpd->bindParam(':val', $val);
                    $stmtUpd->execute();
                    echo "Updated setting '$key'.\n";
                }
            }
        }
        
        echo "Migration completed successfully.";
        
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Database connection failed.";
}
?>
