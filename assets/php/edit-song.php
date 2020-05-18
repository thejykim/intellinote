<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_GET["userID"];
$title = $_GET["title"];
$dateModified = $_GET["dateModified"];
$songData = $_GET["songData"];
$songID = $_GET["songID"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "UPDATE userSongs
    SET title = ?, songData = ?, dateModified = ?
    WHERE songID = ? AND userID = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sssss", $title, $songData, $dateModified, $songID, $id);
$stmt->execute();
$result = $stmt->get_result();

$connection->close();
?>
