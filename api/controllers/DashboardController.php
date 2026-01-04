<?php
class DashboardController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getStats() {
        try {
            // Get total enquiries
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM enquiries");
            $total_enquiries = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

            // Get active bookings
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM bookings WHERE booking_status = 'confirmed'");
            $active_bookings = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

            // Get featured packages
            $stmt = $this->db->query("SELECT COUNT(*) as total FROM packages WHERE is_featured = 1");
            $featured_packages = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

            // Get total revenue
            $stmt = $this->db->query("SELECT SUM(total_price) as total FROM bookings WHERE payment_status = 'paid'");
            $total_revenue = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

            $data = [
                'stats' => [
                    ['label' => 'Total Enquiries', 'value' => $total_enquiries, 'trend' => '+12%', 'isPositive' => true, 'color' => 'bg-blue-500'],
                    ['label' => 'Active Bookings', 'value' => $active_bookings, 'trend' => '+5%', 'isPositive' => true, 'color' => 'bg-emerald-500'],
                    ['label' => 'Featured Packages', 'value' => $featured_packages, 'trend' => '0%', 'isPositive' => true, 'color' => 'bg-orange-500'],
                    ['label' => 'Total Revenue', 'value' => 'NPR ' . number_format($total_revenue / 1000, 1) . 'K', 'trend' => '-2%', 'isPositive' => false, 'color' => 'bg-purple-500'],
                ],
                'recent_enquiries' => $this->getRecentEnquiries()
            ];

            Response::success("Dashboard stats retrieved successfully", $data);
        } catch (Exception $e) {
            Response::error($e->getMessage());
        }
    }

    private function getRecentEnquiries() {
        $stmt = $this->db->query("
            SELECT e.*, p.title as destination 
            FROM enquiries e 
            LEFT JOIN packages p ON e.package_id = p.id 
            ORDER BY e.created_at DESC 
            LIMIT 5
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
