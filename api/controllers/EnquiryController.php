<?php
include_once __DIR__ . '/../config/Database.php';

class EnquiryController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function handleRequest($method) {
        if ($this->conn === null) {
            http_response_code(500);
            echo json_encode(["message" => "Database connection failed"]);
            return;
        }

        switch ($method) {
            case 'GET':
                $this->getAll();
                break;
            case 'POST':
                $this->create();
                break;
            case 'PUT':
                $this->updateStatus();
                break;
            case 'DELETE':
                $this->delete();
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Method not allowed"]);
                break;
        }
    }

    private function getAll() {
        try {
            $query = "SELECT * FROM enquiries ORDER BY created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(["status" => "success", "data" => $enquiries]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function create() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
            return;
        }
        
        if (empty($data->name) || empty($data->phone) || empty($data->email)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Name, Phone and Email are required"]);
            return;
        }

        try {
            $query = "INSERT INTO enquiries (name, phone, email, date, message) VALUES (:name, :phone, :email, :date, :message)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":name", $data->name);
            $stmt->bindValue(":phone", $data->phone);
            $stmt->bindValue(":email", $data->email);
            $stmt->bindValue(":date", !empty($data->date) ? $data->date : null);
            $stmt->bindValue(":message", isset($data->message) ? $data->message : '');

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["status" => "success", "message" => "Enquiry submitted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Failed to submit enquiry"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function updateStatus() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!$data || empty($data->id) || empty($data->status)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID and status are required"]);
            return;
        }

        try {
            $query = "UPDATE enquiries SET status=:status WHERE id=:id";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":status", $data->status);
            $stmt->bindValue(":id", $data->id);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Status updated"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Failed to update status"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function delete() {
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID is required"]);
            return;
        }

        try {
            $query = "DELETE FROM enquiries WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Enquiry deleted"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Failed to delete enquiry"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>
