<?php
// Disable error display to output, log them instead to avoid breaking JSON
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri_parts = explode('/', $uri);

    // Filter out empty parts and re-index
    $uri_parts = array_values(array_filter($uri_parts, function($value) {
        return $value !== '';
    }));
    
    // Logic: Find 'api' in the path.
    // Example: /Travel%20and%20tourism/api/auth/login -> api found, next is auth
    // Example: /Travel%20and%20tourism/api/index.php/auth/login -> api found, next is index.php (SKIP), next is auth
    
    // Improved Logic: Find 'api' in the path, or handle root if 'api' is the entry point
    $endpoint_index = -1;
    foreach($uri_parts as $key => $part) {
        if (strtolower(urldecode($part)) === 'api') {
            $endpoint_index = $key;
            break;
        }
    }

    if ($endpoint_index === -1) {
        // Fallback for direct API calls in Vercel
        $controllerName = isset($uri_parts[0]) ? strtolower(urldecode($uri_parts[0])) : null;
        $methodName = isset($uri_parts[1]) ? strtolower(urldecode($uri_parts[1])) : null;
    } else {
        // Standard Skip index.php and find next parts
        $next_index = $endpoint_index + 1;
        if (isset($uri_parts[$next_index]) && strtolower($uri_parts[$next_index]) === 'index.php') {
            $next_index++;
        }
        $controllerName = isset($uri_parts[$next_index]) ? strtolower(urldecode($uri_parts[$next_index])) : null;
        $methodName = isset($uri_parts[$next_index + 1]) ? strtolower(urldecode($uri_parts[$next_index + 1])) : null;
    }

    if (!$controllerName) {
        echo json_encode(["message" => "Welcome to Travel API"]);
        exit;
    }

    if ($controllerName === 'auth' && $methodName === 'login') {
        $controllerPath = __DIR__ . '/controllers/AuthController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('AuthController')) {
            throw new Exception("AuthController class not found");
        }
        $auth = new AuthController();
        $auth->login();
    } elseif ($controllerName === 'auth' && $methodName === 'verify-otp') {
        $controllerPath = __DIR__ . '/controllers/AuthController.php';
        include_once $controllerPath;
        $auth = new AuthController();
        $auth->verifyOTP();
    } elseif ($controllerName === 'users') {
        $controllerPath = __DIR__ . '/controllers/UserController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('UserController')) {
            throw new Exception("UserController class not found");
        }
        $userController = new UserController();
        $userController->getAll();
    } elseif ($controllerName === 'settings') {
        $controllerPath = __DIR__ . '/controllers/SettingsController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('SettingsController')) {
            throw new Exception("SettingsController class not found");
        }
        $settingsController = new SettingsController();
        $settingsController->handleRequest($_SERVER['REQUEST_METHOD']);
    } elseif ($controllerName === 'auth' && $methodName === 'update-profile') {
        // Handle update profile via AuthController
         $controllerPath = __DIR__ . '/controllers/AuthController.php';
         include_once $controllerPath;
         $auth = new AuthController();
         $auth->updateProfile();
    } elseif ($controllerName === 'packages') {
        $controllerPath = __DIR__ . '/controllers/PackageController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('PackageController')) {
            throw new Exception("PackageController class not found");
        }
        $packageController = new PackageController();
        $packageController->handleRequest($_SERVER['REQUEST_METHOD']);
    } elseif ($controllerName === 'enquiries') {
        $controllerPath = __DIR__ . '/controllers/EnquiryController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('EnquiryController')) {
            throw new Exception("EnquiryController class not found");
        }
        $enquiryController = new EnquiryController();
        $enquiryController->handleRequest($_SERVER['REQUEST_METHOD']);
    } elseif ($controllerName === 'upload' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["message" => "No file uploaded or upload error"]);
            return;
        }

        $file = $_FILES['image'];
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        $maxSize = 5 * 1024 * 1024; // 5MB

        if (!in_array($file['type'], $allowedTypes)) {
            http_response_code(400);
            echo json_encode(["message" => "Invalid file type"]);
            return;
        }

        $uploadDir = __DIR__ . '/uploads/packages/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('package_', true) . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $host = $_SERVER['HTTP_HOST'];
            $url = $protocol . '://' . $host . '/api/uploads/packages/' . $filename;
            echo json_encode(["message" => "Uploaded successfully", "url" => $url]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to move file"]);
        }
    } elseif ($controllerName === 'newsletter') {
        $controllerPath = __DIR__ . '/controllers/NewsletterController.php';
        include_once $controllerPath;
        $newsletter = new NewsletterController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents("php://input"), true);
            echo json_encode($newsletter->subscribe($data));
        } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
            echo json_encode($newsletter->getAll());
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $id = isset($uri_parts[$next_index + 1]) ? $uri_parts[$next_index + 1] : null;
            if ($id) {
                echo json_encode(["success" => $newsletter->delete($id)]);
            } else {
                http_response_code(400);
                echo json_encode(["message" => "ID required"]);
            }
        }
    } elseif ($controllerName === 'bookings') {
        $controllerPath = __DIR__ . '/controllers/BookingController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('BookingController')) {
            throw new Exception("BookingController class not found");
        }
        $bookingController = new BookingController();
        $bookingController->handleRequest($_SERVER['REQUEST_METHOD']);
    } elseif ($controllerName === 'testimonials') {
        $controllerPath = __DIR__ . '/controllers/TestimonialController.php';
        if (!file_exists($controllerPath)) {
            throw new Exception("Controller file not found: $controllerPath");
        }
        include_once $controllerPath;
        if (!class_exists('TestimonialController')) {
            throw new Exception("TestimonialController class not found");
        }
        $testimonialController = new TestimonialController();
        $testimonialController->handleRequest($_SERVER['REQUEST_METHOD']);
    } elseif ($controllerName === 'repair-db') {
        include_once __DIR__ . '/config/Database.php';
        $db = new Database();
        $conn = $db->getConnection();
        
        if (!$conn) {
             echo json_encode(["status" => "error", "message" => "Database connection failed"]);
             exit;
        }

        $results = [];
        
        // Define all tables (No Foreign Keys for Aiven compatibility)
        $tables = [
            "users" => "CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'staff') DEFAULT 'admin',
                two_factor_enabled TINYINT(1) DEFAULT 0,
                otp_code VARCHAR(10),
                otp_expiry DATETIME,
                email VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "settings" => "CREATE TABLE IF NOT EXISTS settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                setting_key VARCHAR(255) UNIQUE NOT NULL,
                setting_value TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            "packages" => "CREATE TABLE IF NOT EXISTS packages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                destination VARCHAR(255) NOT NULL,
                price VARCHAR(100) NOT NULL,
                duration VARCHAR(100) NOT NULL,
                type VARCHAR(100) NOT NULL,
                rating VARCHAR(10) DEFAULT '5.0',
                image_url TEXT,
                badge VARCHAR(50),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "bookings" => "CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                package_id INT NOT NULL,
                user_name VARCHAR(255) NOT NULL,
                user_email VARCHAR(255) NOT NULL,
                user_phone VARCHAR(50) NOT NULL,
                booking_date DATE NOT NULL,
                travelers INT DEFAULT 1,
                total_price VARCHAR(100),
                status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "enquiries" => "CREATE TABLE IF NOT EXISTS enquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                message TEXT NOT NULL,
                status ENUM('pending', 'read', 'responded') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "newsletter" => "CREATE TABLE IF NOT EXISTS newsletter (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            "testimonials" => "CREATE TABLE IF NOT EXISTS testimonials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                rating INT DEFAULT 5,
                image_url TEXT,
                status ENUM('pending', 'approved') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )"
        ];

        // Ensure primary key requirement is temporarily disabled if needed
        $conn->exec("SET SESSION sql_require_primary_key = 0");

        foreach ($tables as $name => $sql) {
            try {
                $conn->exec($sql);
                $results[$name] = "OK";
            } catch (Exception $e) {
                $results[$name] = "Error: " . $e->getMessage();
            }
        }

        // Fix Admin if missing
        $checkAdmin = $conn->query("SELECT id FROM users WHERE username = 'admin'");
        if ($checkAdmin->rowCount() == 0) {
            $pass = password_hash("admin123", PASSWORD_DEFAULT);
            $conn->exec("INSERT INTO users (username, password, role) VALUES ('admin', '$pass', 'admin')");
            $results["admin_user"] = "Created (admin/admin123)";
        }

        echo json_encode(["status" => "success", "results" => $results]);

    } elseif ($controllerName === 'stats') {
        include_once __DIR__ . '/config/Database.php';
        $db = new Database();
        $conn = $db->getConnection();
        
        $stats = [
            "packages" => $conn->query("SELECT COUNT(*) FROM packages")->fetchColumn(),
            "enquiries" => $conn->query("SELECT COUNT(*) FROM enquiries")->fetchColumn(),
            "bookings" => $conn->query("SELECT COUNT(*) FROM bookings")->fetchColumn(),
            "newsletters" => $conn->query("SELECT COUNT(*) FROM newsletter")->fetchColumn(),
        ];
        echo json_encode($stats);

    } elseif ($controllerName === 'reset-admin') {
        include_once __DIR__ . '/config/Database.php';
        $db = new Database();
        $conn = $db->getConnection();
        $new_pass = password_hash("admin123", PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password = :pass WHERE username = 'admin'");
        if ($stmt->execute([':pass' => $new_pass])) {
            echo json_encode(["message" => "Admin password reset to: admin123"]);
        } else {
            echo json_encode(["message" => "Failed to reset password"]);
        }

    } elseif ($controllerName === 'debug') {
        // ... existing debug code ...
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found: $controllerName"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Server Error: " . $e->getMessage()]);
}
?>
