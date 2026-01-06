<?php
include_once __DIR__ . '/config/Database.php';
include_once __DIR__ . '/config/Mailer.php';

$database = new Database();
$db = $database->getConnection();

function getSetting($conn, $key) {
    $query = "SELECT setting_value FROM settings WHERE setting_key = :key";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':key', $key);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ? $row['setting_value'] : null;
}

$host = getSetting($db, 'smtp_host');
$port = getSetting($db, 'smtp_port');
$user = getSetting($db, 'smtp_user');
$pass = getSetting($db, 'smtp_pass');

echo "<h3>SMTP Test</h3>";
echo "Host: $host<br>";
echo "Port: $port<br>";
echo "User: $user<br>";
echo "Pass: " . str_repeat("*", strlen($pass)) . "<br><br>";

if (!$user || !$pass) {
    die("Error: SMTP User or Password not set in database.");
}

$mailer = new Mailer($host, $port, $user, $pass);
$result = $mailer->send($user, "SMTP Test Mail", "If you receive this, your SMTP configuration is correct!");

if ($result) {
    echo "<b style='color:green'>Success!</b> Test email sent to $user. Check your inbox (and spam folder).";
} else {
    echo "<b style='color:red'>Failed!</b> Check 'mail_error.log' in the api directory for details.";
}
?>
