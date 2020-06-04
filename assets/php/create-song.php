<?php

ini_set('display_errors', 1);
error_reporting(-1);

$title = $_POST["title"];
$id = $_POST["userID"];
$dateCreated = $_POST["dateCreated"];
$dateModified = $_POST["dateModified"];
$songData = $_POST["songData"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = file_get_contents(__DIR__ . "/protected/password.txt");
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "INSERT INTO userSongs
    (title, userID, dateCreated, dateModified, songData)
    VALUES (?,?,?,?,?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sssss", $title, $id, $dateCreated, $dateModified, $songData);
$stmt->execute();
$result = $stmt->get_result();

$connection->close();
?>
