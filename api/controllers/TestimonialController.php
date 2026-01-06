<?php
include_once __DIR__ . '/../config/Database.php';

class TestimonialController {
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
                if (isset($_GET['id'])) {
                    $this->getOne($_GET['id']);
                } else {
                    $this->getAll();
                }
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
            $query = "SELECT * FROM testimonials ORDER BY id DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($testimonials);
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
        
        if (empty($data->name) || empty($data->content)) {
            http_response_code(400);
            echo json_encode(["message" => "Name and Content are required"]);
            return;
        }

        try {
            $query = "INSERT INTO testimonials (name, role, content, rating, avatar) 
                      VALUES (:name, :role, :content, :rating, :avatar)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":name", $data->name);
            $stmt->bindValue(":role", isset($data->role) ? $data->role : '');
            $stmt->bindValue(":content", $data->content);
            $stmt->bindValue(":rating", isset($data->rating) ? $data->rating : 5);
            $stmt->bindValue(":avatar", isset($data->avatar) ? $data->avatar : '');

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Testimonial created"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create testimonial"]);
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
            $query = "UPDATE testimonials SET 
                      name=:name, 
                      role=:role, 
                      content=:content, 
                      rating=:rating, 
                      avatar=:avatar 
                      WHERE id=:id";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":name", $data->name);
            $stmt->bindValue(":role", isset($data->role) ? $data->role : '');
            $stmt->bindValue(":content", $data->content);
            $stmt->bindValue(":rating", isset($data->rating) ? $data->rating : 5);
            $stmt->bindValue(":avatar", isset($data->avatar) ? $data->avatar : '');
            $stmt->bindValue(":id", $data->id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Testimonial updated"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to update testimonial"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function getOne($id) {
        try {
            $query = "SELECT * FROM testimonials WHERE id = :id LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $testimonial = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($testimonial);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Testimonial not found"]);
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
            $query = "DELETE FROM testimonials WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Testimonial deleted"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete testimonial"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>
