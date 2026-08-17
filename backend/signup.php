<?php
// kung gusto mong i-clear yung db, gamitin mo to: truncate table users;

require 'db.php';

// pag na-trigger na yung post request (submit button)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // check natin kung taken na ba tong username na to sa db
    $result = $conn->query("SELECT * FROM users WHERE username = '$user'");

    // pag taken na, send tayo ng error message pabalik sa script
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "msg" => "Username already exists."]);
    } else {
        // pag goods lahat, save na natin yung new user details sa db
        $sql = "INSERT INTO users (username, password) VALUES ('$user', '$pass')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "msg" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "msg" => "Error: " . $conn->error]);
        }
    }
}
$conn->close();
?>



