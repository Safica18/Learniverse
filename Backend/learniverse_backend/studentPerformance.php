<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// DATABASE CONNECTION
$conn = new mysqli("localhost", "root", "", "learniverse");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// GET JSON INPUT
$data = json_decode(file_get_contents("php://input"), true);
$student_id = $data['student_id'] ?? null;

if (!$student_id) {
    echo json_encode(["error" => "No student ID"]);
    exit();
}

//  GET AVERAGE PERFORMANCE PER LEVEL
$sql = "
SELECT 
  level,
  AVG(percentage) as avg_score
FROM attempts
WHERE student_id = ?
  AND status = 'completed'
GROUP BY level
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $student_id);
$stmt->execute();

$result = $stmt->get_result();

// DEFAULT VALUES
$response = [
    "easy" => 0,
    "medium" => 0,
    "hard" => 0
];


while ($row = $result->fetch_assoc()) {
    $level = $row['level'];
    $response[$level] = round($row['avg_score']);
}

echo json_encode($response);

$conn->close();
?>