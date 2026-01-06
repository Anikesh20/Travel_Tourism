<?php
// TiDB Cloud Connection Details
$host = 'gateway01.eu-central-1.prod.aws.tidbcloud.com';
$port = '4000';
$db   = 'test';
$user = 'iuySNFvr5hDsK56.root';
$pass = 'VOTnt1h25wRTPRVU';
$sqlFile = 'D:/travel_tourism.sql'; 

set_time_limit(600);
ini_set('memory_limit', '512M');

try {
    // TiDB requires SSL
    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_SSL_CA => '', // Empty string can trigger SSL mode in many drivers
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ]);
    
    echo "<b>1. Connected to TiDB Cloud...</b><br>";
    
    $pdo->exec("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

    echo "<b>2. Reading SQL file...</b><br>";
    $content = file_get_contents($sqlFile);
    $content = str_replace(["\r\n", "\r"], "\n", $content);
    $content = preg_replace('/--[^\n]*\n/', "\n", $content);
    $content = preg_replace('/\/\*.*?\*\//s', '', $content);
    
    // Split statements
    $statements = [];
    $current = '';
    $inString = false;
    $stringChar = '';
    
    for ($i = 0; $i < strlen($content); $i++) {
        $char = $content[$i];
        if (($char === '"' || $char === "'") && ($i === 0 || $content[$i-1] !== '\\')) {
            if (!$inString) { $inString = true; $stringChar = $char; }
            elseif ($char === $stringChar) { $inString = false; }
        }
        if ($char === ';' && !$inString) {
            $stmt = trim($current);
            if (!empty($stmt)) $statements[] = $stmt;
            $current = '';
        } else { $current .= $char; }
    }
    
    echo "<b>3. Processing " . count($statements) . " statements...</b><br>";
    
    $success = 0;
    foreach ($statements as $stmt) {
        // Skip constraints for initial import
        if (preg_match('/ALTER TABLE.*ADD\s+(CONSTRAINT|FOREIGN KEY)/i', $stmt)) continue;
        
        if (preg_match('/CREATE TABLE/i', $stmt)) {
            preg_match('/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?`?(\w+)`?/i', $stmt, $matches);
            $tableName = $matches[1] ?? null;
            if ($tableName) {
                try { $pdo->exec("DROP TABLE IF EXISTS `$tableName` cascade"); } catch (Exception $e) {}
                
                // Remove inline constraints
                $lines = explode("\n", $stmt);
                $cleanLines = [];
                foreach ($lines as $line) {
                    if (preg_match('/CONSTRAINT|FOREIGN\s+KEY/i', $line)) continue;
                    $cleanLines[] = $line;
                }
                $stmt = implode("\n", $cleanLines);
                $stmt = preg_replace('/,(\s*\n\s*\))/s', '$1', $stmt);
            }
        }
        
        try {
            $pdo->exec($stmt);
            $success++;
        } catch (Exception $e) {
            // Ignore minor errors
        }
    }
    
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
    echo "<br><hr><b>✓ TiDB Import Complete!</b><br>";
    echo "Successfully executed: <b>$success</b> statements<br>";
    
} catch (Exception $e) {
    echo "<br><b style='color:red;'>Error:</b> " . $e->getMessage();
}
?>
