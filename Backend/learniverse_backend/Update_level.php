<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// connect database
$conn = new mysqli("localhost", "root", "", "learniverse");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "DB connection failed"]));
}

// get JSON body
$data = json_decode(file_get_contents("php://input"), true);

// this checks if data exists
if (!$data) {
    echo json_encode([
        "success" => false,
        "error" => "No JSON received"
    ]);
    exit;
}


$student_id = $data["student_id"] ?? null;
$level = $data["level"] ?? null;

if (!$student_id || !$level) {
    echo json_encode([
        "success" => false,
        "error" => "Missing student_id or level"
    ]);
    exit;
}

// update level
$sql = "UPDATE students SET level = ? WHERE student_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $level, $student_id);
$stmt->execute();

echo json_encode([
    "success" => true
]);

?>