<?php
include_once __DIR__ . '/../config/Database.php';
include_once __DIR__ . '/../config/Mailer.php';

class AuthController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    private function getSetting($key) {
        $query = "SELECT setting_value FROM settings WHERE setting_key = :key";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':key', $key);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['setting_value'] : null;
    }

    private function sendEmail($to, $subject, $message) {
        $host = $this->getSetting('smtp_host') ?: 'smtp.gmail.com';
        $port = $this->getSetting('smtp_port') ?: '587';
        $user = $this->getSetting('smtp_user');
        $pass = $this->getSetting('smtp_pass');

        if ($user && $pass) {
            $mailer = new Mailer($host, $port, $user, $pass);
            return $mailer->send($to, $subject, $message);
        }
        
        // Fallback to mail() if no SMTP settings provided
        $headers = "From: " . ($user ?: "admin@travel.com") . "\r\n";
        return mail($to, $subject, $message, $headers);
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
                
                $two_factor_system = $this->getSetting('two_factor_system_enabled');
                
                // Simplified: Follow the system-wide toggle exclusively
                $is_2fa_active = ($two_factor_system === '1');

                if ($is_2fa_active) {
                    $otp = sprintf("%06d", mt_rand(1, 999999));
                    $expiry = date('Y-m-d H:i:s', strtotime('+10 minutes'));
                    
                    $update = "UPDATE users SET otp_code = :otp, otp_expiry = :expiry WHERE id = :id";
                    $updStmt = $this->conn->prepare($update);
                    $updStmt->bindParam(':otp', $otp);
                    $updStmt->bindParam(':expiry', $expiry);
                    $updStmt->bindParam(':id', $row['id']);
                    $updStmt->execute();
                    
                    $email = $this->getSetting('smtp_user');
                    $subject = "Your Login OTP - Travel Admin";
                    $message = "Your OTP for admin login is: $otp\nIt expires in 10 minutes.";
                    
                    $this->sendEmail($email, $subject, $message);
                    
                    echo json_encode([
                        "status" => "2fa_required",
                        "message" => "OTP sent to registered email",
                        "user_id" => $row['id']
                    ]);
                } else {
                    echo json_encode([
                        "status" => "success",
                        "message" => "Login successful",
                        "user" => [
                            "id" => $row['id'],
                            "username" => $row['username'],
                            "role" => $row['role'],
                            "two_factor_enabled" => (int)$row['two_factor_enabled']
                        ]
                    ]);
                }
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Invalid password"]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["message" => "User not found"]);
        }
    }

    public function verifyOTP() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->user_id) || !isset($data->otp)) {
            http_response_code(400);
            echo json_encode(["message" => "Missing user_id or otp"]);
            return;
        }

        $query = "SELECT * FROM users WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $data->user_id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $now = date('Y-m-d H:i:s');
            
            if ($row['otp_code'] === $data->otp && $row['otp_expiry'] > $now) {
                $clear = "UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE id = :id";
                $clearStmt = $this->conn->prepare($clear);
                $clearStmt->bindParam(':id', $data->user_id);
                $clearStmt->execute();

                echo json_encode([
                    "status" => "success",
                    "message" => "Login successful",
                    "user" => [
                        "id" => $row['id'],
                        "username" => $row['username'],
                        "role" => $row['role'],
                        "two_factor_enabled" => (int)$row['two_factor_enabled']
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Invalid or expired OTP"]);
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

        $query = "UPDATE users SET username = :username";
        $params = [':username' => $data->username, ':id' => $data->id];
        
        if (!empty($data->password)) {
            $query .= ", password = :password";
            $params[':password'] = password_hash($data->password, PASSWORD_DEFAULT);
        }

        if (isset($data->two_factor_enabled)) {
            $query .= ", two_factor_enabled = :two_fa";
            $params[':two_fa'] = $data->two_factor_enabled ? 1 : 0;
        }
        
        $query .= " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        foreach ($params as $key => &$val) {
            $stmt->bindParam($key, $val);
        }
        
        if ($stmt->execute()) {
             echo json_encode(["message" => "Profile updated successfully"]);
        } else {
             http_response_code(500);
             echo json_encode(["message" => "Failed to update profile"]);
        }
    }
}
?>
