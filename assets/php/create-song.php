<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["userID"];
$title = $_POST["title"];
$dateCreated = $_POST["dateCreated"];
$dateModified = $_POST["dateModified"];
$songData = $_POST["songData"];

$servername = "167.88.161.21";
$username = "thejykco_sheets";
$password = "omitted";
$dbname = "thejykco_sheets_user";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "INSERT INTO userSongs
    (title, userID, dateCreated, dateModified, songData)
    VALUES (?,?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $title, $id, $dateCreated, $dateModified, $songData);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    die("Connection failed - try again in a few moments.");
}

$connection->close();
?>
