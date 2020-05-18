<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_GET["userID"];
$title = $_GET["title"];
$dateCreated = $_GET["dateCreated"];
$dateModified = $_GET["dateModified"];
$songData = $_GET["songData"];

$servername = "167.88.161.21";
$username = "thejykco_sheets_user";
$password = "omitted";
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
