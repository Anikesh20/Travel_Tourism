<?php
include_once __DIR__ . '/../config/Database.php';
include_once __DIR__ . '/../config/NotificationService.php';

class BookingController {
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
            // Join with packages to get destination info
            $query = "SELECT b.*, p.destination as package_name 
                      FROM bookings b 
                      JOIN packages p ON b.package_id = p.id 
                      ORDER BY b.created_at DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($bookings);
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
        
        if (empty($data->package_id) || empty($data->user_name) || empty($data->user_email)) {
            http_response_code(400);
            echo json_encode(["message" => "Package, Name and Email are required"]);
            return;
        }

        try {
            $query = "INSERT INTO bookings (package_id, user_name, user_email, user_phone, booking_date, travelers, total_price, status) 
                      VALUES (:package_id, :user_name, :user_email, :user_phone, :booking_date, :travelers, :total_price, 'pending')";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(":package_id", $data->package_id);
            $stmt->bindValue(":user_name", $data->user_name);
            $stmt->bindValue(":user_email", $data->user_email);
            $stmt->bindValue(":user_phone", isset($data->user_phone) ? $data->user_phone : '');
            $stmt->bindValue(":booking_date", isset($data->booking_date) ? $data->booking_date : date('Y-m-d'));
            $stmt->bindValue(":travelers", isset($data->travelers) ? $data->travelers : 1);
            $stmt->bindValue(":total_price", isset($data->total_price) ? $data->total_price : '');

            if ($stmt->execute()) {
                // Send Notification to Admin
                $notifier = new NotificationService();
                $subject = "New Package Booking Request";
                
                $htmlContent = "
                    <div class='data-row'>
                        <span class='label'>Traveler Name</span>
                        <span class='value'>" . htmlspecialchars($data->user_name) . "</span>
                    </div>
                    <div class='data-row'>
                        <span class='label'>Email Address</span>
                        <span class='value'>" . htmlspecialchars($data->user_email) . "</span>
                    </div>
                    <div class='data-row'>
                        <span class='label'>Phone Number</span>
                        <span class='value'>" . ($data->user_phone ? htmlspecialchars($data->user_phone) : 'N/A') . "</span>
                    </div>
                    <div class='data-row'>
                        <span class='label'>Travel Date</span>
                        <span class='value'>" . ($data->booking_date ? htmlspecialchars($data->booking_date) : 'N/A') . "</span>
                    </div>
                    <div class='data-row'>
                        <span class='label'>Total Price</span>
                        <span class='value'>" . ($data->total_price ? htmlspecialchars($data->total_price) : 'N/A') . "</span>
                    </div>";
                
                $notifier->sendAdminNotification($subject, $htmlContent, 'booking');

                http_response_code(201);
                echo json_encode(["message" => "Booking successful. We will contact you soon."]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create booking"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    private function updateStatus() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!$data || empty($data->id) || empty($data->status)) {
            http_response_code(400);
            echo json_encode(["message" => "ID and Status are required"]);
            return;
        }

        try {
            // First, get booking details to send email
            $getBookingQuery = "SELECT b.*, p.destination 
                                FROM bookings b 
                                JOIN packages p ON b.package_id = p.id 
                                WHERE b.id = :id";
            $getStmt = $this->conn->prepare($getBookingQuery);
            $getStmt->bindValue(":id", $data->id);
            $getStmt->execute();
            $booking = $getStmt->fetch(PDO::FETCH_ASSOC);

            if (!$booking) {
                http_response_code(404);
                echo json_encode(["message" => "Booking not found"]);
                return;
            }

            $query = "UPDATE bookings SET status = :status WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":status", $data->status);
            $stmt->bindValue(":id", $data->id);

            if ($stmt->execute()) {
                // Send Notification to User
                $notifier = new NotificationService();
                $type = $data->status === 'confirmed' ? 'booking' : 'info';
                $statusLabel = ucfirst($data->status);
                
                $subject = "Update on Your Booking: " . $booking['destination'];
                
                if ($data->status === 'confirmed') {
                    $message = "We are thrilled to inform you that your booking for <strong>" . $booking['destination'] . "</strong> has been <strong>CONFIRMED</strong>! Our team is preparing for your arrival.";
                } else if ($data->status === 'cancelled') {
                    $message = "We regret to inform you that your booking for <strong>" . $booking['destination'] . "</strong> has been <strong>CANCELLED</strong>. If you believe this is an error, please contact us.";
                } else {
                    $message = "The status of your booking for <strong>" . $booking['destination'] . "</strong> has been updated to: <strong>" . $statusLabel . "</strong>.";
                }

                $htmlContent = "
                    <div style='background: #fff; padding: 20px; border-radius: 10px;'>
                        <p>$message</p>
                        <div class='data-row' style='margin-top:20px'>
                            <span class='label'>Destination</span>
                            <span class='value'>" . htmlspecialchars($booking['destination']) . "</span>
                        </div>
                        <div class='data-row'>
                            <span class='label'>New Status</span>
                            <span class='value' style='color:" . ($data->status === 'confirmed' ? '#059669' : '#e11d48') . "'>$statusLabel</span>
                        </div>
                        <div class='data-row'>
                            <span class='label'>Booking Date</span>
                            <span class='value'>" . htmlspecialchars($booking['booking_date']) . "</span>
                        </div>
                    </div>";

                $notifier->sendUserNotification($booking['user_email'], $booking['user_name'], $subject, $htmlContent, $type);

                echo json_encode(["message" => "Booking status updated and user notified"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to update booking"]);
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
            $query = "DELETE FROM bookings WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Booking deleted"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete booking"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }
}
?>
