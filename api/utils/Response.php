<?php
class Response {
    public static function send($success, $message, $data = null, $code = 200) {
        http_response_code($code);
        echo json_encode([
            "success" => $success,
            "message" => $message,
            "data" => $data
        ]);
        exit();
    }

    public static function error($message, $code = 400) {
        self::send(false, $message, null, $code);
    }

    public static function success($message, $data = null) {
        self::send(true, $message, $data, 200);
    }
}
?>
