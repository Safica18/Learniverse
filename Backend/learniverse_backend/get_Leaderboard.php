<?php

// shows all errors but does not display them on the page
error_reporting(E_ALL);
ini_set('display_errors', 0);

// allows frontend to connect with backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

// tells browser the response will be JSON
header("Content-Type: application/json; charset=UTF-8");

// connects to database
include "db.php";

// checks if database connection exists
if (!isset($conn) || !$conn) {
    echo json_encode([]);
    exit;
}

// sets database text format
mysqli_set_charset($conn, "utf8mb4");

// gets year from URL and the  default is KS1
$year = $_GET["year"] ?? "KS1";
$year = strtoupper(trim($year));

// only allows KS1 or KS2
if ($year !== "KS1" && $year !== "KS2") {
    $year = "KS1";
}

// chooses the correct attempts table
$attemptTable = $year === "KS2" ? "attempts_ks2" : "attempts";

/*
  students table uses year_group numbers:
  KS1 = year_group 1, 2 or 3
  KS2 = year_group 4, 5 or 6
*/

// sets year group condition depending on key stage
if ($year === "KS1") {
    $yearCondition = "s.year_group IN (1, 2, 3)";
} else {
    $yearCondition = "s.year_group IN (4, 5, 6)";
}

// gets students and their best scores for each level 
$sql = "
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.surname) AS name,
    '$year' AS level,
    s.avatar,

    
    COALESCE(MAX(CASE WHEN a.level = 'easy' THEN a.score END), 0) AS easy_points,
    COALESCE(MAX(CASE WHEN a.level = 'medium' THEN a.score END), 0) AS medium_points,
    COALESCE(MAX(CASE WHEN a.level = 'hard' THEN a.score END), 0) AS hard_points,

    (
        COALESCE(MAX(CASE WHEN a.level = 'easy' THEN a.score END), 0) +
        COALESCE(MAX(CASE WHEN a.level = 'medium' THEN a.score END), 0) +
        COALESCE(MAX(CASE WHEN a.level = 'hard' THEN a.score END), 0)
    ) AS total_score

FROM students s

LEFT JOIN `$attemptTable` a
ON s.student_id = a.student_id

WHERE $yearCondition

GROUP BY 
    s.student_id,
    s.first_name,
    s.surname,
    s.avatar

HAVING total_score > 0

ORDER BY total_score DESC
LIMIT 20
";

// runs the SQL query
$result = mysqli_query($conn, $sql);

// if query fails, send error back
if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

// stores leaderboard rows
$data = [];

// adds each row into data array
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// sends leaderboard data back to frontend
echo json_encode($data, JSON_UNESCAPED_UNICODE);

// closes database connection
$conn->close();
exit;

?>