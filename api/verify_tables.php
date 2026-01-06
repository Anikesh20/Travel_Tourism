<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

echo "<h3>Verifying Tables</h3>";

$tables = ['packages', 'bookings'];
foreach ($tables as $table) {
    $res = $db->query("SHOW TABLES LIKE '$table'");
    if ($res->rowCount() > 0) {
        echo "Table '$table' exists.<br>";
        $cols = $db->query("DESCRIBE $table");
        echo "<ul>";
        while($col = $cols->fetch(PDO::FETCH_ASSOC)) {
            echo "<li>" . $col['Field'] . " (" . $col['Type'] . ")</li>";
        }
        echo "</ul>";
    } else {
        echo "Table '$table' MISSING!<br>";
    }
}
?>
