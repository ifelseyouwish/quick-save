<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$server = "localhost";
$name = "root";
$password = "";
$db = "project_db";

$conn  = new mysqli($server, $name, $password, $db);

if($conn->connect_error){
    die("Connection failed" .$conn->connect_error);
}