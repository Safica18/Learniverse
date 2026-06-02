<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$parentId = $data['parentId'] ?? '';
$password = $data['password'] ?? '';

if (!$parentId || !$password) {
    echo json_encode(["success" => false, "error" => "Please fill out all fields"]);
    exit;
}

// Query parent
$stmt = $conn->prepare("SELECT parent_name, password FROM parents WHERE parent_id = ?");
$stmt->bind_param("s", $parentId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true, "parentName" => $row['parent_name']]);
    } else {
        echo json_encode(["success" => false, "error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Parent ID not found"]);
}

$stmt->close();
$conn->close();
?>
