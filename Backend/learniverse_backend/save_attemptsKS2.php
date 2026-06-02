<?php

// shows all errors but does not display them on the page
error_reporting(E_ALL);
ini_set('display_errors', 0);

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// tells browser the response will be JSON
header("Content-Type: application/json; charset=UTF-8");

// handles browser permission check request
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

// gets raw JSON data sent from frontend
$rawData = file_get_contents("php://input");

// changes JSON into PHP array
$data = json_decode($rawData, true);

// checks if JSON is invalid
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No valid JSON received",
        "raw" => $rawData
    ]);
    exit;
}

// gets attempt details from frontend
$student_id = trim($data["student_id"] ?? "");
$level = strtolower(trim($data["level"] ?? ""));
$topic = trim($data["topic"] ?? "maths");
$score = intval($data["score"] ?? 0);
$total_questions = intval($data["total_questions"] ?? 5);
$status = strtolower(trim($data["status"] ?? "completed"));

// checks if student id or level is missing
if ($student_id === "" || $level === "") {
    echo json_encode([
        "success" => false,
        "message" => "Missing student_id or level"
    ]);
    exit;
}

// only allows these level values
if (!in_array($level, ["easy", "medium", "hard"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid level"
    ]);
    exit;
}

// only allows correct status values
if (!in_array($status, ["in_progress", "completed"])) {
    $status = "completed";
}

// if total questions is wrong, set it back to 5
if ($total_questions <= 0) {
    $total_questions = 5;
}

// makes sure score cannot go below 0
if ($score < 0) {
    $score = 0;
}

// makes sure score cannot be more than total questions
if ($score > $total_questions) {
    $score = $total_questions;
}

// percentage score
$percentage = round(($score / $total_questions) * 100, 2);

//  insert query to save KS2 attempt
$stmt = $conn->prepare("
    INSERT INTO attempts_ks2
    (student_id, level, topic, score, total_questions, percentage, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

// checks if prepare failed
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

//  adds values into SQL
$stmt->bind_param(
    "sssiids",
    $student_id,
    $level,
    $topic,
    $score,
    $total_questions,
    $percentage,
    $status
);

// runs insert query
if ($stmt->execute()) {

    // success response
    echo json_encode([
        "success" => true,
        "message" => "KS2 attempt saved successfully",
        "insert_id" => $stmt->insert_id
    ]);

} else {

    // error response if saving failed
    echo json_encode([
        "success" => false,
        "message" => "Execute failed: " . $stmt->error
    ]);
}

// closes statement and database connection
$stmt->close();
$conn->close();
exit;

?>