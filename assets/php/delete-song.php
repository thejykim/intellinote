<?php

ini_set('display_errors', 1);
error_reporting(-1);

$id = $_POST["userID"];
$songID = $_POST["songID"];

$servername = "167.88.161.21";
$username = "thejykco_sheets";
$password = "omitted";
$dbname = "thejykco_sheets_user";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$sql = "DELETE FROM userSongs
    WHERE songID = ? AND userID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $songID, $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    echo("Unable to delete song!");
}

$connection->close();
?>
