<?php
session_start();
require 'db.php';
// pag na-trigger na yung post request \(log in\)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // get natin yung mga nilagay na data sa form
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // verify natin sa db kung match yung username at password
    $result = $conn->query("SELECT * FROM users WHERE username = '$user' AND password='$pass'");

    $row=$result->fetch_assoc();

    if ($result->num_rows == 1) {
        $_SESSION['uId'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['pass'] = str_repeat("• ", strlen($row['password']));
        echo json_encode(["status" => "success","msg" =>"{$_SESSION['uId']}{$_SESSION['username']}"]);
    }else{
        echo json_encode(["status" => "failed", "msg" => "Invalid username or password."]);
    }
}
$conn->close();
?>


