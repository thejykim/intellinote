<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["username"];
$isFollowing = $_POST["isFollowing"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "INSERT INTO userFollowers
    (username, isFollowing)
    VALUES (?,?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ss", $title, $isFollowing);
$stmt->execute();
$result = $stmt->get_result();

$connection->close();
?>
