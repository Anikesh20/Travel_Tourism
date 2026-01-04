<?php
include_once __DIR__ . '/../config/Database.php';

class UserController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function getAll() {
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
            return;
        }

        $query = "SELECT id, username, role, created_at FROM users ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $users = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $users[] = $row;
        }

        echo json_encode($users);
    }
}
?>
