<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

echo "<h3>Current 2FA Status</h3>";

// Check System-Wide Setting
$query = "SELECT * FROM settings WHERE setting_key = 'two_factor_system_enabled'";
$stmt = $db->prepare($query);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo "System-Wide 2FA Setting: " . ($row ? $row['setting_value'] : "NOT SET (NULL)") . "<br>";

// Check Admin User Settings
$query = "SELECT username, two_factor_enabled FROM users";
$stmt = $db->prepare($query);
$stmt->execute();
echo "<h4>User 2FA Status:</h4>";
while($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "User: " . $user['username'] . " | 2FA Enabled: " . $user['two_factor_enabled'] . "<br>";
}
?>
