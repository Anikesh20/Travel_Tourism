<?php
class Mailer {
    private $host;
    private $port;
    private $user;
    private $pass;
    private $error_log;

    public function __construct($host, $port, $user, $pass) {
        $this->host = $host;
        $this->port = $port;
        $this->user = $user;
        $this->pass = $pass;
        $this->error_log = __DIR__ . '/../../mail_error.log';
    }

    private function log($msg) {
        file_put_contents($this->error_log, date('[Y-m-d H:i:s] ') . $msg . "\n", FILE_APPEND);
    }

    public function send($to, $subject, $message) {
        try {
            // For Gmail port 587, we need STARTTLS. 
            // For port 465, we need implicit SSL.
            $host = $this->host;
            if ($this->port == 465) {
                $host = "ssl://" . $this->host;
            }

            $timeout = 30;
            $socket = fsockopen($host, $this->port, $errno, $errstr, $timeout);
            
            if (!$socket) {
                $this->log("Connection failed: $errno - $errstr");
                return false;
            }

            stream_set_timeout($socket, 15);
            $this->log("Connected to " . $host);

            $this->log("S: " . $this->getResponse($socket)); // 220

            fwrite($socket, "EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\n");
            $this->log("C: EHLO");
            $this->log("S: " . $this->getResponse($socket));

            // Handle STARTTLS for port 587
            if ($this->port == 587) {
                fwrite($socket, "STARTTLS\r\n");
                $this->log("C: STARTTLS");
                $res = $this->getResponse($socket);
                $this->log("S: " . $res);
                if (strpos($res, '220') === 0) {
                    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                        $this->log("Failed to enable crypto");
                        return false;
                    }
                    // Resend EHLO after TLS
                    fwrite($socket, "EHLO " . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\n");
                    $this->log("C: EHLO (post-TLS)");
                    $this->log("S: " . $this->getResponse($socket));
                }
            }

            fwrite($socket, "AUTH LOGIN\r\n");
            $this->log("C: AUTH LOGIN");
            $this->log("S: " . $this->getResponse($socket));

            fwrite($socket, base64_encode($this->user) . "\r\n");
            $this->log("C: Send User");
            $this->log("S: " . $this->getResponse($socket));

            fwrite($socket, base64_encode($this->pass) . "\r\n");
            $this->log("C: Send Pass");
            $this->log("S: " . $this->getResponse($socket));

            fwrite($socket, "MAIL FROM: <" . $this->user . ">\r\n");
            $this->log("C: MAIL FROM");
            $this->log("S: " . $this->getResponse($socket));

            fwrite($socket, "RCPT TO: <$to>\r\n");
            $this->log("C: RCPT TO");
            $this->log("S: " . $this->getResponse($socket));

            fwrite($socket, "DATA\r\n");
            $this->log("C: DATA");
            $this->log("S: " . $this->getResponse($socket));

            $headers = "To: $to\r\n";
            $headers .= "From: Travel Admin <" . $this->user . ">\r\n";
            $headers .= "Subject: $subject\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=utf-8\r\n";
            $headers .= "Date: " . date('r') . "\r\n";
            $headers .= "\r\n";

            fwrite($socket, $headers . $message . "\r\n.\r\n");
            $this->log("C: Send Body");
            $this->log("S: " . $this->getResponse($socket));

            fwrite($socket, "QUIT\r\n");
            $this->log("C: QUIT");
            fclose($socket);
            return true;
        } catch (Exception $e) {
            $this->log("Error: " . $e->getMessage());
            return false;
        }
    }

    private function getResponse($socket) {
        $response = "";
        while ($str = fgets($socket, 4096)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return str_replace(["\r", "\n"], " ", $response);
    }
}
?>
