<?php
include_once __DIR__ . '/config/Database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    try {
        $query = "CREATE TABLE IF NOT EXISTS packages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            destination VARCHAR(255) NOT NULL,
            price VARCHAR(100) NOT NULL,
            duration VARCHAR(100) NOT NULL,
            type VARCHAR(100) NOT NULL,
            rating VARCHAR(10) DEFAULT '5.0',
            image_url TEXT,
            badge VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $db->exec($query);
        echo "Table 'packages' checked/created.\n";
        
        // Check if empty, populate with demo data?
        $check = "SELECT count(*) as count FROM packages";
        $stmt = $db->query($check);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row['count'] == 0) {
            $demos = [
                [
                    'destination' => 'Dubai, UAE',
                    'price' => 'NPR 75,000',
                    'duration' => '5 Days',
                    'type' => 'Adventure',
                    'rating' => '4.9',
                    'image_url' => 'https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=2070&auto=format&fit=crop',
                    'badge' => 'LUXURY'
                ],
                [
                    'destination' => 'Bangkok, Thailand',
                    'price' => 'NPR 45,000',
                    'duration' => '4 Days',
                    'type' => 'Adventure',
                    'rating' => '4.8',
                    'image_url' => 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000&auto=format&fit=crop',
                    'badge' => 'TRENDING'
                ],
                [
                    'destination' => 'Pokhara, Nepal',
                    'price' => 'NPR 12,000',
                    'duration' => '3 Days',
                    'type' => 'Adventure',
                    'rating' => '4.7',
                    'image_url' => 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop',
                    'badge' => 'NATURE'
                ],
                [
                    'destination' => 'Bali, Indonesia',
                    'price' => 'NPR 85,000',
                    'duration' => '6 Days',
                    'type' => 'Adventure',
                    'rating' => '4.9',
                    'image_url' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
                    'badge' => 'FEATURED'
                ]
            ];
            
            $insert = "INSERT INTO packages (destination, price, duration, type, rating, image_url, badge) VALUES (:destination, :price, :duration, :type, :rating, :image_url, :badge)";
            $stmtInsert = $db->prepare($insert);
            
            foreach ($demos as $demo) {
                $stmtInsert->execute($demo);
            }
            echo "Demo packages inserted.\n";
        }

    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Database connection failed.";
}
?>
