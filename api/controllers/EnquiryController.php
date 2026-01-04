<?php
class EnquiryController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        try {
            $stmt = $this->db->query("
                SELECT e.*, p.title as package_name 
                FROM enquiries e 
                LEFT JOIN packages p ON e.package_id = p.id 
                ORDER BY e.created_at DESC
            ");
            $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
            Response::success("Enquiries retrieved successfully", $enquiries);
        } catch (Exception $e) {
            Response::error($e->getMessage());
        }
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->name) || !isset($data->email)) {
            Response::error("Missing required fields: name and email");
        }

        try {
            $stmt = $this->db->prepare("
                INSERT INTO enquiries (name, email, phone, message, package_id) 
                VALUES (:name, :email, :phone, :message, :package_id)
            ");
            
            $stmt->execute([
                ':name' => $data->name,
                ':email' => $data->email,
                ':phone' => $data->phone ?? null,
                ':message' => $data->message ?? null,
                ':package_id' => $data->package_id ?? null
            ]);

            Response::success("Enquiry submitted successfully", ["id" => $this->db->lastInsertId()]);
        } catch (Exception $e) {
            Response::error($e->getMessage());
        }
    }
}
?>
