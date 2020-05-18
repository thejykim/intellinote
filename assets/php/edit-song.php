<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["userID"];
$title = $_POST["title"];
$dateModified = $_POST["dateModified"];
$songData = $_POST["songData"];
$songID = $_POST["songID"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = "omitted";
$dbname = "thejykco_sheets";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "UPDATE userSongs
    SET title = ?, songData = ?, dateModified = ?
    WHERE songID = ? AND userID = ?"
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssss", $title, $songData, $dateModified, $songID, $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    echo("Unable to update song!");
}

$connection->close();
?>
