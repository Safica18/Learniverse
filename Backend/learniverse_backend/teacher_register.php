<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

// input from frontend
$data = json_decode(file_get_contents("php://input"), true);

$title =$data['nameTitle'] ?? '';
$firstName = $data['firstName'] ?? '';
$surname   = $data['surname'] ?? '';

// store only first name here (surname already stored separately)
$teacherName = $firstName;

$email     = $data['email'] ?? '';
$yearGroup = $data['yearGroup'] ?? '';

//validate password first
$rawPassword = $data['password'] ?? '';
$password  = password_hash($rawPassword, PASSWORD_DEFAULT);

$subjects = isset($data['subjects']) ? [$data['subjects']] : []; // only single subject selects

// teacher ID generates automatically
$teacherId = "T" . rand(100, 5000);

// transaction - this prevents the subject arrays from failing and stay consistant (without this step the subject might fail to save - the data will break)

$conn->begin_transaction();

try{
  // this code prevents from creating a blank row in the backend database. 
if (!$firstName || !$surname || !$email || !$yearGroup || !$rawPassword || !$title || empty($subjects)) {
    echo json_encode(["success" => false, "error" => "All required fields must be filled"]);
    exit;
}
//insert teacher table
$sql = "INSERT INTO teachers (title, teacher_id, teacher_name, surname, email, year_group, password)
VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
  "sssssis", // (yearGroup is integer and others are strings)
  $title,
  $teacherId,
  $teacherName,
  $surname,
  $email,
  $yearGroup,
  $password
);

  $stmt->execute(); // this execute the sql

  // insert subjects
  $sqlSubj = "INSERT INTO teacher_subjects (teacher_id, subject_id) VALUES (?, ?) "; // this connects with the joining table teacher_subjects 
  $stmtSubj = $conn->prepare($sqlSubj);

  foreach ($subjects as $subjectId) {
    $stmtSubj->bind_param("si", $teacherId, $subjectId); // (string and integer)
    $stmtSubj->execute();
  }

  //if successful 

  $conn->commit();

  echo json_encode([ "success" => true, "teacherId" => $teacherId]);

} catch (Exception $e) {

  $conn->rollback();

  echo json_encode(["success"=> false, "error" => "Teacher Registration failed. Please Try again!"]);
 
}

$stmt->close();
$stmtSubj->close();
$conn->close();
?>