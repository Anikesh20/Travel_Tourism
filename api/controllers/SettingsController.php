<?php
include_once __DIR__ . '/../config/Database.php';

class SettingsController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function handleRequest($method) {
        if ($method === 'GET') {
            $this->getSettings();
        } elseif ($method === 'POST') {
            $this->updateSettings();
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
        }
    }

    private function getSettings() {
        $query = "SELECT * FROM settings";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $settings = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }

        echo json_encode($settings);
    }

    private function updateSettings() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "No data provided"]);
            return;
        }

        try {
            $this->conn->beginTransaction();

            $query = "INSERT INTO settings (setting_key, setting_value) VALUES (:key, :val) ON DUPLICATE KEY UPDATE setting_value = :val";
            $stmt = $this->conn->prepare($query);

            foreach ($data as $key => $value) {
                // simple validation to ensure we only update expected settings could be added here
                $stmt->bindParam(':key', $key);
                $stmt->bindParam(':val', $value);
                $stmt->execute();
            }

            $this->conn->commit();
            echo json_encode(["message" => "Settings updated successfully"]);

        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["message" => "Failed to update settings: " . $e->getMessage()]);
        }
    }
}
?>
