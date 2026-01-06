<?php
include_once __DIR__ . '/Database.php';
include_once __DIR__ . '/Mailer.php';

class NotificationService {
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

    public function sendAdminNotification($subject, $content, $type = 'info') {
        $host = $this->getSetting('smtp_host') ?: 'smtp.gmail.com';
        $port = $this->getSetting('smtp_port') ?: '587';
        $user = $this->getSetting('smtp_user');
        $pass = $this->getSetting('smtp_pass');
        
        $adminEmail = $user;

        if (!$user || !$pass || !$adminEmail) {
            return false;
        }

        $htmlBody = $this->wrapTemplate($subject, $content, $type);

        $mailer = new Mailer($host, $port, $user, $pass);
        return $mailer->send($adminEmail, $subject, $htmlBody);
    }

    public function sendUserNotification($to, $name, $subject, $content, $type = 'info') {
        $host = $this->getSetting('smtp_host') ?: 'smtp.gmail.com';
        $port = $this->getSetting('smtp_port') ?: '587';
        $user = $this->getSetting('smtp_user');
        $pass = $this->getSetting('smtp_pass');

        if (!$user || !$pass) {
            return false;
        }

        $htmlBody = $this->wrapTemplate($subject, "<p style='margin-top:0'>Dear $name,</p>" . $content, $type);

        $mailer = new Mailer($host, $port, $user, $pass);
        return $mailer->send($to, $subject, $htmlBody);
    }

    private function wrapTemplate($title, $content, $type) {
        $bgColor = '#f8fafc';
        $accentColor = '#2563eb'; // Default Blue
        $icon = '🔔';

        if ($type === 'booking') {
            $accentColor = '#059669'; // Emerald
            $icon = '✈️';
        } elseif ($type === 'enquiry') {
            $accentColor = '#4f46e5'; // Indigo
            $icon = '✉️';
        } elseif ($type === 'newsletter') {
            $accentColor = '#db2777'; // Pink
            $icon = '✨';
        }

        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: $bgColor; margin: 0; padding: 40px; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
                .header { background: $accentColor; padding: 40px; text-align: center; color: white; }
                .icon { font-size: 48px; margin-bottom: 20px; display: block; }
                .title { font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
                .content { padding: 40px; color: #334155; line-height: 1.6; }
                .data-box { background: #f1f5f9; border-radius: 16px; padding: 25px; margin-top: 20px; }
                .data-row { margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
                .data-row:last-child { border: none; margin-bottom: 0; padding-bottom: 0; }
                .label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; display: block; }
                .value { font-size: 15px; font-weight: 600; color: #1e293b; }
                .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; font-weight: 600; }
                .button { display: inline-block; background: $accentColor; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; margin-top: 25px; box-shadow: 0 4px 12px " . str_replace(')', ',0.2)', str_replace('rgb', 'rgba', $accentColor)) . "; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <span class='icon'>$icon</span>
                    <h1 class='title'>$title</h1>
                </div>
                <div class='content'>
                    <p style='margin:0'>Hello,</p>
                    <div class='data-box'>
                        $content
                    </div>
                </div>
                <div class='footer'>
                    &copy; " . date('Y') . " Travel & Tourism Portal • Automated Notification
                </div>
            </div>
        </body>
        </html>";
    }
}
?>
