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

// gets student id and password from request
$studentId = $data['studentId'] ?? '';
$password  = $data['password'] ?? '';

// checks if any field is empty
if (empty($studentId) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Please complete all fields"
    ]);
    exit;
}

// finds student by student id
$stmt = $conn->prepare("
    SELECT password, first_name, year_group 
    FROM students 
    WHERE student_id = ?
");

// checks if SQL prepare failed
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL error"]);
    exit;
}

// safely adds student id into the SQL
$stmt->bind_param("s", $studentId);

// runs the query
$stmt->execute();

// gets the result
$result = $stmt->get_result();

// checks if student exists
if ($result->num_rows > 0) {

    // gets student row
    $row = $result->fetch_assoc();

    // checks password, works for hashed password or plain password
    if (password_verify($password, $row['password']) || $password === $row['password']) {

        // works out key stage from year group
        $key_stage = ($row['year_group'] <= 3) ? 'KS1' : 'KS2';

        // checks if student already has learning info
        $check = $conn->prepare("
            SELECT * FROM student_learning_info WHERE student_id = ?
        ");

        if ($check) {
            $check->bind_param("s", $studentId);
            $check->execute();

            // gets learning info result
            $learningResult = $check->get_result();

            // if no learning info exists, create one
            if ($learningResult->num_rows === 0) {
                $insert = $conn->prepare("
                    INSERT INTO student_learning_info (student_id, key_stage, current_level)
                    VALUES (?, ?, 'easy')
                ");

                if ($insert) {
                    $insert->bind_param("ss", $studentId, $key_stage);
                    $insert->execute();
                }
            }
        }

        // success response sent back to frontend
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "firstName" => $row['first_name'],
            "yearGroup" => $row['year_group'],
            "studentId" => $studentId,
            "keyStage" => $key_stage
        ]);

    } else {

        // wrong password response
        echo json_encode([
            "success" => false,
            "message" => "Incorrect password"
        ]);
    }

} else {

    // student id was not found
    echo json_encode([
        "success" => false,
        "message" => "Student ID not found"
    ]);
}

// closes statement and database connection
$stmt->close();
$conn->close();

?>