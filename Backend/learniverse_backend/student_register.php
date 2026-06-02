<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

// read the json input from frontend (web browser)
$data = json_decode(file_get_contents("php://input"), true);

// get all the inputs
$firstName = $data['firstName'] ?? '';
$surname   = $data['surname'] ?? '';
$gender    = $data['gender'] ?? '';
$yearGroup = $data['yearGroup'] ?? '';
$password  = $data['password'] ?? '';

// check required fields manually
if (!$firstName || !$surname || !$gender || !$yearGroup || !$password) {
    echo json_encode(["success" => false, "error" => "Please fill out all fields"]);
    exit; // stop execution if any field is empty
}

// hash the password (encryption) 
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// generate student ID
$studentId = "S" . rand(100, 5000);

// prepare the SQL
$sql = "INSERT INTO students (student_id, first_name, surname, gender, year_group, password)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $studentId, $firstName, $surname, $gender, $yearGroup, $hashedPassword);

// execute and respond
if ($stmt->execute()) {
    echo json_encode(["success" => true, "studentId" => $studentId]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
