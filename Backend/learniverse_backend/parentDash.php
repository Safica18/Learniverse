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

// gets parent id from the request
$parentId = trim($data['parentId'] ?? '');

// checks if parent id is missing
if (!$parentId) {
    echo json_encode([
        "success" => false,
        "message" => "Parent ID is required"
    ]);
    exit;
}

// gets parent details from database
$parentStmt = $conn->prepare("
    SELECT title, parent_id, parent_name, email, contact_number, relationship
    FROM parents
    WHERE parent_id = ?
");

// adds parent id into the query
$parentStmt->bind_param("s", $parentId);

// runs the query
$parentStmt->execute();

// gets the result
$parentResult = $parentStmt->get_result();

// if parent is not found
if ($parentResult->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Parent not found"
    ]);

    $parentStmt->close();
    $conn->close();
    exit;
}

// stores parent details
$parent = $parentResult->fetch_assoc();

$parentStmt->close();

// gets all children linked to this parent
$studentsStmt = $conn->prepare("
    SELECT s.student_id, s.first_name, s.surname, s.year_group, s.avatar
    FROM parent_children pc
    JOIN students s ON pc.student_id = s.student_id
    WHERE pc.parent_id = ?
    ORDER BY s.first_name ASC
");

//  adds parent id into the query
$studentsStmt->bind_param("s", $parentId);

// runs the query
$studentsStmt->execute();

// gets linked children result
$studentsResult = $studentsStmt->get_result();

// empty array to store children
$students = [];

// loops through each linked child
while ($row = $studentsResult->fetch_assoc()) {

    // adds child into students array
    $students[] = $row;
}

$studentsStmt->close();

// sends parent and children data back to frontend
echo json_encode([
    "success" => true,
    "parent" => $parent,
    "students" => $students
]);

// closes database connection
$conn->close();

?>