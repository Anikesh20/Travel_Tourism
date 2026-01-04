<?php
require_once __DIR__ . '/../config/Database.php';

class NewsletterController {
    private $db;
    private $table = 'newsletters';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function subscribe($data) {
        if (!isset($data['email'])) {
            return ["success" => false, "message" => "Email is required"];
        }

        $email = $data['email'];

        // Check if already exists
        $check = "SELECT id FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->db->prepare($check);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return ["success" => true, "message" => "Already subscribed"];
        }

        $query = "INSERT INTO " . $this->table . " (email) VALUES (:email)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "Subscribed successfully"];
        }

        return ["success" => false, "message" => "Failed to subscribe"];
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
