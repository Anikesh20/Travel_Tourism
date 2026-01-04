<?php
include_once __DIR__ . '/../config/Database.php';

class PackageController {
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
                $this->update();
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
            $query = "SELECT * FROM packages ORDER BY id DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($packages);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function create() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid JSON data"]);
            return;
        }
        
        if (empty($data->destination) || empty($data->price)) {
            http_response_code(400);
            echo json_encode(["message" => "Destination and Price are required"]);
            return;
        }

        try {
            $query = "INSERT INTO packages (destination, description, price, duration, type, rating, image_url, badge) VALUES (:destination, :description, :price, :duration, :type, :rating, :image_url, :badge)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":destination", $data->destination);
            $stmt->bindValue(":description", isset($data->description) ? $data->description : '');
            $stmt->bindValue(":price", $data->price);
            $stmt->bindValue(":duration", isset($data->duration) ? $data->duration : '');
            $stmt->bindValue(":type", isset($data->type) ? $data->type : '');
            $stmt->bindValue(":rating", isset($data->rating) ? $data->rating : '5.0');
            $stmt->bindValue(":image_url", isset($data->image_url) ? $data->image_url : '');
            $stmt->bindValue(":badge", isset($data->badge) ? $data->badge : '');

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Package created"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create package"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function update() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!$data || empty($data->id)) {
            http_response_code(400);
            echo json_encode(["message" => "ID is required"]);
            return;
        }

        try {
            $query = "UPDATE packages SET destination=:destination, description=:description, price=:price, duration=:duration, type=:type, rating=:rating, image_url=:image_url, badge=:badge WHERE id=:id";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":destination", $data->destination);
            $stmt->bindValue(":description", isset($data->description) ? $data->description : '');
            $stmt->bindValue(":price", $data->price);
            $stmt->bindValue(":duration", isset($data->duration) ? $data->duration : '');
            $stmt->bindValue(":type", isset($data->type) ? $data->type : '');
            $stmt->bindValue(":rating", isset($data->rating) ? $data->rating : '5.0');
            $stmt->bindValue(":image_url", isset($data->image_url) ? $data->image_url : '');
            $stmt->bindValue(":badge", isset($data->badge) ? $data->badge : '');
            $stmt->bindValue(":id", $data->id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Package updated"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to update package"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function delete() {
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "ID is required"]);
            return;
        }

        try {
            $query = "DELETE FROM packages WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Package deleted"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete package"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>
