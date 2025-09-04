<?php
// Show errors for debugging (remove or disable on production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow CORS for React frontend (adjust origin for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files (adjust path as needed)
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';
require __DIR__ . '/PHPMailer/src/Exception.php';

// Only allow POST requests for actual sending
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

// Validate input
if (!$name || !$email || !$message) {
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Setup PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = '92ahmadmustafa123@gmail.com';   // Your Gmail
    $mail->Password = 'zqpw lttg evwl hscx';            // Your Gmail app password
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Email from user form
    $mail->setFrom($email, $name);

    // Email to your Gmail
    $mail->addAddress('92ahmadmustafa123@gmail.com');

    $mail->isHTML(false);
    $mail->Subject = 'New Form Submission';
    $mail->Body = "Name: $name\nEmail: $email\nMessage: $message";

    $mail->send();

    echo json_encode(['message' => 'Message sent successfully!']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Mailer Error: ' . $mail->ErrorInfo]);
}
