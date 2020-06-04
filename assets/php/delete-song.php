<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["userID"];
$songID = $_POST["songID"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "DELETE FROM userSongs
    WHERE songID = ? AND userID = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ss", $songID, $id);
$stmt->execute();
$result = $stmt->get_result();

$connection->close();
?>
