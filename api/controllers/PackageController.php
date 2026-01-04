<?php
class PackageController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        try {
            $stmt = $this->db->query("
                SELECT p.*, d.name as destination_name 
                FROM packages p 
                LEFT JOIN destinations d ON p.destination_id = d.id 
                ORDER BY p.created_at DESC
            ");
            $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            Response::success("Packages retrieved successfully", $packages);
        } catch (Exception $e) {
            Response::error($e->getMessage());
        }
    }
}
?>
