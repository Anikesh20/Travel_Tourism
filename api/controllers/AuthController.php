<?php
include_once __DIR__ . '/../config/Database.php';

class AuthController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->username) || !isset($data->password)) {
            http_response_code(400);
            echo json_encode(["message" => "Missing credentials"]);
            return;
        }

        $query = "SELECT * FROM users WHERE username = :username LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $data->username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($data->password, $row['password'])) {
                // Determine redirect or token
                // For this simple example, just return success and role
                echo json_encode([
                    "message" => "Login successful",
                    "user" => [
                        "id" => $row['id'],
                        "username" => $row['username'],
                        "role" => $row['role']
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Invalid password"]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["message" => "User not found"]);
        }
    }

    public function updateProfile() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->id) || !isset($data->username)) {
            http_response_code(400);
            echo json_encode(["message" => "Missing required fields"]);
            return;
        }

        // Ideally verify current password if changing password, but for simplicity:
        $query = "UPDATE users SET username = :username";
        
        if (!empty($data->password)) {
            $query .= ", password = :password";
        }
        
        $query .= " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $data->username);
        $stmt->bindParam(':id', $data->id);
        
        if (!empty($data->password)) {
            $hashed = password_hash($data->password, PASSWORD_DEFAULT);
            $stmt->bindParam(':password', $hashed);
        }
        
        if ($stmt->execute()) {
             // Fetch updated user to return
             echo json_encode(["message" => "Profile updated successfully"]);
        } else {
             http_response_code(500);
             echo json_encode(["message" => "Failed to update profile"]);
        }
    }
}
?>
