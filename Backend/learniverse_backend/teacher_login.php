<?php

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// tells browser the response will be JSON
header("Content-Type: application/json");

// connects to database
include "db.php";

// gets JSON data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);

// gets teacher id and password from request
$teacherId = $data['teacherId'] ?? '';
$password = $data['password'] ?? '';

// checks if teacher id or password is missing
if (!$teacherId || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Teacher ID and password are required"
    ]);
    exit;
}

// SQL query to find teacher by teacher id
$sql = "SELECT teacher_id, title, teacher_name, surname, year_group, password 
        FROM teachers 
        WHERE teacher_id = ?";

// prepares SQL query
$stmt = $conn->prepare($sql);

// adds teacher id into SQL
$stmt->bind_param("s", $teacherId);

// runs the query
$stmt->execute();

// gets query result
$result = $stmt->get_result();

// checks if teacher exists
if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Teacher not found"
    ]);
    exit;
}

// gets teacher data
$teacher = $result->fetch_assoc();

// checks if password is wrong
if (!password_verify($password, $teacher['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid password"
    ]);
    exit;
}

// sends teacher data back to frontend
echo json_encode([
    "success" => true,
    "teacherData" => [
        "teacherId" => $teacher['teacher_id'],
        "title" => $teacher['title'],
        "teacherName" => $teacher['teacher_name'],
        "yearGroup" => $teacher['year_group']
    ]
]);

// closes statement and database connection
$stmt->close();
$conn->close();

?>