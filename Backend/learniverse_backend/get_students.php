<?php

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");

// tells browser the response will be JSON
header("Content-Type: application/json");

// connects to database
include "db.php";

// reads JSON data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// gets year group from JSON
$yearGroup = $data['yearGroup'] ?? $_GET['yearGroup'] ?? '';

// checks if year group is missing
if (!$yearGroup) {
    echo json_encode(["error" => "yearGroup is required"]);
    exit;
}

// SQL query to get students from the same year group
$sql = "
SELECT 
    student_id, 
    CONCAT(first_name, ' ', surname) AS student_name,
    year_group
FROM students 
WHERE year_group = ?
ORDER BY first_name ASC
";

// prepares the SQL query
$stmt = $conn->prepare($sql);

// checks if prepare failed
if (!$stmt) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

// binds year group safely to stop SQL injection
$stmt->bind_param("s", $yearGroup);

// runs the query
$stmt->execute();

// gets the result
$result = $stmt->get_result();

// empty array to store students
$students = [];

// loops through each student row
while ($row = $result->fetch_assoc()) {

    // adds student into the array
    $students[] = $row;
}

// sends students back to frontend as JSON
echo json_encode($students);

// closes statement and database connection
$stmt->close();
$conn->close();

?>