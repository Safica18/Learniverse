<?php

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// tells the browser the response will be JSON
header("Content-Type: application/json");

// connects to the database
include "db.php";

// gets the data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// gets parent id and student id from the request
$parent_id = trim($data['parent_id'] ?? '');
$student_id = trim($data['student_id'] ?? '');

// checks if parent id or student id is missing
if (!$parent_id || !$student_id) {
    echo json_encode([
        "success" => false,
        "message" => "Parent ID and Student ID are required"
    ]);
    exit;
}

// checks if the student exists in the students table
$checkStudent = $conn->prepare("
    SELECT student_id, first_name, surname, year_group
    FROM students
    WHERE student_id = ?
");

$checkStudent->bind_param("s", $student_id);
$checkStudent->execute();

$studentResult = $checkStudent->get_result();

// if no student is found
if ($studentResult->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Student not found"
    ]);

    $checkStudent->close();
    $conn->close();
    exit;
}

// gets the student details
$student = $studentResult->fetch_assoc();

$checkStudent->close();

// checks if the child is already linked to the parent
$checkLink = $conn->prepare("
    SELECT id
    FROM parent_children
    WHERE parent_id = ? AND student_id = ?
");

$checkLink->bind_param("ss", $parent_id, $student_id);
$checkLink->execute();

$linkResult = $checkLink->get_result();

// if the child is already linked
if ($linkResult->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "This child is already linked to your account"
    ]);

    $checkLink->close();
    $conn->close();
    exit;
}

$checkLink->close();

// inserts the parent and child link into database
$insert = $conn->prepare("
    INSERT INTO parent_children (parent_id, student_id)
    VALUES (?, ?)
");

$insert->bind_param("ss", $parent_id, $student_id);

// checks if insert worked
if ($insert->execute()) {

    // sends success message and student details back
    echo json_encode([
        "success" => true,
        "student" => $student
    ]);

} else {

    // error message if insert fails
    echo json_encode([
        "success" => false,
        "message" => "Could not link child"
    ]);
}

// closes database connections
$insert->close();
$conn->close();

?>