<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
;
$dbHost = 'localhost';
$dbUsername = 'root';  // Default XAMPP username
$dbPassword = '';     // Default XAMPP password (blank)
$dbName = 'form data store';

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $phone = sanitizeInput($_POST['phone']);
    $dob = isset($_POST['dob']) ? sanitizeInput($_POST['dob']) : null;
    $gender = isset($_POST['gender']) ? sanitizeInput($_POST['gender']) : null;
    $country = isset($_POST['country']) ? sanitizeInput($_POST['country']) : null;
    $interests = isset($_POST['interests']) ? implode(', ', $_POST['interests']) : null;
    $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : null;

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO `form submissions` (`name`, `email`, `phone`, `dob`, `gender`, `country`, `interests`, `message`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $name, $email, $phone, $dob, $gender, $country, $interests, $message);

    // Execute the statement
    if ($stmt->execute()) {
        // Redirect to prevent form resubmission
        header("Location: index.html?success=1");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();

// Function to sanitize form data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>