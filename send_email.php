<?php
// Debug mode - remove in production
define('DEBUG_MODE', true);
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Email Configuration - EDIT THESE VALUES
$SMTP_EMAIL = '92ahmadmustafa321@gmail.com';    // Your Gmail address
$SMTP_PASSWORD = 'zzlc agtj wuwn uose';         // Your Gmail app password
$SMTP_NAME = 'Personal Portfolio';               // Project name
$PROJECT_NAME = 'Personal Portfolio';            // Used in email subject

// CORS and JSON response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';
require __DIR__ . '/PHPMailer/src/Exception.php';

// Only allow POST for sending
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

// Validate
if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Sanitize
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$mail = new PHPMailer(true);
try {
    // SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $SMTP_EMAIL;
    $mail->Password = $SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email headers
    $mail->setFrom($SMTP_EMAIL, $SMTP_NAME);
    $mail->addReplyTo($email, $name);
    $mail->addAddress($SMTP_EMAIL);

    $mail->isHTML(true);
    $mail->Subject = "$PROJECT_NAME - New Contact Form Submission";

    // Create a nice HTML email body
    $mail->Body = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <h2 style='color: #2fbf71;'>$PROJECT_NAME Contact Form Submission</h2>
        <p><strong>From:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <div style='margin-top: 20px; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #2fbf71;'>
            <strong>Message:</strong><br>
            " . nl2br($message) . "
        </div>
        <p style='margin-top: 20px; color: #666; font-size: 0.9em;'>
            This message was sent from your portfolio website contact form.
        </p>
    </body>
    </html>";

    // Plain text alternative
    $mail->AltBody = "New message from $PROJECT_NAME Contact Form\n\n"
        . "From: $name\n"
        . "Email: $email\n\n"
        . "Message:\n$message\n\n"
        . "Sent from your portfolio website contact form.";

    $mail->send();
    http_response_code(200);
    echo json_encode(['message' => 'Message sent successfully! We will get back to you soon.']);
} catch (Exception $e) {
    error_log('Portfolio Contact Form Error: ' . $mail->ErrorInfo);
    http_response_code(500);

    // In debug mode, return detailed error
    if (defined('DEBUG_MODE') && DEBUG_MODE) {
        echo json_encode([
            'error' => 'SMTP Error: ' . $mail->ErrorInfo,
            'debug_info' => [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]
        ]);
    } else {
        echo json_encode(['error' => 'Failed to send message. Please try again later.']);
    }
}
