<?php

// tells browser the response will be JSON
header("Content-Type: application/json; charset=UTF-8");

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");

// connects to the database
$conn = mysqli_connect("localhost", "root", "", "learniverse");

// checks if database connection failed
if (!$conn) {
    echo json_encode(["error" => mysqli_connect_error()]);
    exit;
}

// sets database character format
mysqli_set_charset($conn, "utf8mb4");

// SQL query to get KS2 medium maths questions
$sql = "SELECT * FROM questions_mathsKS2
        WHERE key_stage='KS2'
        AND level='medium'
        LIMIT 30";

// runs the query
$result = mysqli_query($conn, $sql);

// checks if query failed
if (!$result) {
    echo json_encode(["sql_error" => mysqli_error($conn)]);
    exit;
}

// empty array to store questions
$data = [];

// loops through every question row
while ($row = mysqli_fetch_assoc($result)) {

    // adds each row into the array
    $data[] = $row;
}

// sends all questions back as JSON
echo json_encode($data, JSON_UNESCAPED_UNICODE);

exit;

?>