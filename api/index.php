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
    } elseif ($controllerName === 'debug') {
        include_once __DIR__ . '/config/Database.php';
        $db = new Database();
        $conn = $db->getConnection();
        if ($conn) {
            $stmt = $conn->query("SHOW TABLES");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            echo json_encode([
                "status" => "success",
                "message" => "Connected to database successfully",
                "tables" => $tables
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to connect to database. Check your Vercel Environment Variables and Aiven IP whitelist."
            ]);
        }
    } else {

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Server Error: " . $e->getMessage()]);
}
?>
