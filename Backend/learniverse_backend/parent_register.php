<?php

// shows all errors but does not display them on the page - prevent syntax errors that apperaing in the webpage due to having the arthimetic symbols in the questions
error_reporting(E_ALL);
ini_set('display_errors', 0);

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// tells browser the response will be JSON
header("Content-Type: application/json; charset=UTF-8");

// handles the browser permission check request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    echo json_encode(["success" => true]);
    exit;
}

// connects to database
include "db.php";

// checks if database connection failed
if (!isset($conn) || !$conn) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

// sets database character format
mysqli_set_charset($conn, "utf8mb4");

// gets raw JSON sent from frontend
$rawInput = file_get_contents("php://input");

// changes JSON into PHP array
$data = json_decode($rawInput, true);

// checks if JSON is invalid
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON received"
    ]);
    exit;
}

// gets form values and removes extra spaces
$title         = trim($data["title"] ?? "");
$parentName    = trim($data["parentName"] ?? "");
$email         = trim($data["email"] ?? "");
$contactNumber = trim($data["contactNumber"] ?? "");
$relationship  = trim($data["relationship"] ?? "");
$password      = $data["password"] ?? "";

// checks if any field is empty
if (!$title || !$parentName || !$email || !$contactNumber || !$relationship || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

// checks if email format is valid
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address"
    ]);
    exit;
}

// checks if email already exists
$checkEmailSql = "SELECT parent_id FROM parents WHERE email = ?";
$checkEmailStmt = $conn->prepare($checkEmailSql);

// checks if prepare failed
if (!$checkEmailStmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

// safely adds email into the SQL
$checkEmailStmt->bind_param("s", $email);
$checkEmailStmt->execute();

// gets email check result
$emailResult = $checkEmailStmt->get_result();

// if email already exists, stop registration
if ($emailResult && $emailResult->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "This email is already registered"
    ]);
    $checkEmailStmt->close();
    $conn->close();
    exit;
}

$checkEmailStmt->close();

// hashes password before saving it
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// creates a random parent ID and checks it is not already used
do {
    $parentId = "P" . rand(1000, 9999);

    $checkIdSql = "SELECT parent_id FROM parents WHERE parent_id = ?";
    $checkIdStmt = $conn->prepare($checkIdSql);

    if (!$checkIdStmt) {
        echo json_encode([
            "success" => false,
            "message" => "Prepare failed: " . $conn->error
        ]);
        exit;
    }

    // checks if generated parent ID already exists
    $checkIdStmt->bind_param("s", $parentId);
    $checkIdStmt->execute();
    $idResult = $checkIdStmt->get_result();
    $exists = $idResult && $idResult->num_rows > 0;
    $checkIdStmt->close();

} while ($exists);

// SQL to insert parent into database
$sql = "INSERT INTO parents 
        (title, parent_id, parent_name, email, contact_number, relationship, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

// prepares insert query
$stmt = $conn->prepare($sql);

// checks if prepare failed
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

// safely adds values into SQL
$stmt->bind_param(
    "sssssss",
    $title,
    $parentId,
    $parentName,
    $email,
    $contactNumber,
    $relationship,
    $hashedPassword
);

// runs insert query
if ($stmt->execute()) {

    // sends success response and parent id
    echo json_encode([
        "success" => true,
        "parentId" => $parentId,
        "message" => "Parent registered successfully"
    ]);

} else {

    // sends error if registration fails
    echo json_encode([
        "success" => false,
        "message" => "Registration failed: " . $stmt->error
    ]);
}

// closes statement and database connection
$stmt->close();
$conn->close();
exit;

?>