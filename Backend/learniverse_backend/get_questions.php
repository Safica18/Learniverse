<?php

// tells browser the response will be JSON
header("Content-Type: application/json; charset=UTF-8");

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");

// connects to database
$conn = mysqli_connect("localhost", "root", "", "learniverse");

// checks if database connection failed
if (!$conn) {
    echo json_encode([]);
    exit;
}

// sets database character format
mysqli_set_charset($conn, "utf8mb4");

// gets values from the URL
$key_stage = $_GET["key_stage"] ?? "";
$level = $_GET["level"] ?? "";
$topic = $_GET["topic"] ?? "";
$type = $_GET["type"] ?? "";

// protects database from SQL injection attacks - as this damage the database 
$key_stage = mysqli_real_escape_string($conn, $key_stage); //- the escape character protect from injection attack
$level = mysqli_real_escape_string($conn, $level);
$topic = mysqli_real_escape_string($conn, $topic);
$type = mysqli_real_escape_string($conn, $type);

// starting SQL query
$sql = "SELECT * FROM questions_maths WHERE 1=1";

// adds key stage condition if value exists
if ($key_stage !== "") {
    $sql .= " AND key_stage = '$key_stage'";
}

// adds level condition if value exists
if ($level !== "") {
    $sql .= " AND level = '$level'";
}

// adds topic condition if value exists
if ($topic !== "") {
    $sql .= " AND topic = '$topic'";
}

// adds type condition if value exists
if ($type !== "") {
    $sql .= " AND type = '$type'";
}

// randomises questions and limits to 30
$sql .= " ORDER BY RAND() LIMIT 30";

// runs the SQL query
$result = mysqli_query($conn, $sql);

// checks if query failed
if (!$result) {
    echo json_encode([]);
    exit;
}

// empty array to store questions
$data = [];

// loops through each question row
while ($row = mysqli_fetch_assoc($result)) {

    // adds row into array
    $data[] = $row;
}

// sends questions back as JSON
echo json_encode($data, JSON_UNESCAPED_UNICODE);

// closes database connection
mysqli_close($conn);

?>