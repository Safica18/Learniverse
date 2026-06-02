<?php

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// tells browser the response will be JSON
header("Content-Type: application/json");

// connects to database
include "db.php";

// gets JSON data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// gets parent id and student id from request
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

// deletes the link between parent and child
$stmt = $conn->prepare("
    DELETE FROM parent_children
    WHERE parent_id = ? AND student_id = ?
");

// safely adds parent id and student id into the query
$stmt->bind_param("ss", $parent_id, $student_id);

// runs the delete query
if ($stmt->execute()) {

    // success message if child removed
    echo json_encode([
        "success" => true,
        "message" => "Child removed successfully"
    ]);

} else {

    // error message if delete fails
    echo json_encode([
        "success" => false,
        "message" => "Could not remove child"
    ]);
}

// closes statement and database connection
$stmt->close();
$conn->close();

?>