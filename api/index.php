<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/Database.php';
require_once 'utils/Response.php';

$database = new Database();
$db = $database->getConnection();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Normalize URI
$uri = str_replace(['/Travel%20and%20tourism/api/', '/Travel and tourism/api/'], '', $uri);
$uri = trim($uri, '/');
$segments = explode('/', $uri);

$resource = $segments[0] ?? '';
$action = $segments[1] ?? '';

// Simple Router
switch ($resource) {
    case 'stats':
        require_once 'controllers/DashboardController.php';
        $controller = new DashboardController($db);
        $controller->getStats();
        break;
        
    case 'enquiries':
        require_once 'controllers/EnquiryController.php';
        $controller = new EnquiryController($db);
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $controller->getAll();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $controller->create();
        }
        break;

    case 'packages':
        require_once 'controllers/PackageController.php';
        $controller = new PackageController($db);
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $controller->getAll();
        }
        break;

    default:
        Response::error("Endpoint not found: " . $resource, 404);
        break;
}
?>
